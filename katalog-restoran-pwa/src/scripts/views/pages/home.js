import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <section class="hero-section" id="hero-section">
        <figure>
           <picture width="100%" height="100%">
              <source
                media="(max-width: 600px)"
                srcset="./images/heros/hero-image_4-small.jpg"
              />
              <source
                rel="preload"
                media="(max-width: 1280px)"
                srcset="./images/heros/hero-image_4-medium.jpg" width="100%" height="100%"
              />
              <img src="./images/heros/hero-image_4-large.jpg" alt="Gambar hero image"  />
          </picture>
        </figure>
      </section>
      <section class="container" id="restoran">
      <h1 class="title-page">Madu Resto Group</h1>
      
        <loader-element></loader-element>
        <div class="card-container"></div>
      </section>
    `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('.card-container');
    const loaderElement = document.querySelector('loader-element');

    const { restaurants } = await RestaurantDbSource.getRestaurants();
    loaderElement.classList.add('hidden');

    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
