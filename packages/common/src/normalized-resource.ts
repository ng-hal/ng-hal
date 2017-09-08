import { Resource } from './resource';
import { Relations } from './relations';
import { Link } from './link';

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
