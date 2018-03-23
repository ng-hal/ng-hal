Modification
=============

In order to work with angular >5 we replaced the deprecated `OpaqueToken` with `InjectionToken`.  

ng-hal
======

[![Build Status](https://img.shields.io/travis/dherges/ng-hal/develop.svg)](https://travis-ci.org/dherges/ng-hal)
[![Coverage Status](https://img.shields.io/coveralls/dherges/ng-hal/develop.svg)](https://coveralls.io/github/dherges/ng-hal?branch=develop)
[![Dependencies Status](https://david-dm.org/dherges/ng-hal/status.svg)](https://david-dm.org/dherges/ng-hal)
[![Peer Dependencies Status](https://david-dm.org/dherges/ng-hal/peer-status.svg)](https://david-dm.org/dherges/ng-hal?type=peer)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/ng-hal.svg)](https://npmjs.org/ng-hal)
[![npm downloads](https://img.shields.io/npm/dm/ng-hal.svg)](https://npmjs.org/ng-hal)


> A navigator for HAL documents in Angular


## Usage

```bash
$ npm install --save ng-hal
```

Alternative, use yarn:

```bash
$ yarn add ng-hal
```


Import ``HalModule.forRoot()`` to your application's module:

```ts
import { HalModule } from 'ng-hal';

@NgModule({
  imports:      [
    HttpModule,
    HalModule.forRoot()
  ]
})
export class AppModule {}
```

Inject ``Navigator`` into components or services, then start retrieving HAL/JSON documents:

```ts
import { Navigator } from 'ng-hal';

@Injectable()
export class Foo {

  constructor(
    private navigator: Navigator
  ) {}

  demo() {
    this.navigator
      .get('/my/hal-document.json')
      .subscribe((doc: HalDocument) => console.log(doc));
  }
}
```


## Demo application

[http://spektrakel.de/ng-hal](http://spektrakel.de/ng-hal)


## API Design Considerations

 * ``Navigator`` API is almost identical to Angular's ``Http`` API.
   * ``follow`` is a short-cut Observable operation that is derived from ``mergeMap``/``flatMap``.
 * ``HalDocument`` gives you a ``Resource`` object and the original ``Request``/``Response`` pair.
 * ``Resource`` is a normalized view of the JSON document. You can, however, obtain the unmodified JSON object.


## Reading List

 * HAL - Hypertext Application Language: [specification](http://stateless.co/hal_specification.html)
 * JSON Hypertext Application Language: [draft-kelly-json-hal-08](https://tools.ietf.org/html/draft-kelly-json-hal-08)
 * URI Templates: [RFC 6570](https://tools.ietf.org/html/rfc6570)


## Version History

 * `v0.4.2` support Angular `^2.0.0 || ^4.0.0` from legacy code base
 * `v0.4.1` publishes an ES5/UMD bundle and an ES5/ES2015 version of the library
 * `v0.4.0` BREAKING API CHANGES, supports AoT compilation, removes uri-templates dependency, uses yarn, increases test coverage
 * `v0.3.0` tsconfig ``"noEmitHelpers": false``
 * `v0.2.0` renamed to ``ng-hal``, version bumps
 * `v0.1.0` first version on public npm registry


## License

```
Copyright (c) 2016 David Herges

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


## Credits

 * [basti1302/halfred](https://github.com/basti1302/halfred): resource parsing and normalization for ``application/hal+json``
 * [geraintluff/uri-templates](https://github.com/geraintluff/uri-templates): URI templates according to [RFC6570](https://tools.ietf.org/html/rfc6570)
 * [Daniel Rosenwasser](https://github.com/DanielRosenwasser): for helping out on [TypeScript #10463](https://github.com/Microsoft/TypeScript/issues/10463)
 * [AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter): build tools
 * [manekinekko/angular-library-starter](https://github.com/manekinekko/angular-library-starter): build tools
