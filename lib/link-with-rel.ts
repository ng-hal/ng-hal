/// <reference path="../typings/halfred.d.ts" />
import { Link } from 'halfred';

export interface LinkWithRel extends Link {
  rel: string;
}
