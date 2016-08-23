/// <reference path="../typings/halfred.d.ts" />
import { Resource as HalfredResource, LinkCollection, Link, ResourceCollection } from 'halfred';


/** Abstraction of a HAL resource. Based on halfred. */
export class Resource implements HalfredResource {

  constructor(
    private delegate: HalfredResource
  ) {}



  allLinkArrays(): LinkCollection {
    return this.delegate.allLinkArrays();
  }

  allLinks(): LinkCollection {
    return this.delegate.allLinks();
  }

  linkArray(key: string): Link[] {
    return this.delegate.linkArray(key);
  }

  link(key: string): Link {
    return this.delegate.link(key);
  }

  allEmbeddedResourceArrays(): ResourceCollection {
    return this.delegate.allEmbeddedResourceArrays();
  }

  allEmbeddedArrays(): ResourceCollection {
    return this.delegate.allEmbeddedArrays();
  }

  allEmbeddedResources(): ResourceCollection  {
    return this.delegate.allEmbeddedResources();
  }

  embeddedResourceArray(key: string): Resource[] {
    return this.delegate.embeddedResourceArray(key)
      .map((val: HalfredResource) => new Resource(val));
  }

  embeddedArray(key: string): Resource[] {
    return this.delegate.embeddedArray(key)
      .map((val: HalfredResource) => new Resource(val));
  }

  embeddedResource(key: string): Resource {
    return new Resource(this.delegate.embeddedResource(key));
  }

  embedded(key: string): Resource {
    return new Resource(this.delegate.embedded(key));
  }

  original(): any {
    return this.delegate.original();
  }

  hasCuries(): boolean {
    return this.delegate.hasCuries();
  }

  curieArray(): Link[] {
    return this.delegate.curieArray();
  }

  curie(name: string): Link {
    return this.delegate.curie(name);
  }

  reverseResolveCurie(fullUrl: string): string {
    return this.delegate.reverseResolveCurie(fullUrl);
  }

  validationIssues(): any {
    return this.delegate.validationIssues();
  }

  validation(): any {
    return this.delegate.validation();
  }
}
