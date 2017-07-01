import { Response, ResponseOptions, Headers } from '@angular/http';

export const fakeResponse = (halDocument: any): Response =>
  fakeJsonResponse(200, halDocument);

export const fake5xxResponse = (): Response =>
  fakeJsonResponse(500, { status: 500, message: 'Internal Server Error' });

export const fakeJsonResponse = (status: number, body: any): Response => {

  return new Response(new ResponseOptions({
    status,
    body,
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }));
};
