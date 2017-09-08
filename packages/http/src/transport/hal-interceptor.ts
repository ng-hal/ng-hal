import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Injectable()
export class HalInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(
      req.clone({
        headers: req.headers.set('Accept', 'application/hal+json')
      })
    )
//    .filter((event) => event instanceof HttpResponse)
//    .map((response) => { return {}; });
/*
    return next.handle(req).map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }).catch(err => {
      if (err instanceof HttpErrorResponse {
          if (err.status === 401) {
             // JWT expired, go to login
             // Observable.throw(err);
          }
        }
    })
*/

  }
}
