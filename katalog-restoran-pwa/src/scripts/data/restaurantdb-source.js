import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDbSource {
  static async getRestaurants() {
    const response = await fetch(API_ENDPOINT.list);
    const responseJson = await response.json();
    return responseJson;
  }

  static async restaurantDetail(id) {
    const response = await fetch(API_ENDPOINT.detail(id));
    const responseJson = await response.json();
    return responseJson;
  }

  static async sendReview(data) {
    try {
      const response = await fetch(API_ENDPOINT.postReview, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }
}

export default RestaurantDbSource;
