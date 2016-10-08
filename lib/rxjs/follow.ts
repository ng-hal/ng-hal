import { Observable, ObservableInput } from 'rxjs/Observable';
import { MergeMapOperator } from 'rxjs/operator/mergeMap';

import { HalDocument } from '../hal-document'; 


export interface FollowSignature<T> {
  (project: (value: T, index: number) => ObservableInput<HalDocument>): Observable<Session>;
}

export function follow<T>(
  project: (value: T, index: number) => ObservableInput<HalDocument>): Observable<Session> {

  return this.lift(new MergeMapOperator(project,
    (outer: T, inner: HalDocument): Session => {
      let nav = outer instanceof Session ? outer : new Session();

      if (outer instanceof HalDocument) {
        nav.history.push(outer);
      }
      nav.history.push(inner);
      nav.current = inner;

      return nav;
    }
  ));
}

export class Session {
  current: HalDocument;
  history: HalDocument[] = [];
}
