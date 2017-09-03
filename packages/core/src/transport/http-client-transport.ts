import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Transport } from '../transport/transport';
import { Resource } from '../hal.interfaces';

@Injectable()
export class HttpClientTransport implements Transport {

  constructor (
    private http: HttpClient // <-- implementation detail: do we actually sit on top of HttpClient?
    // If yes, we should kind of "decorate" requests (w/ Accept / Content-Type)
    // How do we go w/ the overloaded methods and `responseType` (which we need to know in advance)?
    // Can we go w/ HttpHandler?
    //   |-> if yes, maybe we build HttpRequest directly and set up serialization around it...
    // Can we go w/ HttpInterceptors for modifying requests?
    //   |--> if yes, maybe interceptors should do the serialization / deserialization
  ) {}


  get<T extends Resource>(url: string, options: any): Observable<T> {

    return this.http.request<T>('GET', url);
  }

}
