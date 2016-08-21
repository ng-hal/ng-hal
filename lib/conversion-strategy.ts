import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';

import { Resource }     from 'halfred';

import { HalDocument }  from './hal-document';


export abstract class ConversionStrategy {

  abstract accepts(mediaType: string): boolean;

  abstract convert(response: Response): Resource;
}
