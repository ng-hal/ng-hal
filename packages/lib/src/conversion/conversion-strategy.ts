import { InjectionToken } from '@angular/core';
import { Response } from '@angular/http';

import { Resource } from '../hal/hal.model';


/**
 * A strateg for converting HTTP responses to Resources.
 *
 * Concrete converters need to implement this interface.
 */
export interface ConversionStrategy {

  accepts(response: Response): boolean;

  convert(response: Response): Resource;
}


/**
 * Injecting this DI token resolves to an instance of a ConversionStrategy.
 *
 * Usage: <code>@Inject(CONVERSION_STRATEGY) converter: ConversionStrategy</code>
 */
export const CONVERSION_STRATEGY =
  new InjectionToken<ConversionStrategy>(`NG_HAL_CONVERSION_STRATEGY`);
