import { Response } from "@angular/http";

import { Resource } from "./hal";
import { HttpRequest, HttpResponse } from "@angular/common/http";

/** HEADS UP: naming of this class is going to be discussed and likely to be changed in future */
export class Document {
  constructor(
    public request: HttpRequest<any>,
    public response: HttpResponse<any>,
    public resource: Resource
  ) {}
}
