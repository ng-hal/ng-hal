import { Link } from './link';

/** @see https://github.com/basti1302/halfred#links-and-embedded-resources */
export interface LinkCollection {
  [rel: string]: Link[];
}
