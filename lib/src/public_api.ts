// HAL API (interfaces)
export * from './model/hal.interfaces';

// For customization of conversion strategy
export { ConversionStrategy, CONVERSION_STRATEGY } from './conversion/conversion-strategy';
export { JsonConversionStrategy } from './conversion/json-conversion-strategy';

export { HalModule } from './hal.module';
export { Navigator } from './navigator';
export { Session } from './session';
export { Transaction } from './transaction';
