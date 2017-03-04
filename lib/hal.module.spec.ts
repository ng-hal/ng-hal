import { HalModule } from './hal.module';

describe(`HalModule`, () => {

  it(`forRoot() returns root-scoped providers`, () => {
    let rootModule = HalModule.forRoot();

    expect(rootModule).toBeDefined();
    expect(rootModule.providers).toBeDefined();
    expect(rootModule.providers.length).toBeGreaterThan(0);
  });
});
