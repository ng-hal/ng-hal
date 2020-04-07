import { InjectionToken } from "@angular/core";
import { Response } from "@angular/http";

import { Resource } from "../hal";
import { HttpResponse } from "@angular/common/http";

/** Concrete converters need to implement this interface. */
export interface ConversionStrategy {
  accepts(response: HttpResponse<any>): boolean;

  convert(response: HttpResponse<any>): Resource;
}

/**
 * Injecting this DI token resolves to an instance of a ConversionStrategy.
 *
 * Usage: <code>@Inject(CONVERSION_STRATEGY) converter: ConversionStrategy</code>
 */
export const CONVERSION_STRATEGY = new InjectionToken(
  "NG_HAL_CONVERSION_STRATEGY"
);
