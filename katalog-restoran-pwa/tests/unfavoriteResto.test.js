import LikeButtonInitiator from "../src/scripts/utils/like-button-initiator";
import FavoriteRestoIdb from "../src/scripts/data/favorite-resto-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Unfavorite Resto", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestoIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestoIdb.deleteRestaurant(1);
  });

  it("should display unlike widget when the restaurant has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: 1,
    });

    expect(
      document.querySelector("[aria-label='unlike this restaurant']")
    ).toBeTruthy();
  });

  it("should not display like widget when the restaurant has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: 1,
    });

    expect(
      document.querySelector("[aria-label='like this restaurant']")
    ).toBeFalsy();
  });

  it("should be able to remove liked restaurant from the list", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: 1,
    });

    document
      .querySelector("[aria-label='unlike this restaurant']")
      .dispatchEvent(new Event("click"));

    expect(await FavoriteRestoIdb.getAllRestaurants()).toEqual([]);
  });

  it("should not throw error when user click widget if the unfavorite restaurant is not in the list", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: 1,
    });

    await FavoriteRestoIdb.deleteRestaurant(1);
    document
      .querySelector("[aria-label='unlike this restaurant']")
      .dispatchEvent(new Event("click"));

    expect(await FavoriteRestoIdb.getAllRestaurants()).toEqual([]);
  });
});
