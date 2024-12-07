const assert = require("assert");

Feature("Post Review Customer");

Scenario("Post a review customer", async ({ I }) => {
  I.amOnPage("/");

  I.click(locate(".card-body div a").first());

  I.waitForElement(".form-review");

  const name = "E2E Testing Name";
  const review = "E2E Testing Review";

  I.fillField('input[name="name"]', name);
  I.fillField('textarea[name="review"]', review);

  I.click(".form-review button");

  I.seeElement(".review-customer h3");
  I.seeElement(".review-customer p");

  const lastReviewName = locate(".review-customer h3").last();
  const lastReviewContent = locate(".review-customer p").last();

  const lastReviewNameText = await I.grabTextFrom(lastReviewName);
  const lastReviewContentText = await I.grabTextFrom(lastReviewContent);

  I.wait(2);

  assert.strictEqual(lastReviewNameText, name);
  assert.strictEqual(lastReviewContentText, review);
});
