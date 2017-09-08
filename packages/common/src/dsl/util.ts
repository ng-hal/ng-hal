export function fromRel<T>(input: T | T[], index: number): T {
  if (input instanceof Array) {
    if (input.length > index) {
      return input[index];
    } else {
      throw new Error(`Index ${index} does not exist in array!`);
    }
  } else if (input) {
    return input;
  }

  throw new Error(`Undefined input given!`);
}


