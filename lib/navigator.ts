import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConversionStrategy }   from './conversion-strategy';
import { HalDocument }          from './hal-document';


import { parse, Resource } from 'halfred';
console.log("navigator.ts", parse, Resource);


@Injectable()
export class Navigator {

  constructor(
    private http: Http,
    private conversionStrategy: ConversionStrategy
  ) {}


  public get(url: string, options?: RequestOptionsArgs): Observable<HalDocument> {

    return this.http
      .get(url, options)
      .map((res: Response) => this.doConvert(res));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<HalDocument> {

    return this.http
      .post(url, body, options)
      .map((res: Response) => this.doConvert(res));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<HalDocument> {

    return this.http
      .put(url, body, options)
      .map((res: Response) => this.doConvert(res));
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<HalDocument>  {

    return this.http
      .delete(url, options)
      .map((res: Response) => this.doConvert(res));
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<HalDocument> {

    return this.http
      .patch(url, body, options)
      .map((res: Response) => this.doConvert(res));      
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<HalDocument> {

    return this.http
      .head(url, options)
      .map((res: Response) => this.doConvert(res));
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<HalDocument> {

    return this.http
      .options(url, options)
      .map((res: Response) => this.doConvert(res));
  }

  public navigate(url: string | Request, options?: RequestOptionsArgs): Observable<HalDocument> {

    return this.http
      .request(url, options)
      .map((res: Response) => this.doConvert(res));
  }

  private doConvert(response: Response): HalDocument {
    let mediaType: string = response.headers.get('Content-Type');
    if (this.conversionStrategy.accepts(mediaType)) {
      let resource: Resource = this.conversionStrategy.convert(response);

      return new HalDocument(null, response, resource);
    }

    return null;
  }

}
