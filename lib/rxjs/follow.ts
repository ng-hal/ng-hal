import { Observable, ObservableInput } from 'rxjs/Observable';
import { MergeMapOperator } from 'rxjs/operator/mergeMap';

import { HalDocument } from '../hal-document'; 


export interface FollowSignature<T> {
  (project: (value: T, index: number) => ObservableInput<HalDocument>): Observable<HalNavigation>;
}

export function follow<T>(
  project: (value: T, index: number) => ObservableInput<HalDocument>): Observable<HalNavigation> {

  return this.lift(new MergeMapOperator(project,
    (outer: T, inner: HalDocument): HalNavigation => {
      let nav = outer instanceof HalNavigation ? outer : new HalNavigation();

      if (outer instanceof HalDocument) {
        nav.history.push(outer);
      }
      nav.history.push(inner);
      nav.current = inner;

      return nav;
    }
  ));
}

export class HalNavigation {
  current: HalDocument;
  history: HalDocument[] = [];
}
