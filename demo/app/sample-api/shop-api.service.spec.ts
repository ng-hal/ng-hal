import { TestBed, inject } from '@angular/core/testing';

import { ShopApiService } from './shop-api.service';

describe('ShopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopApiService]
    });
  });

  it('should be created', inject([ShopApiService], (service: ShopApiService) => {
    expect(service).toBeTruthy();
  }));
});
