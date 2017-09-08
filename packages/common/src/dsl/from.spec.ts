import { from } from './from';
import { expect } from 'chai';

describe(`from()`, () => {

});

from({}).link('foo'); // --> Link + expand()
from({}).embedded('foo'); // --> Resource

from({}).link('foo', 4);
from({}).embedded('foo', 5); // --> Resource
