import { Response, ResponseOptions, Headers } from '@angular/http';

export const fakeResponse = (halDocument: any): Response => {

  return new Response(new ResponseOptions({
    body: JSON.stringify(halDocument),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    status: 200
  }));
};
