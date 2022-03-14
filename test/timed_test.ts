// Timed Quotes 10s
// 1000 USD = 1 BTC - Buy or sell

// # Test Scenarios
// 1. a user should NOT be able to send a request if the 10s quote is expired.
// 2. a user should NOT be able to send more than one request if user has already moved to confirmation.
// 3. a user should only be able to send a request if there is enough BTC in their account.
// 4. a user should be able to send another quote but not be permitted to spam the request.
// 5. a user should not be able to submit a negative amount.
// 6. price quote expired? user should be able to send another request.

Feature('10s timed quotes tests');

Scenario('Verify a successful call', async ({I}) => {
	await I.sendGetRequest('/timed');
	await I.seeResponseCodeIsSuccessful();
	await I.seeResponseContainsJson({"timer":"valid for 10s"});
  const joi = require('joi');

  await I.seeResponseMatchesJsonSchema(joi.object({
    timer: joi.string()
  }));
});

Scenario('1. a user should NOT be able to send a request if the 10s quote is expired.', async ({I}) => {
	await I.sendGetRequest('/timer/expired');
  await I.setRequestTimeout(10000);
	await I.seeResponseCodeIsClientError();
	await I.seeResponseContainsJson({"timer": "0s","status": "expired","invalid": "please resubmit"});
  const joi = require('joi');

  await I.seeResponseMatchesJsonSchema(joi.object({
    timer: joi.string(),
    status: joi.string(),
    invalid: joi.string()
  }));
});

Scenario('2. a user should NOT be able to send more than one request if the first one is successful.', async ({I}) => {
});

Scenario('3. a user should only be able to send a request if there is enough BTC in their account.', async ({I}) => {
	await I.sendPostRequest('/timed/amount');
  await I.seeResponseContainsKeys(['errors']);
});

Scenario('4. a user should be able to send another quote but not be able to spam the request', async ({I}) => {
	await I.sendGetRequest('/timed');
  console.log('sending 10 requests');
  for (let index = 0; index < 10; index++) {
    await I.retry('/timed');
  }

  await I.dontSeeResponseCodeIs(429);  // check for rate limit

  const joi = require('joi');
  await I.seeResponseMatchesJsonSchema(joi.object({
    timer: joi.string(),
  }));
});

Scenario('5. a user should not be able to submit a negative amount.', async ({I}) => {
  const joi = require('joi');
  await I.sendPostRequest('/timed/amount-negative-simulation', '-100');
  await I.seeResponseContainsKeys(['errors']);

  await I.seeResponseMatchesJsonSchema(joi.object({
    errors: joi.array(),
  }));
});

Scenario('6. price quote expired? user should be able to send another request.', async ({I}) => {
  const joi = require('joi');
  await I.sendGetRequest('/timer/expired');
  await I.seeResponseMatchesJsonSchema(joi.object({
    timer: joi.string(),
    status: joi.string(),
    invalid: joi.string()
  }));

  await I.setRequestTimeout(10000);
  await I.sendGetRequest('/timed');
  await I.seeResponseMatchesJsonSchema(joi.object({
    timer: joi.string(),
  }));
});
