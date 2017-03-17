import { OpaqueToken } from '@angular/core';

import { CONVERSION_STRATEGY } from './conversion-strategy';


describe(`CONVERSION_STRATEGY`, () => {

  it(`acts as an DI Token, i.e. is an intanceof OpaqueToken`, () => {
    let isInstanceOfOpaqueToken = CONVERSION_STRATEGY instanceof OpaqueToken;

    expect(isInstanceOfOpaqueToken).toBeTruthy();
  });

  const TOKEN_VALUE = 'NG_HAL_CONVERSION_STRATEGY';
  it(`has a constant value of ${TOKEN_VALUE}`, () => {
    expect(CONVERSION_STRATEGY.toString()).toBe(`Token ${TOKEN_VALUE}`);
  });

});
