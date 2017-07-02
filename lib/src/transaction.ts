import { Request, Response } from '@angular/http';
import { Resource } from './model/hal.interfaces';

export class Transaction {

  constructor(
    public request: Request,
    public response: Response,
    public resource: Resource
  ) {}

}
