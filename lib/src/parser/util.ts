import { ResourceDocument, LinkDefinition } from '../model/hal.interfaces';

export const deepCopy = <T>(input: T): T => {
  return JSON.parse(JSON.stringify(input));
};

export const asArray = <T>(test: T | T[]): T[] => {

  if (test instanceof Array) {
    return test;
  } else {
    return [ test ];
  }
};

export const asResource = (test: ResourceDocument | ResourceDocument[]): ResourceDocument[] => {
  return asArray<ResourceDocument>(test);
};

export const asLink = (test: LinkDefinition | LinkDefinition[]): LinkDefinition[] => {
  return asArray<LinkDefinition>(test);
};
