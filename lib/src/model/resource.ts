import { Link, NormalizedResourceDocument, Relations, Resource,
  ResourceDocument } from './hal.interfaces';
import { LinkImpl } from './link';
import { asLink, asResource } from '../parser/util';


export class ResourceImpl implements Resource {

  constructor(
    private _normalized: NormalizedResourceDocument,
    private _original: ResourceDocument
  ) {}

  allEmbeddedResources(): Relations<Resource[]> {

    return Object.keys(this._normalized._embedded)
      .map((rel: string) => ({ rel, value: this._normalized._embedded[rel] }))
      .reduce((prev, current) => {
        prev[current.rel] = current.value.map((resource) => new ResourceImpl(
          resource,
          asResource(this._original._embedded[current.rel])[0]
        ));

        return prev;
      }, {} as Relations<Resource[]>);
  }

  embeddedArray(rel: string): Resource[] {

    return this._normalized._embedded[rel]
      .map(resource => new ResourceImpl(
        resource[0],
        asResource(this._original._embedded[rel])[0]
      ));
  }

  embedded(rel: string): Resource {

    return new ResourceImpl(
      this._normalized._embedded[rel][0],
      asResource(this._original._embedded[rel])[0]
    );
  }

  allLinks(): Relations<Link[]> {

    return Object.keys(this._normalized._links)
      .map((rel: string) => ({ rel, value: this._normalized._links[rel] }))
      .reduce((prev, current) => {
        prev[current.rel] = current.value.map((link) => new LinkImpl(link));

        return prev;
      }, {} as Relations<Link[]>);
  }

  linkArray(rel: string): Link[] {

    return this._normalized._links[rel]
      .map(link => new LinkImpl(link));
  }

  link(rel: string): Link {

    return new LinkImpl(this._normalized['_links'][rel][0]);
  }

  data<T extends NormalizedResourceDocument>(): T {

    return (this._normalized as T);
  }

  original<T extends ResourceDocument>(): T {

    return (this._original as T);
  }

}
