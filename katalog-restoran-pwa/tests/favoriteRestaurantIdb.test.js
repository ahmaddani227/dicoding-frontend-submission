import { itActsAsFavoriteRestaurantModel } from "./contracts/favoriteRestaurantContract";
import FavoriteRestoIdb from "../src/scripts/data/favorite-resto-idb";

describe("Favorite Restaurant Idb Contract Test implementation", () => {
  afterEach(async () => {
    (await FavoriteRestoIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteRestoIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestoIdb);
});
