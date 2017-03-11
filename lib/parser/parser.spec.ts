import { Parser } from './parser';

const FIXTURES = {

  MINIMAL: {
    _links: {
      self: {
        href: 'dummy'
      }
    }
  }

};


describe(`Parser`, () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });

  it(`parses the minimal sample`, () => {
    const result = parser.parse(FIXTURES.MINIMAL);

    expect(result).toBeDefined();
    expect(result.linkArray('self')).toEqual([{ href: 'dummy', templated: false }]);
  });

  it(`preserves the original resource`, () => {
    const result = parser.parse(FIXTURES.MINIMAL);

    expect(JSON.stringify(result.original())).toEqual(JSON.stringify(FIXTURES.MINIMAL));
  });

});
