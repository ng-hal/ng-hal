/** A collection of relations, keyed by string identifier. */
export interface Relations<T> {
  [rel: string]: T;
}
