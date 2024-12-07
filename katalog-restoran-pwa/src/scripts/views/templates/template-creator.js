import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
    <card-element
      id="${restaurant.id}"
      name="${restaurant.name}"
      city="${restaurant.city}"
      image="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}"
      rating="${restaurant.rating}"
      href="${`#/detail/${restaurant.id}`}"
      description="${restaurant.description}"
    ></card-element>
`;

const createDetailRestaurantTemplate = (restaurant) => `
    <h1 class="title-detail">${restaurant.name}</h1>
    <figure>
      <img src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" 
      alt="${restaurant.name}" class="object-cover">
    </figure>
    <div class="flex justify-between mb-2">
      <p>${restaurant.address}</p>
      <p>${restaurant.city}</p>
      </div>
    <p class="text-justify">${restaurant.description}</p>
    <h1 class="mt-4 mb-2 text-center">Daftar Menu</h1>
    <div class="detail-menu">
      <div class="menu-container">
        <h3>Minuman</h3>
        <div class="menu">
          ${restaurant.menus.drinks
    .map((food) => `<p class="menu-item text-center">${food.name}</p>`)
    .join('')}
        </div>
      </div>
      <div class="menu-container">
        <h3>Makanan</h3>
        <div class="menu">
          ${restaurant.menus.foods
    .map((food) => `<p class="menu-item text-center">${food.name}</p>`)
    .join('')}
        </div>
      </div>
    </div>
    <h1 class="mt-4 mb-2 text-center">Review Customer</h1>
    <div class="review-container">
      ${restaurant.customerReviews
    .map(
      (review) => `
          <div class="review-customer">
            <h3>${review.name}</h3>
            <span class="date-review">${review.date}</span>
            <p>${review.review}</p>
          </div>
        `
    )
    .join('')}
    </div>
`;

const createLikeButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="favorite">
      <i class="fa fa-heart-o text-white" aria-hidden="true"></i>
    </button>
`;

const createLikedButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="favorite">
      <i class="fa fa-heart text-red" aria-hidden="true"></i>
    </button>
`;

export {
  createRestaurantItemTemplate,
  createDetailRestaurantTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
