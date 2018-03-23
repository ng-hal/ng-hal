import { InjectionToken } from '@angular/core';

import { CONVERSION_STRATEGY } from './conversion-strategy';


describe(`CONVERSION_STRATEGY`, () => {

  it(`acts as an DI Token, i.e. is an intanceof InjectionToken`, () => {
    let isInstanceOfInjectionToken = CONVERSION_STRATEGY instanceof InjectionToken;

    expect(isInstanceOfInjectionToken).toBeTruthy();
  });

  const TOKEN_VALUE = 'NG_HAL_CONVERSION_STRATEGY';
  it(`has a constant value of ${TOKEN_VALUE}`, () => {
    expect(CONVERSION_STRATEGY.toString()).toBe(`Token ${TOKEN_VALUE}`);
  });

});
