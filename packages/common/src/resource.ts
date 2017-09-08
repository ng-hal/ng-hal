import { Relations } from './relations';
import { Link } from './link';

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
