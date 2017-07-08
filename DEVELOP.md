Dev Guidelines
==============

The project is built with [yarn](yarnpkg.com/).
Please install yarn first.

There are two _"sub-projects"_ included in this repository:

 - `lib`: the `ng-hal` library that is shipped and distributed in Angular Package Format
 - `demo`: an Angular CLI app that depends on the latest version of `ng-hal` (built from this repo) and show-cases some scenarios

Tasks are executed as scripts from `package.json`.
Most tasks come in two flavours: a `:lib`-postfix for the library and a `:demo`-postfix for the demo app.
The task w/o a postfix first performs the `:lib` task, then the `:demo` task.
Example:

 - `build:lib`: builds the library
 - `build:demo`: builds the demo application
 - `build`: alias for `build:lib && build:demo`

In the following, the most important tasks are documented.


## Building

```bash
$ yarn build
$ yarn build:lib
$ yarn build:demo
```

The library is built with [ng-packagr](https://github.com/dherges/ng-packagr).
Artefacts are written to `dist/ng-hal`.
The `package.json` for publishing and distributing is in [`lib/package.json`](lib/package.json).

The demo is built with [Angular CLI](https://github.com/angular/angular-cli).
Artefacts are written to `dist/demo`.
The demo is then later published to GitHub pages.


## Serving the demo app

```bash
$ yarn start
```


## Testing

```bash
$ yarn test
$ yarn test:lib
$ yarn test:demo
```


## Linting

```bash
$ yarn lint
$ yarn lint:lib
$ yarn lint:demo
```


## CI Tasks

Tasks performed by the CI servers are prefixed with `ci:`.


## Cutting a release

The release workflow uses the [standard-version](https://github.com/conventional-changelog/standard-version#standard-version) workflow w/ [conventional commit messages](https://conventionalcommits.org/).
Please make sure that commit messages follow the conventions!
You can find the configuration in [`.vcmrc` file at root directory of the repo](.vcmrc).

First, cut the new release:

```bash
$ yarn release
```

Then, push the changes to the GitHub repo.

```bash
$ git push --follow-tags origin master
```

When the version tag lands on GitHub, [CircleCI](https://circleci.com/gh/dherges/ng-hal) will pick up the release, build the library, and publish the npm package w/ the new version to npm registry.
