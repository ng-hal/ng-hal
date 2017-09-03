import { InjectionToken } from '@angular/core';

export interface ConversionStrategy {

  foo();
}

export const CONVERSION = new InjectionToken<ConversionStrategy>('CONVERSION');
