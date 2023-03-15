import { http } from "../core/http.request";
import authHeader from "../core/utils/auth.header";

class VcsService {
  constructor(http) {
    this.request = http;
  }
  /**
   * GET - Get approved vcs
   *
   */

  async getVcs() {
    return await this.request
      .get("/vcs/approved", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  /**
   * GET - Get filtered approved vcs
   *
   */

  async filterVcs(query) {
    return await this.request
      .get(`/vcs/approved/?${query}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  /**
   * POST-- create vcs
   * @param {*} data
   */
  async createVcs(data) {
    return await this.request
      .post(
        "/vcs",
          data,
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
  /**
   * PUT -- update vcs
   * @param {*} data
   */
  async updateVcs(data, id) {
    return await this.request
      .put(
        `vcs:/${id}`,
        {
          ...data,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
}

export default new VcsService(http);
