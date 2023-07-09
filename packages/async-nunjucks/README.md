# async-nunjucks

## Introduction
use nunjucks with ES6 Promise!

## Installation and Usage
```shell
npm install async-nunjucks
```

### Rendering template asynchronously
```typescript
import { AsyncNunjucks } from 'async-nunjucks';

const TEMPLATE_DIR = 'templates/';
const TEMPLATE_FILENAME = 'demo.njk';

const engine = new AsyncNunjucks({
  loader: [TEMPLATE_DIR],
  configure: {
    autoescape: false,
  },
});

async function welcome() {
  // rendering asynchronously
  const result = await engine.renderPromise(TEMPLATE_FILENAME, {
    name: 'Max10240',
  });

  console.log('2. render result:', result);
}


// Go!
welcome();

Promise.resolve().then(() =>
  console.log(`1. i am faster than "renderPromise", it won't block me!`)
);

```
A live example can bee seen at: [stackblitz example](https://stackblitz.com/edit/node-7z9srx)