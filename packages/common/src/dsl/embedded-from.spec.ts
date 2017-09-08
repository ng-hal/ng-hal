import { embeddedFrom } from './embedded-from';
import { Link } from '../link';
import { Resource } from '../resource';
import { expect } from 'chai';

const FAKE_RESOURCE: Resource = {
  id: 12,
  _links: {
    self: { href: 'foo/bar' }
  },
  _embedded: {
    list: [],
    collection: { _links: { self: { href: 'foo/bar/collection' }}},
    page: { _links: { self: { href: 'foo/bar/page' }}},
    item: [
      { _links: { self: { href: 'foo/bar/1' }}},
      { _links: { self: { href: 'foo/bar/2' }}}
    ],
    orders: [
      { _links: { self: { href: 'foo/bar/orders/1' }}},
      { _links: { self: { href: 'foo/bar/orders/2' }}},
      { _links: { self: { href: 'foo/bar/orders/3' }}},
      { _links: { self: { href: 'foo/bar/orders/4' }}}
    ],
  }
}

describe(`embeddedFrom({})`, () => {

  describe(`.rel(name)`, () => {

    it(`should return embedded resource as array`, () => {
      const list = embeddedFrom(FAKE_RESOURCE).rel('list');
      expect(list).to.be.an('array');
    });

    it(`should return an embedded resource`, () => {
      const collection = embeddedFrom(FAKE_RESOURCE).rel('collection');
      expect((collection._links.self as Link).href).to.be('foo/bar/collection');
    });

  });


  describe(`.rel(name, index)`, () => {

    it(`should return a single resource from embedded resources array`, () => {
      const item1 = embeddedFrom(FAKE_RESOURCE).rel('item', 1);
      expect((item1._links.self as Link).href).to.be('foo/bar/1');

      const item2 = embeddedFrom(FAKE_RESOURCE).rel('item', 2);
      expect((item2._links.self as Link).href).to.be('foo/bar/2');
    });

  });

});
