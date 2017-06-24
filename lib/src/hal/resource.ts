import { Link, LinkCollection, Resource, ResourceCollection } from './hal.interfaces';
import { LinkImpl } from './link';


export class ResourceImpl implements Resource {

  constructor(
    private _normalizedJson: any,
    private _optionalOriginalJson?: any
  ) {}

  allEmbeddedResources(): ResourceCollection {

    return this._normalizedJson['_embedded'];
  }

  embeddedArray(rel: string): Resource[] {

    return this._normalizedJson['_embedded'][rel];
  }

  embedded(rel: string): Resource {

    return new ResourceImpl(this._normalizedJson['_embedded'][rel][0]);
  }

  allLinks(): LinkCollection {

    return this._normalizedJson['_links'];
  }

  linkArray(rel: string): Link[] {

    return this._normalizedJson['_links'][rel];
  }

  link(rel: string): Link {

    return new LinkImpl(this._normalizedJson['_links'][rel][0]);
  }

  data<T>(): T {

    return this._normalizedJson;
  }

}
