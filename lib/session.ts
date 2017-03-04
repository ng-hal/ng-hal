import { Document } from './document';

export class Session {
  current: Document;
  history: Document[] = [];
}
