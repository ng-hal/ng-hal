import { Resource } from '../resource';
import { embeddedFrom } from './embedded-from';
import { linksFrom, LinkBuilder } from './links-from';

interface ResourceTraversor {

  link: (rel: string, index?: number) => LinkBuilder;
  embedded: (rel: string, index?: number) => ResourceTraversor;
}

export const from = (res: Resource): ResourceTraversor => {

  return {
    link: (rel: string, index: number = 0) => linksFrom(res).rel(rel, index),
    embedded: (rel: string, index: number = 0) => from(embeddedFrom(res).rel(rel, index))
  };
};
