import RestaurantDbSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import { createDetailRestaurantTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import ImgDetailInitiator from '../../utils/img-detail-initiator';
import Swal from 'sweetalert2';

const Detail = {
  async render() {
    return `
      <section class="container pb-4" id="detail"></section> 
      <loader-element></loader-element>
      <h1 class="mt-4 mb-2 text-center">Tambahkan Review</h1>
      <div class="container">
        <div class="flex justify-center">
          <form class="form-review" id="form-review">
            <div class="mb-2">
              <label for="name">Nama</label>
              <input type="text" name="name" placeholder="Masukkan Nama Anda" id="name" required>
            </div>
            <div class="mb-2">
              <label for="review">Review</label>
              <textarea id="review" name="review" placeholder="Masukkan Review Anda" required></textarea>
            </div>
            <div class="mb-2">
              <button type="submit">Kirim</button>
            </div>
          </form>
        </div>
      </div>
      <div id="likeButtonContainer"></div> 
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantContainer = document.querySelector('#detail');
    const loaderElement = document.querySelector('loader-element');
    const inputName = document.querySelector('#name');
    const inputReview = document.querySelector('#review');
    const formReview = document.querySelector('#form-review');

    const restaurant = await RestaurantDbSource.restaurantDetail(url.id);
    loaderElement.classList.add('hidden');

    restaurantContainer.innerHTML = createDetailRestaurantTemplate(
      restaurant.restaurant
    );

    formReview.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const data = {
        id: url.id,
        name: inputName.value,
        review: inputReview.value,
      };

      const date = new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const reviewContainer = document.querySelector('.review-container');
      const templateReview = `
        <div class="review-customer">
          <h3>${data.name}</h3>
          <span class="date-review">${date}</span>
          <p>${data.review}</p>
        </div>
      `;

      const response = await RestaurantDbSource.sendReview(data);
      if (response?.message) {
        Swal.fire({
          title: 'Success!',
          text: 'Review Berhasil Ditambahkan',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      reviewContainer.innerHTML += templateReview;
      inputName.value = '';
      inputReview.value = '';
    });

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
        description: restaurant.restaurant.description,
        rating: restaurant.restaurant.rating,
      },
    });

    ImgDetailInitiator.init(document.querySelector('section#detail figure'));
  },
};

export default Detail;
