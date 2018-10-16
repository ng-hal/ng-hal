const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const load = require('@commitlint/load');
const lint = require('@commitlint/lint');


// First, fetch latest revision from remote repo as FETCH_HEAD
const PACKAGE = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'package.json')));
const REMOTE_URL = PACKAGE.repository.url;

const gitFetch = shell.exec(`git fetch ${REMOTE_URL}`, { silent: true });
if (gitFetch.err) {
  console.error(gitFetch.err);
  process.exit(1);
}


// Second, validate commit messages between local HEAD and FETCH_HEAD
const GIT_REV_FROM = `FETCH_HEAD`;
const GIT_REV_TO = `HEAD`;

console.info(`Validating commit messages...`);
const git = shell.exec(`git log ${GIT_REV_FROM}...${GIT_REV_TO} --oneline`, { silent: true });

const commits = git.stdout.split('\n').filter((line) => line);
console.info(`Found ${commits.length} commits between ${GIT_REV_FROM} and ${GIT_REV_TO}`);

load(require('../../commitlint.config'))
.then(rules => {
  return Promise.all(
    commits.map(commit => {
      const idx = commit.indexOf(' ');
      const sha = commit.substr(0, idx);
      const msg = commit.substr(idx + 1, commit.length);
      return Promise.resolve({rules, idx, sha, msg});
    })
    .then(({rules, sha, msg}) => {
      console.info(`Validating ${sha}: ${msg}`);
      return Promise.all([lint(msg, rules), sha]);
    })
    .then(([report, sha]) => {
      if (!report.valid) {
        return Promise.reject({report, sha});
      }
    }))
})
.then(() => { console.info(`Commit messages are up to standard. All fine! Well done, man!`);
 })
.catch(({report, sha}) => {
  if (!report) {
    console.error('An error occured running tool/validate-commit-msg');
  } else {
    console.error(``);
    console.error(`Commit ${sha} has not a valid commit message!`);
    if (report.errors.length > 0) {
      report.errors.forEach(error => {
        console.error(`Error: ${error.message}`);
      });
    }
    if (report.warnings.length > 0) {
      report.warnings.forEach(warning => {
        console.error(`Warning: ${warning.message}`);
      });
    }
  }
  process.exit(1);
});
