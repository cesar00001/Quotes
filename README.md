# Introduction
CodeceptJS with REST.

## How to use
CodeceptJS <https://codecept.io/>

### Installation
This requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and devDependencies.

```sh
npm i
```

### API tests

To run all tests type

```sh
npm test
```

Sample output

```sh
GET Third stage tests --
  ✔ Verify a successful call in 1381ms
  ✔ 1. a user should NOT be able to see this stage if the transaction has failed. in 417ms
  ✔ 2. a user should be able to see a confirmation response once transaction if successful. in 418ms
  ✔ 3. a user should be able to see a link for a BTC explorer link/page. After successful purchase in 573ms
  ✔ 4. a user should be able to see the exact amount of funds deducted from their account. in 426ms
```