import { Inject, Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpResponse,
} from "@angular/common/http";

import { Observable } from "rxjs";

import { ConversionStrategy, CONVERSION_STRATEGY } from "./conversion";
import { Resource } from "./hal";

import { Document } from "./document";
import { map } from "rxjs/operators";

@Injectable()
export class Navigator {
  constructor(
    private http: HttpClient,
    @Inject(CONVERSION_STRATEGY)
    private conversionStrategy: ConversionStrategy
  ) {}

  public get(
    url: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<Document> {
    return this.doNavigate("GET", url, options);
  }

  public post(
    url: string,
    body: any,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<Document> {
    return this.doNavigate("POST", url, options, body);
  }

  public put(
    url: string,
    body: any,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<Document> {
    return this.doNavigate("PUT", url, options, body);
  }

  public delete(
    url: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<Document> {
    return this.doNavigate("DELETE", url, options);
  }

  public patch(
    url: string,
    body: any,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<Document> {
    return this.doNavigate("PATCH", url, options, body);
  }

  public head(
    url: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<Document> {
    return this.doNavigate("HEAD", url, options);
  }

  public options(
    url: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<Document> {
    return this.doNavigate("OPTIONS", url, options);
  }

  public navigate(
    url: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<Document> {
    let req: HttpRequest<any>;
    req = new HttpRequest<any>("GET", url, options);
    return this.doHttp(req);
  }

  private doNavigate(
    method: string,
    url: string,
    options?: { headers?: HttpHeaders; params?: HttpParams },
    body?: any
  ): Observable<Document> {
    let request = new HttpRequest<any>(method, url, options);

    if (body) {
      request = new HttpRequest<any>(method, url, body, options);
    }

    return this.doHttp(request);
  }

  private doHttp(request: HttpRequest<any>): Observable<Document> {
    return this.http
      .request(request.method, request.url, {
        body: request.body,
        headers: request.headers,
        observe: "response",
        params: request.params,
        responseType: "json",
        reportProgress: false,
      })
      .pipe(
        map((response: HttpResponse<any>) => this.doConvert(request, response))
      );
  }

  private doConvert(
    request: HttpRequest<any>,
    response: HttpResponse<any>
  ): Document {
    let resource: Resource = this.conversionStrategy.convert(response);

    return new Document(request, response, resource);
  }
}
