import { ResourceDocument } from '../../src/hal/hal.model';

export const NO_EMBEDDED: ResourceDocument = {
  _links: {
    self: { href: '/self' }
  },
  property: 'value'
};
