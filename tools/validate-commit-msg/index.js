const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const validateMessage = require('validate-commit-msg');


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

commits.forEach((commit) => {
  const idx = commit.indexOf(' ');
  const sha = commit.substr(0, idx);
  const msg = commit.substr(idx + 1, commit.length);

  console.info(`Validating ${sha}: ${msg}`);
  const valid = validateMessage(msg);
  if (!valid) {
    console.error(``);
    console.error(`Commit ${sha} has not a valid commit message!`);

    process.exit(1);
  }
});

console.info(`Commit messages are up to standard. All fine! Well done, man!`);
