ng2-hal
=======

[![Build Status](https://travis-ci.org/dherges/ng2-hal.svg?branch=master)](https://travis-ci.org/dherges/ng2-hal)
[![Dependency Status](https://david-dm.org/dherges/ng2-hal/status.svg)](https://david-dm.org/dherges/ng2-hal)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/ng2-hal.svg)](https://npmjs.org/ng2-hal)
[![npm downloads](https://img.shields.io/npm/dm/ng2-hal.svg)](https://npmjs.org/ng2-hal)


> An HAL Navigator for Angular2


## Usage

```bash
$ npm install ng2-hal
```

Register with Angular's dependency injection:
```ts
import {
  Navigator,
  ConversionStrategy,
  ConversionStrategyJson
} from 'ng2-hal';

const MY_PROVIDERS: any[] = [
  new Provider(ConversionStrategy, { useClass: ConversionStrategyJson }),
  Navigator
];
```

Please note: you also need Angular's ``Http`` ready for DI. It is required by ``Navigator``.


Navigation example:
```ts
import { Navigator } from 'ng2-hal';

@Injectable()
export class Foo {

  constructor(private navigator: Navigator) {}

  demo() {
    this.navigator
      .get('/my/hal-document.json')
      .subscribe((doc: HalDocument) => console.log(doc));
  }
}
```


## Demo application

[http://spektrakel.de/ng2-hal](http://spektrakel.de/ng2-hal)


## API Design Considerations

``d.ts`` are the API docs.
Please refer to the generated type definitions.


## Reading List

 * HAL - Hypertext Application Language: [specification](http://stateless.co/hal_specification.html)
 * JSON Hypertext Application Language: [draft-kelly-json-hal-08](https://tools.ietf.org/html/draft-kelly-json-hal-08)
 * URI Templates: [RFC 6570](https://tools.ietf.org/html/rfc6570)


## Heads up!

**This is still very much work-in-progress.**

### TODOs

 - [ ] URI templating
 - [ ] ``npm test``: add unit testing
 - [ ] ``Navigator`` API: convenient shortcut for follow-on navigation
   * e.g., ``follow((hal: HalDocument) => Observable<HalDocument>)``
   * currently, ``mergeMap()`` achieves desired behaviour – just an alias?
 - [ ] ``Link`` API: uri templating as instance methods on ``Link``
   * requires: ``Resource`` implementation to map ``Object`` (declares as ts interface ``Link``) to class instances
 - [ ] publish to npm
 - [ ] ``ConversionStrategy``:
   * in later version, it would be nice to chose between ``hal+json`` and ``hal+xml``
   * also: have a multiple strategies registered, then choose the right one dependent on ``Content-Type``
 - [x] ``ConversionStrategy`` API: ``(res: Response) => boolean`` and ``(res: Response) => Resource`` is good
 - [x] ``HalDocument`` API: a tuple of ``(Request, Response, Resource)``?
 - [x] ``npm test``: for now, only build and linting


## Version History

 * ``v0.1.0`` first version on public npm registry


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
