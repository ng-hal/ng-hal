import { Uri } from './uri';

describe(`Uri`, () => {
  // Constants as described in RFC-6570, 3.2
  const VALUES: { [key: string]: any } = {
    count: ['one', 'two', 'three'],
    dom: ['example', 'com'],
    hello: 'Hello World!',
    half: '50%',
    var: 'value',
    who: 'fred',
    base: 'http://example.com/home/',
    path: '/foo/bar',
    list: ['red', 'green', 'blue'],
    keys: {'semi': ';', 'dot': '.', 'comma': ','},
    v: 6,
    x: 1024,
    y: 768,
    empty: '',
    empty_keys: {},
    undef: null
  };

  it(`constructs instances`, () => {
    let uri = new Uri('');

    expect(uri).not.toBeNull();
    expect(uri instanceof Uri).toBeTruthy();
  });

  it(`returns template value of given URI string`, () => {
    let uri = new Uri('/foo/bar/{a}{b}?q');

    expect(uri.template).toBe('/foo/bar/{a}{b}?q');
  });

  it(`expands with given object values`, () => {
    let uri = new Uri('/foo/{bar}');

    expect(uri.expand({bar: '123'})).toBe('/foo/123');
  });

  it(`expandsBy callback values`, () => {
    let uri = new Uri('/foo/{bar}');

    expect(uri.expandBy((key) => { return '123'; })).toBe('/foo/123');
  });

  it(`expands non-parametrized URIs to same value`, () => {
    let uri = new Uri('/foo/bar');

    expect(uri.expand({bar: '123'})).toBe('/foo/bar');
  });

  it(`expands a variable expansion with list values (RFC-6570, 3.2.1)`, () => {
    let args = { count: VALUES.count };

    expect(new Uri('{count}').expand(args)).toBe('one,two,three');
    expect(new Uri('{count*}').expand(args)).toBe('one,two,three');
    expect(new Uri('{/count}').expand(args)).toBe('/one,two,three');
    expect(new Uri('{/count*}').expand(args)).toBe('/one/two/three');
    expect(new Uri('{;count}').expand(args)).toBe(';count=one,two,three');
    expect(new Uri('{;count*}').expand(args)).toBe(';count=one;count=two;count=three');
    expect(new Uri('{?count}').expand(args)).toBe('?count=one,two,three');
    expect(new Uri('{?count*}').expand(args)).toBe('?count=one&count=two&count=three');
    expect(new Uri('{&count*}').expand(args)).toBe('&count=one&count=two&count=three');
  });

  it(`expands a simple string expansion (RFC-6570, 3.2.2)`, () => {
    expect(new Uri('{var}').expand({var: 'value'})).toBe('value');
  });

  it(`expands a simple string expansion with percent encoded values (RFC-6570, 3.2.2)`, () => {
    expect(new Uri('{hello}').expand({hello: 'Hello World!'})).toBe('Hello%20World%21');
    expect(new Uri('{half}').expand({half: '50%'})).toBe('50%25');
  });

  it(`expands a simple string expansion with an empty value (RFC-6570, 3.2.2)`, () => {
    expect(new Uri('O{empty}X').expand({empty: ''})).toBe('OX');
  });

  it(`expands a simple string expansion with an undefined value (RFC-6570, 3.2.2)`, () => {
    expect(new Uri('O{undef}X').expand({undef: null})).toBe('OX');
    expect(new Uri('O{undef}X').expand({})).toBe('OX');
  });

  it(`expands a simple string expansion with comma-separated values (RFC-6570, 3.2.2)`, () => {
    expect(new Uri('{x,y}').expand({x: '1024', y: '768'})).toBe('1024,768');
    expect(new Uri('{x,hello,y}').expand({x: '1024', y: '768', hello: 'Hello World!'}))
      .toBe('1024,Hello%20World%21,768');
  });

  it(`expands a simple string expansion with explode modifier (RFC-6570, 3.2.2)`, () => {
    expect(new Uri('?{x,empty}').expand({x: '1024', empty: ''})).toBe('?1024,');
    expect(new Uri('?{x,undef}').expand({x: '1024', undef: null})).toBe('?1024');
    expect(new Uri('?{undef,y}').expand({y: '768', undef: null})).toBe('?768');
  });

  it(`expands a simple string expansion with colon limit (RFC-6570, 3.2.2)`, () => {
    expect(new Uri('{var:3}').expand({var: 'value'})).toBe('val');
    expect(new Uri('{var:30}').expand({var: 'value'})).toBe('value');
  });

  it(`expands a simple string expansion with list values (RFC-6570, 3.2.2)`, () => {
    expect(new Uri('{list}').expand({list: ['red','green','blue']})).toBe('red,green,blue');
    expect(new Uri('{list*}').expand({list: ['red','green','blue']})).toBe('red,green,blue');
  });

  it(`expands a simple string expansion with keyed values (RFC-6570, 3.2.2)`, () => {
    expect(new Uri('{keys}').expand({keys: {'semi': ';', 'dot': '.', 'comma': ','}})).toBe('semi,%3B,dot,.,comma,%2C');
    expect(new Uri('{keys*}').expand({keys: {'semi': ';', 'dot': '.', 'comma': ','}})).toBe('semi=%3B,dot=.,comma=%2C');
  });

  it(`expands a reserved expansion with simple values (RFC-6570, 3.2.3)`, () => {
    expect(new Uri('{+var}').expand(VALUES)).toBe('value');
    expect(new Uri('{+hello}').expand(VALUES)).toBe('Hello%20World!');
    expect(new Uri('{+half}').expand(VALUES)).toBe('50%25');
  });

/* RESERVED EXPANSION 3.2.3

{+var}                value
{+hello}              Hello%20World!
{+half}               50%25

{base}index           http%3A%2F%2Fexample.com%2Fhome%2Findex
{+base}index          http://example.com/home/index
O{+empty}X            OX
O{+undef}X            OX

{+path}/here          /foo/bar/here
here?ref={+path}      here?ref=/foo/bar
up{+path}{var}/here   up/foo/barvalue/here
{+x,hello,y}          1024,Hello%20World!,768
{+path,x}/here        /foo/bar,1024/here

{+path:6}/here        /foo/b/here
{+list}               red,green,blue
{+list*}              red,green,blue
{+keys}               semi,;,dot,.,comma,,
{+keys*}              semi=;,dot=.,comma=,

*/

});
