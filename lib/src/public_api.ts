// RxJS extensions
import './rxjs/add/follow';
export * from './rxjs/follow';

// HAL API (interfaces)
export * from './hal/hal.interfaces';

// URI Templates API
export { Uri } from './uri/uri';

// For customization of conversion strategy
export { ConversionStrategy, CONVERSION_STRATEGY } from './conversion/conversion-strategy';
export { JsonConversionStrategy } from './conversion/json-conversion-strategy';

export { Document } from './document';
export { HalModule } from './hal.module';
export { Navigator } from './navigator';
export { Session } from './session';
