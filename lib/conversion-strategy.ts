import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';

import { HalDocument }  from './hal-document';
import { Resource }     from './resource';


export abstract class ConversionStrategy {

  abstract accepts(mediaType: string): boolean;

  abstract convert(response: Response): Resource;
}
