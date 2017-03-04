import { Request, Response }  from '@angular/http';

import { Resource }           from './hal';


/** HEADS UP: naming of this class is going to be discussed and likely to be changed in future */
export class Document {

  constructor(
    public request: Request,
    public response: Response,
    public resource: Resource
  ) {}

}
