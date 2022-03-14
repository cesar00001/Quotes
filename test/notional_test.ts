// Notational quotes
// $10 USD worth of BTC - Buy or sell

// # Test Scenarios
// 1. a user should NOT be able to send a negative amount or denomination.
// 2. a user should NOT be able to send more than their account balance.
// 3. a user should NOT be able to send more than one request at a time unless the submission has finalized (third stage).
// 4. a user should only be able to sell the available amount of USD in the account.
// 5. a user should be able to send more than $10.
// 6. a user should see the exact same match of BTC worth $10 valued at the time of the request.

Feature('Notional quotes tests');

Scenario('Check for server error', async ({I}) => {
	await I.sendGetRequest('/server-down-time');
	await I.seeResponseCodeIs(500);
});

Scenario('Verify a successful call', async ({I}) => {
	await I.sendGetRequest('/notional');
	await I.seeResponseCodeIsSuccessful();
	await I.seeResponseContainsJson({"notional": "based on amount"});
});


Scenario('1. a user should NOT be able to send a negative amount or denomination.', async ({I}) => {
  await I.sendPostRequest('/notional/amount', '-100');
});

Scenario('2. a user should NOT be able to send more than their account balance.', async ({I}) => {
  await I.sendPostRequest('/notional/amount-over', '100000');
  await I.seeResponseCodeIsClientError();
});

// Scenario('3. a user should NOT be able to send more than one request at a time unless the submission has finalized (third stage).', async ({I}) => {
  
// });

Scenario('4. a user should only be able to sell the available amount of USD in the account.', async ({I}) => {
  await I.sendPostRequest('/notional/amount-check-simulation', '100');
  
	const joi = require('joi');

	await I.seeResponseCodeIs(400);
	await I.seeResponseMatchesJsonSchema(joi.object({
    amount: joi.string(),
    currentBalance: joi.number(),
    date: joi.string(),
  }));

});

Scenario('5. a user should be able to send more than $10.', async ({I}) => {
  await I.sendPostRequest('/notional/amount-check', '100');
	await I.seeResponseCodeIsSuccessful();
	const joi = require('joi');

	await I.seeResponseMatchesJsonSchema(joi.object({
    amount: joi.string(),
  }));
});

// Scenario('6. a user should see the exact same match of BTC worth $10 valued at the time of the request.', async ({I}) => {
  
// });
