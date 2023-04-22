# Unique Promise

[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]

A typical use case would be some express routes that resolve database queries that should only be called once and respond with the same result to all requests.

```ts
import uniquePromise from '@public-function/unqiue-promise';

const executeLongRunningFunction = async (): Promise<number> => {
    // is only called once
}

const results = await Promise.all([
    uniquePromise('some-id', executeLongRunningFunction),
    uniquePromise('some-id', executeLongRunningFunction),
]);

```




[npm-url]: https://npmjs.org/package/@public-function/unique-promise
[npm-version-image]: https://badgen.net/npm/v/@public-function/unique-promise
[npm-install-size-image]: https://badgen.net/packagephobia/install/@public-function/unique-promise
[npm-install-size-url]: https://packagephobia.com/result?p=/@public-function/unique-promise
