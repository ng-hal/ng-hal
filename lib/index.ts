/// <reference path="../typings/halfred.d.ts" />
import halfred = require('halfred');
export {
  parse,
  enableValidation,
  disableValidation,
  ResourceCollection,
  LinkCollection,
  Link
} from 'halfred';

export { ConversionStrategy } from './conversion-strategy';
export { ConversionStrategyJson } from './conversion-strategy-json';
export { HalDocument } from './hal-document';
export { Navigator } from './navigator';
export { Resource } from './resource';
