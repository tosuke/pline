# pline - pipelining for TS/JS

## Example

```typescript
import { pipe, pipeline } from 'pline'

function flatMap<T, U>(f: (x: T) => Array<U>): (array: Array<T>) => Array<U> {
  return (array: Array<T>) => {
    let result = []
    array.forEach(x => {
      result = [...result, ...f(x)]
    })
    return result
  }
}

function map<T, U>(f: (x: T) => U): (array: Array<T>) => Array<U> {
  return (array: Array<T>) => array.map(f)
}

const result = [1, 2, 3][pipe](
  flatMap(x => [x, x * 10]),
  map(x => `${x}`)
) // ["1", "10", "2", "20", "3", "30"]


// also
const func = pipeline(
  flatMap(x => [x, x * 10]), 
  map(x => `${x}`)
)
const result = func([1, 2, 3])
```

## Features

- Chain functions like ["|>" Pipeline operator](https://github.com/tc39/proposal-pipeline-operator)
- Compose functions

## How to install
```sh
$ npm install pline
// yarn add pline
```

## Documentation

### `pipe`

chain functions

### `pipeline`

compose functions