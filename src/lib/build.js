"use strict";

require('shelljs/global');
const chalk = require('chalk');

const SOURCE = 'src/lib';
const TARGET= 'dist/ng-hal';

function run(command) {
  let result = exec(command);
  if (result.code > 0) {
    throw result.stderr;
  }
}


echo('Build starting...', `\n`);


echo(`Cleaning...`);
rm(`-rf`, `${TARGET}`);
mkdir(`-p`, `${TARGET}`);
echo(`Cleaned.`, `\n`);


echo(`AoT compilation starting...`);
// XX: run tsc first, then ngc, see https://github.com/angular/angular/issues/13359#issuecomment-289693569
run(`tsc -p ${SOURCE}/tsconfig.lib.json`);
run(`ngc -p ${SOURCE}/tsconfig.lib.json`);
echo(chalk.green(`AoT compilation completed`), `\n`);


//echo(`Styles and templates copying...`);
//run(`cpx ${SOURCE}/src/**/*.{html,css,scss} ${TARGET}/lib`);
//echo(chalk.green(`Styles and templates copied`), `\n`);


echo(`Rollup starting...`);
run(`rollup -c ${SOURCE}/rollup-config.js`);
echo(chalk.green(`Rollup finished`), `\n`);


echo(`Packaging...`);
run(`cpx ${SOURCE}/src/typings/**/* ${TARGET}/typings`);
run(`cpx ${SOURCE}/package.json ${TARGET}`);
run(`cpx "{README.md,LICENSE}" ${TARGET}`);
echo(`Package created.`, `\n`);


echo(chalk.green(`Build success`));
