import { Parser } from './parser';

const FIXTURES: { [key: string]: any } = {

  CURIES: {
    _links: {
      self: { href: '/orders' },
      curies: [{
        name: 'curie1',
        href: 'http://docs.example.com/relations/{rel}',
        templated: true
      }, {
        name: 'curie2',
        href: 'http://docs.example.com/relations/curie2',
      }],
      'curie1:value': { href: '/curie/1' },
      'curie1:value:dangling': { href: '/curie/1/1' },
      'curie2': { href: '/curie/2' },
    }
  },

  DEPRECATED: {
    _embedded: {
      one: {
        _embedded: {
          two: {
            _links: {
              self: { href: '/self' },
              foo: {
                href: '/foo',
                deprecation: 'http://api.io/deprecated/link/explanation'
              }
            }
          }
        }
      }
    }
  },

  MINIMAL: {
    _links: {
      self: {
        href: 'dummy'
      }
    }
  },

  NO_EMBEDDED: {
    _links: {
      self: { href: '/self' }
    },
    property: 'value'
  },

  NO_LINKS: {
    property: 'value',
    _embedded: {
      'an_embedded_resource': {
        what: 'ever'
      }
    }
  },

  PRIMITIVE_LINKS: {
    _links: {
      self: { href: '/self' },
      primitive: '/links-must-be-objects',
    }
  },

  SHOP: {
    _links: {
      self: { href: '/orders' },
      next: { href: '/orders?page=2' },
      find: { href: '/orders{?id}', templated: true },
      admin: [
        { href: '/admins/2', title: 'Fred' },
        { href: '/admins/5', title: 'Kate' }
      ]
    },
    currentlyProcessing: 14,
    shippedToday: 20,
    _embedded: {
      orders: [{
        _links: {
          self: { href: '/orders/123' },
          basket: { href: '/baskets/98712' },
          customer: { href: '/customers/7809' }
        },
        total: 30.00,
        currency: 'USD',
        status: 'shipped'
      },{
        _links: {
          self: { href: '/orders/124' },
          basket: { href: '/baskets/97213' },
          customer: { href: '/customers/12369' }
        },
        total: 20.00,
        currency: 'USD',
        status: 'processing'
      }]
    }
  },

  VALIDATION: {
    _links: {
      notSelf: {
        href: '/no/self/link',
        description: 'self link is not required by the spec'
      },
      first: {
        description: 'this link has no href'
      },
      second: {
        href: '/href',
        type: [ 'an attribue might not be a string, but do I care?' ]
      },
      third: {
        href: 'href',
        type: null,
        description: 'this one has a null-attribute'
      },
      'uri-template-1': {
        href: '/a{/template}/whichs/templated/property/{isnt}/set'
      },
      'uri-template-2': {
        href: '/a{/template}/whichs/templated/property/{is}/set/to/false',
        templated: false
      },
      'uri-template-3': {
        href: '/a{/template}/whichs/templated/property/{is}/not/a/boolean',
        templated: 5
      }
    },
    _embedded: {
      one: {
        this: 'resource has no _links, therefore it also has no self-link'
      },
      two: {
        _links: {
          self: { href: 'not an URI at all' }
        }
      }
    }
  }

};


describe(`Parser`, () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });

  // it(`parses the minimal sample`, () => {
  //   const result = parser.parse(FIXTURES.MINIMAL);

  //   expect(result).toBeDefined();
  //   expect(result.linkArray('self')).toEqual([{ href: 'dummy', templated: false }]);
  // });

  // it(`preserves the original resource`, () => {
  //   const unparsed = FIXTURES.MINIMAL;
  //   const resource = parser.parse(unparsed);

  //   expect(JSON.stringify(resource.original())).toEqual(JSON.stringify(unparsed));

  //   expect(unparsed._links.self).toBeDefined();
  //   expect(unparsed._links.self.href).toBe('dummy');
  //   expect(unparsed._links.self.templated).toBeUndefined();

  //   expect(resource._links.self).toBeDefined();
  //   expect(resource._links.self.length).toBeDefined();
  //   expect(resource._links.self[0]).toBeDefined();
  //   expect(resource._links.self[0].templated).toBeFalsy();
  //   expect(resource._links.self[0].href).toBe('dummy');
  // });

  // it(`returns a Resource with link()`, () => {
  //   expect(parser.parse(FIXTURES.MINIMAL).link('self'))
  //     .toEqual({ href: 'dummy', templated: false });

  //   expect(parser.parse(FIXTURES.CURIES).link('self'))
  //     .toEqual({ href: '/orders', templated: false });
  // });

  // it(`returns a Resource with linkArray()`, () => {
  //   let link1 = parser.parse(FIXTURES.MINIMAL).linkArray('self');
  //   expect(link1).toBeDefined();
  //   expect(link1.length).toBeGreaterThan(0);
  //   expect(link1[0].href).toBe('dummy');
  //   expect(link1[0].templated).toBe(false);

  //   let link2 = parser.parse(FIXTURES.CURIES).linkArray('self');
  //   expect(link2).toBeDefined();
  //   expect(link2.length).toBeGreaterThan(0);
  //   expect(link2[0].href).toBe('/orders');
  //   expect(link2[0].templated).toBe(false);
  // });

});
