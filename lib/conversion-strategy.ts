import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';

import { Resource }     from './resource';


export abstract class ConversionStrategy {

  abstract accepts(response: Response): boolean;

  abstract convert(response: Response): Resource;
}
