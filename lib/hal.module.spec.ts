import { HalModule } from './hal.module';

describe(`HalModule`, () => {

  it(`returns root providers by forRoot()`, () => {
    let rootModule = HalModule.forRoot();

    expect(rootModule).toBeDefined();
    expect(rootModule.providers).toBeDefined();
    expect(rootModule.providers.length).toBeGreaterThan(0);
  });
});
