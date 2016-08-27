import { Request, Response }  from '@angular/http';

import { Resource }           from './resource';


export class HalDocument {

  constructor(
    public request: Request,
    public response: Response,
    public resource: Resource
  ) {}

}
