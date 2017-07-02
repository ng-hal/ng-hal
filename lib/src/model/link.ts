import { Uri } from '../uri/uri';
import { Link, LinkDefinition } from './hal.interfaces';

export class LinkImpl implements Link {

  public href: string;
  public templated: boolean;
  public type: string;
  public deprecation: string;
  public name: string;
  public profile: string;
  public title: string;
  public hreflang: string;

  constructor(
    link: LinkDefinition
  ) {
    Object.assign(this, link);
  }

  expand(vars: { [key: string]: any} = {}): string {

    return Uri.of(this.href).expand(vars);
  }
}
