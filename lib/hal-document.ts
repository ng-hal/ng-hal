import { Request, Response } from '@angular/http';
//import { Resource } from 'halfred';

export class HalDocument {

  constructor(
    private _request: Request,
    private _response: Response,
    private _resource: Resource
  ) {}

  public get request(): Request {
    return this._request;
  }

  public get response(): Response {
    return this._response;
  }

  public get resource(): Resource {
    return this._resource;
  }

}
