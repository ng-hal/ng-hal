import { Uri } from './uri';

describe(`Uri`, () => {

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


  /* RFC-6570 specs */

  // Constants as described in RFC-6570, 3.2
  const values: { [key: string]: any } = {
    count: ['one', 'two', 'three'],
    dom: ['example', 'com'],
    dub: 'me/too',
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

  const specs = [
    {
      title: 'Variable Expansion',
      tag: 'RFC-6570, 3.2.1',
      url: 'https://tools.ietf.org/html/rfc6570#section-3.2.1',
      tests: [
        { template: '{count}', values, expected: 'one,two,three' },
        { template: '{count*}', values, expected: 'one,two,three' },
        { template: '{/count}', values, expected: '/one,two,three' },
        { template: '{/count*}', values, expected: '/one/two/three' },
        { template: '{;count}', values, expected: ';count=one,two,three' },
        { template: '{;count*}', values, expected: ';count=one;count=two;count=three' },
        { template: '{?count}', values, expected: '?count=one,two,three' },
        { template: '{?count*}', values, expected: '?count=one&count=two&count=three' },
        { template: '{&count*}', values, expected: '&count=one&count=two&count=three' }
      ]
    },
    {
      title: 'Simple String Expansion: {var}',
      tag: 'RFC-6570, 3.2.2',
      url: 'https://tools.ietf.org/html/rfc6570#section-3.2.2',
      tests: [
        { template: '{var}', values, expected: 'value' },
        { template: '{hello}', values, expected: 'Hello%20World%21' },
        { template: '{half}', values, expected: '50%25' },
        { template: 'O{empty}X', values, expected: 'OX' },
        { template: 'O{undef}X', values, expected: 'OX' },
        { template: '{x,y}', values, expected: '1024,768' },
        { template: '{x,hello,y}', values, expected: '1024,Hello%20World%21,768' },
        { template: '?{x,empty}', values, expected: '?1024,' },
        { template: '?{x,undef}', values, expected: '?1024' },
        { template: '?{undef,y}', values, expected: '?768' },
        { template: '{var:3}', values, expected: 'val' },
        { template: '{var:30}', values, expected: 'value' },
        { template: '{list}', values, expected: 'red,green,blue' },
        { template: '{list*}', values, expected: 'red,green,blue' },
        { template: '{keys}', values, expected: 'semi,%3B,dot,.,comma,%2C' },
        { template: '{keys*}', values, expected: 'semi=%3B,dot=.,comma=%2C' }
      ]
    },
    {
      title: 'Reserved Expansion: {+var}',
      tag: 'RFC-6570, 3.2.3',
      url: 'https://tools.ietf.org/html/rfc6570#section-3.2.3',
      tests: [
        { template: '{+var}', values, expected: 'value' },
        { template: '{+hello}', values, expected: 'Hello%20World!' },
        { template: '{+half}', values, expected: '50%25' },
        { template: '{base}index', values, expected: 'http%3A%2F%2Fexample.com%2Fhome%2Findex' },
        { template: '{+base}index', values, expected: 'http://example.com/home/index' },
        { template: 'O{+empty}X', values, expected: 'OX' },
        { template: 'O{+undef}X', values, expected: 'OX' },
        { template: '{+path}/here', values, expected: '/foo/bar/here' },
        { template: 'here?ref={+path}', values, expected: 'here?ref=/foo/bar' },
        { template: 'up{+path}{var}/here', values, expected: 'up/foo/barvalue/here' },
        { template: '{+x,hello,y}', values, expected: '1024,Hello%20World!,768' },
        { template: '{+path,x}/here', values, expected: '/foo/bar,1024/here' },
        { template: '{+path:6}/here', values, expected: '/foo/b/here' },
        { template: '{+list}', values, expected: 'red,green,blue' },
        { template: '{+list*}', values, expected: 'red,green,blue' },
        { template: '{+keys}', values, expected: 'semi,;,dot,.,comma,,' },
        { template: '{+keys*}', values, expected: 'semi=;,dot=.,comma=,' }
      ]
    },
    {
      title: 'Fragment Expansion: {#var}',
      tag: 'RFC-6570, 3.2.4',
      url: 'https://tools.ietf.org/html/rfc6570#section-3.2.4',
      tests: [
        { template: '{#var}', values, expected: '#value' },
        { template: '{#hello}', values, expected: '#Hello%20World!' },
        { template: '{#half}', values, expected: '#50%25' },
        { template: 'foo{#empty}', values, expected: 'foo#' },
        { template: 'foo{#undef}', values, expected: 'foo' },
        { template: '{#x,hello,y}', values, expected: '#1024,Hello%20World!,768' },
        { template: '{#path,x}/here', values, expected: '#/foo/bar,1024/here' },
        { template: '{#path:6}/here', values, expected: '#/foo/b/here' },
        { template: '{#list}', values, expected: '#red,green,blue' },
        { template: '{#list*}', values, expected: '#red,green,blue' },
        { template: '{#keys}', values, expected: '#semi,;,dot,.,comma,,' },
        { template: '{#keys*}', values, expected: '#semi=;,dot=.,comma=,' }
      ]
    },
    {
      title: 'Label Expansion with Dot-Prefix: {.var}',
      tag: 'RFC-6570, 3.2.5',
      url: 'https://tools.ietf.org/html/rfc6570#section-3.2.5',
      tests: [
        { template: '{.who}', values, expected: '.fred' },
        { template: '{.who,who}', values, expected: '.fred.fred' },
        { template: '{.half,who}', values, expected: '.50%25.fred' },
        { template: 'www{.dom*}', values, expected: 'www.example.com' },
        { template: 'X{.var}', values, expected: 'X.value' },
        { template: 'X{.empty}', values, expected: 'X.' },
        { template: 'X{.undef}', values, expected: 'X' },
        { template: 'X{.var:3}', values, expected: 'X.val' },
        { template: 'X{.list}', values, expected: 'X.red,green,blue' },
        { template: 'X{.list*}', values, expected: 'X.red.green.blue' },
        { template: 'X{.keys}', values, expected: 'X.semi,%3B,dot,.,comma,%2C' },
        { template: 'X{.keys*}', values, expected: 'X.semi=%3B.dot=..comma=%2C' },
        { template: 'X{.empty_keys}', values, expected: 'X' },
        { template: 'X{.empty_keys*}', values, expected: 'X' }
      ]
    },
    {
      title: 'Path Segment Expansion: {/var}',
      tag: 'RFC-6570, 3.2.6',
      url: 'https://tools.ietf.org/html/rfc6570#section-3.2.6',
      tests: [
        { template: '{/who}', values, expected: '/fred' },
        { template: '{/who,who}', values, expected: '/fred/fred' },
        { template: '{/half,who}', values, expected: '/50%25/fred' },
        { template: '{/who,dub}', values, expected: '/fred/me%2Ftoo' },
        { template: '{/var}', values, expected: '/value' },
        { template: '{/var,empty}', values, expected: '/value/' },
        { template: '{/var,undef}', values, expected: '/value' },
        { template: '{/var,x}/here', values, expected: '/value/1024/here' },
        { template: '{/var:1,var}', values, expected: '/v/value' },
        { template: '{/list}', values, expected: '/red,green,blue' },
        { template: '{/list*}', values, expected: '/red/green/blue' },
        { template: '{/list*,path:4}', values, expected: '/red/green/blue/%2Ffoo' },
        { template: '{/keys}', values, expected: '/semi,%3B,dot,.,comma,%2C' },
        { template: '{/keys*}', values, expected: '/semi=%3B/dot=./comma=%2C' }
      ]
    },
    {
      title: 'Path-Style Parameter Expansion: {;var}',
      tag: 'RFC-6570, 3.2.7',
      url: 'https://tools.ietf.org/html/rfc6570#section-3.2.7',
      tests: [
        { template: '{;who}', values, expected: ';who=fred' },
        { template: '{;half}', values, expected: ';half=50%25' },
        { template: '{;empty}', values, expected: ';empty' },
        { template: '{;v,empty,who}', values, expected: ';v=6;empty;who=fred' },
        { template: '{;v,bar,who}', values, expected: ';v=6;who=fred' },
        { template: '{;x,y}', values, expected: ';x=1024;y=768' },
        { template: '{;x,y,empty}', values, expected: ';x=1024;y=768;empty' },
        { template: '{;x,y,undef}', values, expected: ';x=1024;y=768' },
        { template: '{;hello:5}', values, expected: ';hello=Hello' },
        { template: '{;list}', values, expected: ';list=red,green,blue' },
        { template: '{;list*}', values, expected: ';list=red;list=green;list=blue' },
        { template: '{;keys}', values, expected: ';keys=semi,%3B,dot,.,comma,%2C' },
        { template: '{;keys*}', values, expected: ';semi=%3B;dot=.;comma=%2C' }
      ]
    },
    {
      title: 'Form-Style Query Expansion: {?var}',
      tag: 'RFC-6570, 3.2.8',
      url: 'https://tools.ietf.org/html/rfc6570#section-3.2.8',
      tests: [
        { template: '{?who}', values, expected: '?who=fred' },
        { template: '{?half}', values, expected: '?half=50%25' },
        { template: '{?x,y}', values, expected: '?x=1024&y=768' },
        { template: '{?x,y,empty}', values, expected: '?x=1024&y=768&empty=' },
        { template: '{?x,y,undef}', values, expected: '?x=1024&y=768' },
        { template: '{?var:3}', values, expected: '?var=val' },
        { template: '{?list}', values, expected: '?list=red,green,blue' },
        { template: '{?list*}', values, expected: '?list=red&list=green&list=blue' },
        { template: '{?keys}', values, expected: '?keys=semi,%3B,dot,.,comma,%2C' },
        { template: '{?keys*}', values, expected: '?semi=%3B&dot=.&comma=%2C' }
      ]
    },
    {
      title: 'Form-Style Query Continuation: {&var}',
      tag: 'RFC-6570, 3.2.9',
      url: 'https://tools.ietf.org/html/rfc6570#section-3.2.9',
      tests: [
        { template: '{&who}', values, expected: '&who=fred' },
        { template: '{&half}', values, expected: '&half=50%25' },
        { template: '?fixed=yes{&x}', values, expected: '?fixed=yes&x=1024' },
        { template: '{&x,y,empty}', values, expected: '&x=1024&y=768&empty=' },
        { template: '{&x,y,undef}', values, expected: '&x=1024&y=768' },
        { template: '{&var:3}', values, expected: '&var=val' },
        { template: '{&list}', values, expected: '&list=red,green,blue' },
        { template: '{&list*}', values, expected: '&list=red&list=green&list=blue' },
        { template: '{&keys}', values, expected: '&keys=semi,%3B,dot,.,comma,%2C' },
        { template: '{&keys*}', values, expected: '&semi=%3B&dot=.&comma=%2C' }
      ]
    },
  ];

  specs.forEach((spec: any) => {

    it(`expands according to ${spec.title} (${spec.tag})`, () => {
      spec.tests.forEach((test: any) => {
        expect(new Uri(test.template).expand(test.values)).toBe(test.expected);
      });
    });

  });


});
