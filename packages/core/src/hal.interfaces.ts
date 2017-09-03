/**
 * A resource represented by the HAL notion.
 *
 * It has two reserved properties:
 * - "_links": contains links to other resources.
 * - "_embedded": contains embedded resources.
 *
 * All other properties MUST be valid JSON, and represent the current state of the resource.
 *
 * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-4
 */
export interface Resource {

  /**
   * The reserved "_links" property is OPTIONAL.
   *
   * It is an object whose property names are link relation types (as
   * defined by [RFC5988]) and values are either a Link Object or an array
   * of Link Objects.  The subject resource of these links is the Resource
   * Object of which the containing "_links" object is a property.
   *
   * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-4.1.1
   */
  _links?: Relations<Link | Link[]>;

  /**
   * The reserved "_embedded" property is OPTIONAL
   *
   * It is an object whose property names are link relation types (as
   * defined by [RFC5988]) and values are either a Resource Object or an
   * array of Resource Objects.
   *
   * Embedded Resources MAY be a full, partial, or inconsistent version of
   * the representation served from the target URI.
   *
   * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-4.1.2
   */
  _embedded?: Relations<Resource | Resource[]>;

  [key: string]: any;

}

/**
 * A normalized resource document.
 *
 * Embedded resources and link relations are guaranteed to be an array.
 */
export interface NormalizedResource {

  _links: Relations<Link[]>;

  _embedded: Relations<Resource[]>;

  [key: string]: any;

}


/**
 * A link definition represents a hyperlink from the containing resource to a URI.
 *
 * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5
 */
export interface Link {

  /**
   * The "href" property is REQUIRED.
   *
   * Its value is either a URI [RFC3986] or a URI Template [RFC6570].
   *
   * If the value is a URI Template then the Link Object SHOULD have a
   * "templated" attribute whose value is true.
   *
   * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.1
   */
  href: string;

  /**
   * The "templated" property is OPTIONAL.
   *
   * Its value is boolean and SHOULD be true when the Link Object's "href"
   * property is a URI Template.
   *
   * Its value SHOULD be considered false if it is undefined or any other
   * value than true.
   *
   * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.2
   */
  templated?: boolean;

  /**
   * The "type" property is OPTIONAL.
   *
   * Its value is a string used as a hint to indicate the media type
   * expected when dereferencing the target resource.
   *
   * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.3
   */
  type?: string;

  /**
   * The "deprecation" property is OPTIONAL.
   *
   * Its presence indicates that the link is to be deprecated (i.e.
   * removed) at a future date.  Its value is a URL that SHOULD provide
   * further information about the deprecation.
   *
   * A client SHOULD provide some notification (for example, by logging a
   * warning message) whenever it traverses over a link that has this
   * property.  The notification SHOULD include the deprecation property's
   * value so that a client manitainer can easily find information about
   * the deprecation.
   *
   * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.4
   */
  deprecation?: string;

  /**
   * The "name" property is OPTIONAL.
   *
   * Its value MAY be used as a secondary key for selecting Link Objects
   * which share the same relation type.
   *
   * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.5
   */
  name?: string;

  /**
   * The "profile" property is OPTIONAL.
   *
   * Its value is a string which is a URI that hints about the profile (as
   * defined by [I-D.wilde-profile-link]) of the target resource.
   *
   * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.6
   */
  profile?: string;

  /**
   * The "title" property is OPTIONAL.
   *
   * Its value is a string and is intended for labelling the link with a
   * human-readable identifier (as defined by [RFC5988]).
   *
   * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.7
   */
  title?: string;

  /**
   * The "hreflang" property is OPTIONAL.
   *
   * Its value is a string and is intended for indicating the language of
   * the target resource (as defined by [RFC5988]).
   *
   * @see https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.8
   */
  hreflang?: string;

}

/** A collection of relations, keyed by string identifier. */
export interface Relations<T> {
  [rel: string]: T;
}
