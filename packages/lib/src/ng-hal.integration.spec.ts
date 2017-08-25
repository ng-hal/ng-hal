import { Injector } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { Http, HttpModule, Request, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { NORMALIZED } from '../fixtures/hal/normalized';

import { HalModule } from './hal.module';
import { Navigator } from './navigator';
import { Document } from './document';
import { fakeResponse } from '../fixtures/responses';

/** Integration test for 'ng-hal' library */
describe(`ng-hal`, () => {
  let backend: MockBackend;

  // setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        HalModule.forRoot()
      ],
      providers: [
        { provide: MockBackend, useClass: MockBackend },
        { provide: XHRBackend, useExisting: MockBackend },
        Navigator
      ]
    });
    backend = TestBed.get(MockBackend);

    spyOn(Http.prototype, 'request').and.callThrough();
  });

  afterEach(() => backend.verifyNoPendingRequests());


  it(`should return a hal resource`, async(inject([ Navigator, MockBackend ],
    (navigator: Navigator, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe((c: MockConnection) => {
        c.mockRespond(fakeResponse(NORMALIZED));
      });

      navigator.get(`/foo.json`)
        .subscribe((next: Document) => {

          expect(next).toBeTruthy();
          expect(next.resource).toBeTruthy();
          expect(next.resource.link('self').uri().expand({})).toBe('dummy');
        });
    }
  )));

});
