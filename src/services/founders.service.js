import { http } from "../core/http.request";
import authHeader from "../core/utils/auth.header";

class FounderService {
  constructor(http) {
    this.request = http;
  }
  /**
   * GET - Get approved vcs
   *
   */
  async getFounder({limit,page}) {
    return await this.request
      .get(`/founders/?limit=${limit}&page=${page}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  async getMyFounder({limit,page}) {
    return await this.request
      .get(`/founders/my?limit=${limit}&page=${page}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  /**
   * GET - Get filtered founder
   *
   */

  async filterFounder(query) {
    return await this.request
      .get(`/founders/approved/?${query}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  /**
   * POST-- create founders
   * @param {*} data
   */
  async createFounder(data) {
    return await this.request
      .post(
        "/founders",
        data,
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
  /**
   * PUT -- update founder
   * @param {*} data
   */
  async updateFounder(data, id) {
    return await this.request
      .put(
        `founders/${id}`,
          data,
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
  async claimCompany(id) {
    return await this.request
      .post(
        "/founders/claim",
        {id},
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
}



export default new FounderService(http);
