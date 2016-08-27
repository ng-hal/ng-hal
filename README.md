ng2-hal
=======

> An HAL Navigator for Angular2


[![Build Status](https://travis-ci.org/dherges/ng2-hal.svg?branch=master)](https://travis-ci.org/dherges/ng2-hal)
[![Dependency Status](https://david-dm.org/dherges/ng2-hal/status.svg)](https://david-dm.org/dherges/ng2-hal)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

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


## Usage

```bash
$ npm install https://github.com/dherges/ng2-hal.git #later from npm: ng2-hal
```

Register with Angular's dependency injection:
```ts
import { Navigator, ConversionStrategy, ConversionStrategyJson } from '../../dist';

const MY_PROVIDERS: any[] = [
  new Provider(ConversionStrategy, { useFactory: () => new ConversionStrategyJson() }),
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

[https://spektrakel.de/ng2-hal](https://spektrakel.de/ng2-hal)


## API Design Considerations

### ``d.ts`` are the API docs

Please refere to the generated type definitions.

### ...

*see TODOs, still work-in-progress*



## Credits

 * [basti1302/halfred](https://github.com/basti1302/halfred): resource parsing and normalization for ``application/hal+json``
 * [Daniel Rosenwasser](https://github.com/DanielRosenwasser): for helping out on [TypeScript #10463](https://github.com/Microsoft/TypeScript/issues/10463)
 * [AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter): build tools
