import { Uri } from '../uri/uri';
import { Link } from './hal.interfaces';

export class LinkImpl implements Link {

  constructor(
    public href: string,
    public templated?: boolean,
    public type?: string,
    public deprecation?: string,
    public name?: string,
    public profile?: string,
    public title?: string,
    public hreflang?: string
  ) {}

  public uri(): Uri {

    return Uri.of(this.href);
  }

  /*
  resolve(params: LinkParams): string {

    if (this.templated) {

      const propNames = Object.getOwnPropertyNames(params);

      return Object.getOwnPropertyNames(params)
        .map((propName: string) => ({ name: propName, value: params[propName ]}))
        .reduce((url, prop) => url.replace(new RegExp(`{${prop.name}}`, 'g'), prop.value), this.href);

    } else {
      return this.href;
    }

  }
  */

}
