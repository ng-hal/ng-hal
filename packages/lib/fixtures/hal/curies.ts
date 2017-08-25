import { ResourceDocument } from '../../src/hal/hal.model';

export const CURIES: ResourceDocument = {
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
};
