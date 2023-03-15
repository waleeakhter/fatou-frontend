import { http } from "../core/http.request";
import authHeader from "../core/utils/auth.header";

class BuzzService {
  constructor(http) {
    this.request = http;
  }
  /**
   * GET - Get single feed
   * @returns single feeds
   */

  async getSingleFeed(buzzId) {
    return await this.request
      .get(`/feeds/:${buzzId}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  /**
   * GET - Get all feeds
   *@returns all feeds
   */

  async getAllFeeds() {
    return await this.request
      .get("/feeds", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  /**
   * POST - create new feed
   * @param {*} data
   * @returns  newly created feed
   */

  async createBuzz(data) {
    return await this.request
      .post("/feeds", data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  /**
   * PUT -- update feed
   * @param {*} data
   * @returns updated feeds
   */
  async editBuzzPost(data, buzzId) {
    return await this.request
      .put(`feeds:/${buzzId}`, data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new BuzzService(http);
