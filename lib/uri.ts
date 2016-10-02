/// <reference path="../typings/uri-templates.d.ts" />
import utpl = require('uri-templates');

console.log(utpl);
console.log(utpl('http://www.foo.com/{foo}?{bar*}').fillFromObject({foo: 123, bar: 789}));

export class Uri {

  public static from(url: string): Uri {
    return new Uri(utpl(url));
  }

  constructor (
    private uritemplate: any // <-- URITemplate
  ) {}

  public with(vars: { [key: string]: string}): string {
    return this.uritemplate.fillFromObject(vars);
  }

  public withCb(callback: (key: string) => string): string {
    return this.uritemplate.frill(callback);
  }

  public fromUri(uri: string): Uri {
    this.uritemplate = utpl(uri);

    return this;
  }
}
