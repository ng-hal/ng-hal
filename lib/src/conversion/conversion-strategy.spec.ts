import { CONVERSION_STRATEGY } from './conversion-strategy';

describe(`CONVERSION_STRATEGY`, () => {

  const TOKEN_VALUE = 'NG_HAL_CONVERSION_STRATEGY';
  it(`has a constant value of ${TOKEN_VALUE}`, () => {
    expect(CONVERSION_STRATEGY.toString()).toBe(`InjectionToken ${TOKEN_VALUE}`);
  });

});
