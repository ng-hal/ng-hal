import { Request, Response } from '@angular/http';

import { Resource } from './hal/hal.interfaces';


/** **HEADS UP**: name of this class is likely to be changed in future */
export class Document {

  constructor(
    public request: Request,
    public response: Response,
    public resource: Resource
  ) {}

}
