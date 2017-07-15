import { Inject, Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions, RequestOptionsArgs,
  Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConversionStrategy, CONVERSION_STRATEGY } from './conversion/conversion-strategy';
import { Resource } from './model/hal.interfaces';
import { Transaction } from './transaction';
import { Session } from './session';


@Injectable()
export class Navigator {

  constructor(
    private http: Http,
    @Inject(CONVERSION_STRATEGY) private conversionStrategy: ConversionStrategy
  ) {}


  public get(url: string, options?: RequestOptionsArgs): Observable<Transaction> {
    return this.doNavigate(RequestMethod.Get, url, options);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Transaction> {
    return this.doNavigate(RequestMethod.Post, url, options, body);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Transaction> {
    return this.doNavigate(RequestMethod.Put, url, options, body);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Transaction>  {
    return this.doNavigate(RequestMethod.Delete, url, options);
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Transaction> {
    return this.doNavigate(RequestMethod.Patch, url, options, body);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Transaction> {
    return this.doNavigate(RequestMethod.Head, url, options);
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Transaction> {
    return this.doNavigate(RequestMethod.Options, url, options);
  }

  public navigate(url: string | Request, options?: RequestOptionsArgs): Observable<Transaction> {
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

  public createSession(): Session {
    return new Session(this);
  }

  private doNavigate(
    method: string | RequestMethod,
    url: string,
    options?: RequestOptionsArgs,
    body?: any
  ): Observable<Transaction> {
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

  private doHttp(request: Request): Observable<Transaction> {
    return this.http
      .request(request)
      .map((response: Response) => this.doConvert(request, response));
  }

  private doConvert(request: Request, response: Response): Transaction {
    let resource: Resource = this.conversionStrategy.convert(response);

    return new Transaction(request, response, resource);
  }

}
