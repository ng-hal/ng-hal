import { ResourceDocument } from '../../src/hal/hal.model';

export const NO_LINKS: ResourceDocument = {
  property: 'value',
  _embedded: {
    'an_embedded_resource': {
      what: 'ever'
    }
  }
};
