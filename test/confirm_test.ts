// Third stage
// Confirm / Status

// # Test Scenarios
// 1. a user should NOT be able to see this stage if the transaction has failed.
// 2. a user should be able to see a confirmation response once transaction if successful.
// 3. a user should be able to see a link for a BTC explorer link/page. After successful purchase
// 4. a user should be able to see the exact amount of funds deducted from their account.
// 5. a user should be able to see the funds added to their BTC wallet.
// 6. a user should have the exact amount of BTC added to their wallet ($10 worth of BTC at the time).

Feature('Third stage tests');

Scenario('Verify a successful call', async ({I}) => {
	await I.sendGetRequest('/confirm');
	await I.seeResponseCodeIsSuccessful();
	await I.seeResponseContainsJson({"success": "purchased"});
});

Scenario('1. a user should NOT be able to see this stage if the transaction has failed.', async ({I}) => {
	await I.sendGetRequest('/failed-transaction-sim');
	await I.seeResponseCodeIs(400);
	await I.seeResponseContainsJson({"deny": "purchase not successful"});
});

Scenario('2. a user should be able to see a confirmation response once transaction if successful.', async ({I}) => {
	await I.sendGetRequest('/confirm');
	await I.seeResponseCodeIs(200);
	await I.dontSeeResponseCodeIs(500);
	await I.seeResponseContainsJson({"success": "purchased"});
});

Scenario('3. a user should be able to see a link for a BTC explorer link/page. After successful purchase', async ({I}) => {
	await I.sendGetRequest('/success-link');
	await I.seeResponseCodeIs(200);
	await I.dontSeeResponseCodeIs(500);
  await I.seeResponseContainsKeys(['blockchainLink']);
  const joi = require('joi');

  await I.seeResponseMatchesJsonSchema(joi.object({
    blockchainLink: joi.string()
  }));
	// await I.seeResponseContainsJson({"blockchainLink": "https://www.blockchain.com/btc/address/3A6oBAijvFgBCdUaX7CJJpG8VgadAScrmx"});
});

Scenario('4. a user should be able to see the exact amount of funds deducted from their account.', async ({I}) => {
	await I.sendGetRequest('/transaction-simulation');
	await I.seeResponseCodeIs(200);
	await I.seeResponseContainsJson({"success": "purchased BTC","amountRemovedFromAccountUSD": 100});

  await I.seeResponseContainsKeys(['success', 'amountRemovedFromAccountUSD']);
  const joi = require('joi');

  await I.seeResponseMatchesJsonSchema(joi.object({
    success: joi.string(),
    amountRemovedFromAccountUSD: joi.number()
  }));

});

// Scenario('5. a user should be able to see the funds added to their BTC wallet.', async ({I}) => {
  
// });

// Scenario('6. a user should have the exact amount of BTC added to their wallet ($10 worth of BTC at the time).', async ({I}) => {
  
// });
