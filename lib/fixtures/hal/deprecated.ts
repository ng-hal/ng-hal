export const DEPRECATED = {
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
};
