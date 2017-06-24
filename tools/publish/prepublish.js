const cpx = require('cpx');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const DIST = path.resolve(ROOT, 'dist', 'ng-hal');

cpx.copy(path.resolve(ROOT, 'LICENSE'), DIST);
cpx.copy(path.resolve(ROOT, 'README.md'), DIST);
cpx.copy(path.resolve(ROOT, 'CHANGELOG.md'), DIST);

const packageJson = JSON.parse(fs.readFileSync(path.resolve(DIST, 'package.json')));
const parentPackageJson = JSON.parse(fs.readFileSync(path.resolve(ROOT, 'package.json')));

delete packageJson['private'];
packageJson['version'] = parentPackageJson['version'];

fs.writeFileSync(path.resolve(DIST, 'package.json'), JSON.stringify(packageJson, undefined, 2));
