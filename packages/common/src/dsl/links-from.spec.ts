import { linksFrom } from './links-from';
import { Resource } from '../resource';
import { expect } from 'chai';

const FAKE_LINKS: Resource = {
  id: 23,
  _links: {
    self: { href: '/fake/23' },
    foo: { href: '/fake/foo/{bar}', templated: true },
    bar: [
      { href: 'fake/bar/1' },
      { href: 'fake/bar/2' },
      { href: 'fake/bar/3' }
    ]
  }
}

describe(`linksFrom({})`, () => {

  describe(`.rel(name)`, () => {

    it(`should return a link`, () => {
      const link = linksFrom(FAKE_LINKS).rel('self');
      expect(link.href).to.be('/fake/foo');

      const foo = linksFrom(FAKE_LINKS).rel('foo');
      // tslint:disable-next-line:no-unused-expression
      expect(foo.templated).to.be.true;
    });

  });

  describe(`.rel(name).build({})`, () => {

    it(`should build a templated link`, () => {
      const foo = linksFrom(FAKE_LINKS).rel('foo').build({ bar: 'baz' });
      expect(foo).to.be('/fake/foo/baz');
    });

    it(`should build a link`, () => {
      const foo = linksFrom(FAKE_LINKS).rel('self').build({ xyz: '123' });
      expect(foo).to.be('/fake/23');
    });

  });


  describe(`.rel(name, index)`, () => {

    it(`should return a link`, () => {
      const link1 = linksFrom(FAKE_LINKS).rel('bar', 1);
      expect(link1.href).to.be('/fake/bar/1');

      const link3 = linksFrom(FAKE_LINKS).rel('bar', 3);
      expect(link3.href).to.be('/fake/bar/3');
    });

  });

});


/*
Usage:

linksFrom({}).rel('foo').build({})
linksFrom({}).rel('foo', 4).build({})
linksFrom({}).rel('foo', 4).build()
linksFrom(list).rel('next');
linksFrom(list).rel('page').build({ number: 7 });
linksFrom(index).rel('collection').build({ offset: 12, limit: 30, sortBy: 'foo', sortOrder: 'DESC' });

*/
