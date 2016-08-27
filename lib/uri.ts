/// <reference path="../typings/uri-templates.d.ts" />
import utpl = require('uri-templates');

console.log(utpl);
console.log(utpl('http://www.foo.com/{foo}?{bar*}').fillFromObject({foo: 123, bar: 789}));


export class Uri {

  public static of(url: string): Uri {
    return new Uri(url);
  }

  constructor (
    public url: string
  ) {}

  public concrete (vars: Object): string {
    return utpl(this.url).fillFromObject(vars);
  }

}
