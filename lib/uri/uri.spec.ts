import { Uri } from './uri';

describe(`Uri`, () => {

  it(`constructs instances`, () => {
    let uri = new Uri('');

    expect(uri).not.toBeNull();
  });

  it(`returns template value of the URI`, () => {
    let uri = new Uri('/foo/bar/{a}{b}?q');

    expect(uri.template).toBe('/foo/bar/{a}{b}?q');
  });

  it(`expands non-parametrized URIs to same value`, () => {
    let uri = new Uri('/foo/bar');

    expect(uri.expand({})).toBe('/foo/bar');
  });

  it(`expands path parameters to given values`, () => {
    let uri = new Uri('/foo/{bar}');

    expect(uri.expand({bar: '123'})).toBe('/foo/123');
  });

  it(`expandsBy path parameters with callback values`, () => {
    let uri = new Uri('/some/{a}{b}/{foo}/{bar}');
    let expander = (key: string): string => {
      switch (key) {
        case 'foo':
          return '123';
        case 'bar':
          return '456';
        default:
          return '789';
      }
    };

    expect(uri.expandBy(expander)).toBe('/some/789789/123/456');
  });

});
