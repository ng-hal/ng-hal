/**
 * Abstraction of a HAL resource. Based on halfred.
 *
 * @see https://github.com/basti1302/halfred#resource-api
 */
export interface Resource {

  /**
   * Returns an object which has an array for each link that was present in the source object.
   * See below why each link is represented as an array.
   */
  allLinkArrays(): LinkCollection;

  /** Alias for allLinkArrays() */
  allLinks(): LinkCollection;

  /**
   * Returns the array of links for the given key, or null if there are no links for this key.
   */
  linkArray(key: string): Link[];

  /**
   * Returns the first element of the array of links for the given key or null if there are no
   * links for this key.
   */
  link(key: string): Link;

  /**
   * Returns an object which has an array for each embedded resource that was present in the
   * source object.
   * See below why each embedded resource is represented as an array. Each element of any of
   * this arrays is in turn a Resource object.
   */
  allEmbeddedResourceArrays(): ResourceCollection;

  /** Alias for allEmbeddedResourceArrays() */
  allEmbeddedArrays(): ResourceCollection;

  /** Alias for allEmbeddedResourceArrays() */
  allEmbeddedResources(): ResourceCollection;

  /**
   * Returns the array of embedded resources for the given key, or null if there are no embedded
   * resources for this key. Each element of this arrays is in turn a Resource object.
   */
  embeddedResourceArray(key: string): Resource[];

  /** Alias for embeddedResourceArray() */
  embeddedArray(key: string): Resource[];

  /**
   * Returns the first element of the array of embedded resources for the given key or null if
   * there are no embedded resources for this key. The returend object is a Resource object.
   */
  embeddedResource(key: string): Resource;

  /** Alias for embeddedResource(key) */
  embedded(key: string): Resource;

  /**
   * Returns the unmodified, original object that was parsed to this resource. This is rather
   * uninteresting for the source object you give to the parse method (because you probably
   * still have a reference to the source object) but it is a convenient way to get the part of
   * the source object that corresponds to an embedded resource.
   */
  original(): any;

  /**
   * Returns true if the resource has any CURIEs (Compact URIs).
   *
   * @see http://www.w3.org/TR/2010/NOTE-curie-20101216/
   */
  hasCuries(): boolean;

  /**
   * Returns the array of CURIEs. Each object in the array is a link object, which means it
   * can be templated etc. See below for the link object API.
   */
  curieArray(): Link[];

  /**
   * Returns the curie with the given name, if any. The returned object is a link object, which
   * means it can be templated etc. See below for link object API.
   */
  curie(name: string): Link;

  /**
   * Returns the compact URI for the given full URL, if any
   */
  reverseResolveCurie(fullUrl: string): string;

  /** @experimental */
  // allLinksFlattenedArray(): Link[];

  /**
   * In addition to the methods mentioned here, resource has all properties of
   * the source object. This is also true for embedded Resource objects. The
   * non-HAL properties (that is, any property except _links and _embedded) are
   * copied over to the Resource object. This is always a shallow copy, so
   * modifying the a non-HAL property in the Resource object might also alter
   * the source object and vice versa.
   *
   * The Resource object also has the properties _links and _embedded but they
   * might differ from the _links/_embedded properties in the source object
   * (Halfred applies some normalization to them). These are not intended to be
   * accessed by clients directly, instead, use the provided methods to work
   * with links and embedded resources.
   */
  [key: string]: any;

}
