/**
 * Typings for uri templates.
 *
 * @see https://github.com/geraintluff/uri-templates
 */
declare module "uri-templates" {
  function utpl(template: string): URITemplate;

  interface URITemplate {
    fillFromObject(vars: Object): string;
    fill(callback: (varName: string) => string): string;
    fromUri(uri: string): Object;
  }

  export = utpl;
}
