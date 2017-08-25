import { Observable } from 'rxjs/Observable';
import { follow, FollowSignature } from '../follow';

Observable.prototype.follow = follow;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    follow: FollowSignature<T>;
  }
}
