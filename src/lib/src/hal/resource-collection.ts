import { Resource } from './resource';

/** @see https://github.com/basti1302/halfred#links-and-embedded-resources */
export interface ResourceCollection {
  [key: string]: Resource[];
}
