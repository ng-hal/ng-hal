import { Parser } from './parser';
import { FIXTURES } from '../../fixtures/hal';

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
