import { Uri } from '../uri/uri';
import { Link, LinkDefinition } from './hal.model';

export class LinkImpl implements Link {

  constructor(
    public link: LinkDefinition
  ) {}

  public uri(): Uri {

    return Uri.of(this.link.href);
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
