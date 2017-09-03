import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resource } from '../hal.interfaces';

export interface Transport {

  get(urlOrResource: string | Resource, options: any): Observable<Resource>;

}

export const TRANSPORT = new InjectionToken<Transport>('TRANSPORT');
