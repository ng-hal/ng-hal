import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { Navigator } from './navigator';
import { Resource } from './model/hal.interfaces';
import { Transaction } from './transaction';

export class Session {

  current: Resource;

  history: Transaction[] = [];

  private _obs: Observable<Session>;

  constructor(
    private navigator: Navigator
  ) {}


  // TODO
  public follow(): Observable<Session> {

    return this.chainSelfObservable(this.navigator.get('/foo'));
  }

  // TODO
  public traverse(): Observable<Session> {

    return this.chainSelfObservable(this.navigator.get('/foo'));
  }

  private chainSelfObservable(obs: Observable<Transaction>): Observable<Session> {

    if (this._obs) {
      this._obs = this._obs.mergeMap(() => obs, (outer: Session, inner: Transaction) => {
        this.current = inner.resource;
        this.history.push(inner);

        return outer; // outer is equal to this
      });
    } else {
      this._obs = obs.map((value: Transaction) => {
        this.current = value.resource;
        this.history.push(value);

        return this;
      });
    }

    return this._obs;

  }

}
