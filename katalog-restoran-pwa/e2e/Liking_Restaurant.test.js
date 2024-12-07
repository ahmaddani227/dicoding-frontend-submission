const assert = require("assert");

Feature("Liking Restaurant");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("Showing empty liked restaurant", ({ I }) => {
  I.seeElement("#favorite-resto");
  I.see("Belum ada Restaurant Favorite yang ditambahkan!", "p");
});

Scenario("Liking one restaurant", async ({ I }) => {
  I.see("Belum ada Restaurant Favorite yang ditambahkan!", "p");

  I.amOnPage("/");

  I.seeElement(".card-body div a");
  const firstRestaurant = locate(".card-body div a").first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".card");
  const likedRestaurantTitle = await I.grabTextFrom(".title");

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario("Unliking one restaurant", async ({ I }) => {
  I.see("Belum ada Restaurant Favorite yang ditambahkan!", "p");

  I.amOnPage("/");
  I.seeElement(".card-body div a");
  const firstRestaurant = locate(".card-body div a").first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".card");
  const likedRestaurantTitle = await I.grabTextFrom(".title");
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.click(locate(".card-body div a").first());
  I.waitForVisible("#likeButton", 5);
  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.see("Belum ada Restaurant Favorite yang ditambahkan!", "p");
});
