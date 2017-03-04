import { Observable, ObservableInput } from 'rxjs/Observable';
import { MergeMapOperator } from 'rxjs/operator/mergeMap';

import { Document } from '../document';
import { Session } from '../session';


export interface FollowSignature<T> {
  (project: (value: T, index: number) => ObservableInput<Document>): Observable<Session>;
}


export function follow<T>(
  project: (value: T, index: number) => ObservableInput<Document>): Observable<Session> {

  return this.lift(new MergeMapOperator(project,
    (outer: T, inner: Document): Session => {
      // create or re-use existing session
      let session: Session;
      if (outer instanceof Session) {
        session = outer;
      } else {
        session = new Session();
      }

      // when starting with an initial Document, push that document to session history
      if (outer instanceof Document) {
        session.history.push(outer);
      }

      session.history.push(inner);
      session.current = inner;

      return session;
    }
  ));
}
