/// <reference path="../typings/uri-templates.d.ts" />
import utpl = require('uri-templates');

export class Uri {

  public static of(url: string): Uri {
    return new Uri(utpl(url));
  }

  constructor (
    private uritemplate: any // <-- URITemplate
  ) {}

  public expand(vars: { [key: string]: string}): string {
    return this.uritemplate.fillFromObject(vars);
  }

  public expandBy(callback: (key: string) => string): string {
    return this.uritemplate.frill(callback);
  }

  public fromUri(uri: string): Uri {
    this.uritemplate = utpl(uri);

    return this;
  }
}
