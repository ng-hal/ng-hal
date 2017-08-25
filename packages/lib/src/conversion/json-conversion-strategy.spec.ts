import { Headers, Response, ResponseOptions } from '@angular/http';

import { Parser } from '../parser/parser';
import { Resource } from '../hal/hal.model';
import { ResourceImpl } from '../hal/resource';

import { JsonConversionStrategy } from './json-conversion-strategy';


describe(`JsonConversionStrategy`, () => {
  let fakeParser: Parser;
  let jsonConversion: JsonConversionStrategy;
  let mockJsonResponse: Response;
  const MOCK_RESPONSE_BODY = { success: true };
  beforeEach(() => {
    let body = JSON.stringify(MOCK_RESPONSE_BODY);
    let headers = new Headers();

    mockJsonResponse = new Response(new ResponseOptions({ body, headers }));

    fakeParser = new Parser();
    spyOn(fakeParser, 'parse').and.callFake((input: any): Resource => {

      return new ResourceImpl({});
    });

    jsonConversion = new JsonConversionStrategy(fakeParser);
  });


  // verify accepted mime types
  const ACCEPTED_MIME_TYPES: string[] = [
    'application/json',
    'application/hal+json'
  ];
  ACCEPTED_MIME_TYPES.forEach((mimeType: string) => {
    it(`accepts MIME type '${mimeType}'`, () => {
      mockJsonResponse.headers.set('Content-Type', mimeType);

      expect(jsonConversion.accepts(mockJsonResponse)).toBeTruthy();
    });
  });

  // verify JSON conversion
  it(`converts JSON to JavaScript Object literals`, () => {
    const resource = jsonConversion.convert(mockJsonResponse);

    expect(resource).toBeDefined();
    expect(fakeParser.parse).toHaveBeenCalled();
  });

});
