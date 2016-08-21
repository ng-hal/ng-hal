import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';

import { Resource }     from 'halfred';

import { HalDocument }  from './hal-document';


export interface ConversionStrategy {

  accepts(mediaType: string): boolean;

  convert(response: Response): Resource;
}
/*
  public add(converter: Converter): ConversionStrategy {
    this.converters.push(converter);

    return this;
  }

  public next(mediaType: string): Converter {
    for (let c of this.converters) {
      if (c.accepts(mediaType)) {
        return c;
      }
    }

    return null;
  }
*/
