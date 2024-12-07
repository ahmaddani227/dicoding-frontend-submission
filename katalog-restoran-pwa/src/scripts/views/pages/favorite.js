import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
            <section id="favorite-resto" class="container pt-2 pb-4">
              <h1 class="title-page mt-4">Restaurant Favorite</h1>
              
              <div class="card-container"></div>
              <p id="empty-restaurant"></p>
            </section>
        `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestoIdb.getAllRestaurants();
    const favoriteContainer = document.querySelector('.card-container');
    const emptyRestaurant = document.getElementById('empty-restaurant');

    if (restaurants.length === 0) {
      emptyRestaurant.innerHTML = `
        <p class="empty-restaurant">Belum ada Restaurant Favorite yang ditambahkan!</p>
      `;
    }

    restaurants.forEach((restaurant) => {
      favoriteContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Favorite;
