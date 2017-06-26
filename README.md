ng-hal
======


[![npm version](https://img.shields.io/npm/v/ng-hal.svg)](https://npmjs.org/ng-hal)
[![npm downloads](https://img.shields.io/npm/dm/ng-hal.svg)](https://npmjs.org/ng-hal)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Dependencies Status](https://david-dm.org/dherges/ng-hal/status.svg)](https://david-dm.org/dherges/ng-hal)
[![Peer Dependencies Status](https://david-dm.org/dherges/ng-hal/peer-status.svg)](https://david-dm.org/dherges/ng-hal?type=peer)

[![Greenkeeper](https://badges.greenkeeper.io/dherges/ng-hal.svg)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/dherges/ng-hal/tree/master.svg?style=svg)](https://circleci.com/gh/dherges/ng-hal/tree/master)
[![Travis CI](https://img.shields.io/travis/dherges/ng-hal/master.svg)](https://travis-ci.org/dherges/ng-hal)
[![Codecov coverage on master](https://img.shields.io/codecov/c/github/dherges/ng-hal/master.svg)](https://codecov.io/gh/dherges/ng-hal/)


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
      .subscribe((doc: Document) => console.log(doc));
  }
}
```


## Demo application

[http://spektrakel.de/ng-hal](http://spektrakel.de/ng-hal)


## API Design Considerations

 * ``Navigator`` API is almost identical to Angular's ``Http`` API.
   * ``follow`` is a short-cut Observable operation that is derived from ``mergeMap``/``flatMap``.
 * ``Document`` gives you a ``Resource`` object and the original ``Request``/``Response`` pair.
 * ``Resource`` is a normalized view of the JSON document. You can, however, obtain the unmodified JSON object.


## Reading List

 * HAL - Hypertext Application Language: [specification](http://stateless.co/hal_specification.html)
 * JSON Hypertext Application Language: [draft-kelly-json-hal-08](https://tools.ietf.org/html/draft-kelly-json-hal-08)
 * URI Templates: [RFC 6570](https://tools.ietf.org/html/rfc6570)


## Credits

 * [basti1302/halfred](https://github.com/basti1302/halfred): resource parsing and normalization for ``application/hal+json``
 * [geraintluff/uri-templates](https://github.com/geraintluff/uri-templates): URI templates according to [RFC6570](https://tools.ietf.org/html/rfc6570)
 * [Daniel Rosenwasser](https://github.com/DanielRosenwasser): for helping out on [TypeScript #10463](https://github.com/Microsoft/TypeScript/issues/10463)
