import { Injectable }           from '@angular/core';
import {
  Http,
  Request,
  RequestMethod,
  RequestOptions,
  RequestOptionsArgs,
  Response
}                               from '@angular/http';

import { Observable }           from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConversionStrategy }   from './conversion-strategy';
import { HalDocument }          from './hal-document';
import { Resource }             from './resource';


@Injectable()
export class Navigator {

  constructor(
    private http: Http,
    private conversionStrategy: ConversionStrategy
  ) {}


  public get(url: string, options?: RequestOptionsArgs): Observable<HalDocument> {
    return this.doNavigate(RequestMethod.Get, url, options);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<HalDocument> {
    return this.doNavigate(RequestMethod.Post, url, options, body);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<HalDocument> {
    return this.doNavigate(RequestMethod.Put, url, options, body);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<HalDocument>  {
    return this.doNavigate(RequestMethod.Delete, url, options);
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<HalDocument> {
    return this.doNavigate(RequestMethod.Patch, url, options, body);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<HalDocument> {
    return this.doNavigate(RequestMethod.Head, url, options);
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<HalDocument> {
    return this.doNavigate(RequestMethod.Options, url, options);
  }

  public navigate(url: string | Request, options?: RequestOptionsArgs): Observable<HalDocument> {
    let req: Request;
    if (typeof url === 'string') {
      let opts: RequestOptionsArgs = options ? options : {};
      opts.url = url as string;

      req = new Request(new RequestOptions(options));
    } else {
      req = url as Request;
    }

    return this.doHttp(req);
  }

  private doNavigate(
    method: string | RequestMethod,
    url: string,
    options?: RequestOptionsArgs,
    body?: any
  ): Observable<HalDocument> {
    if (options) {
      options.url = url;
      options.method = method;
    } else {
      options = { url, method };
    }

    if (body) {
      options.body = body;
    }

    let request: Request = new Request(new RequestOptions(options));

    return this.doHttp(request);
  }

  private doHttp(request: Request): Observable<HalDocument> {
    return this.http
      .request(request)
      .map((response: Response) => this.doConvert(request, response));
  }

  private doConvert(request: Request, response: Response): HalDocument {
    let resource: Resource = this.conversionStrategy.convert(response);

    return new HalDocument(request, response, resource);
  }

}
