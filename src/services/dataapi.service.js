import { http } from "../core/http.request";
import authHeader from "../core/utils/auth.header";
import slugify from "slugify";
class DataProviderApis {
  constructor(http) {
    this.request = http;
  }

  /**
   * GET - Get universities
   *
   */
  async getUniversities() {
    return await this.request
      .get("data/provider/universities", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }


  async getCompaniesList() {
    return await this.request
      .get("options/companies", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  async getCompaniesListBySearch(query) {
    return await this.request
      .get(`options/companies?q=${query}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async createCompany(name) {
    const payload={
      title:name,
      image:'placeholder.png',
      slugged:slugify(name)
    }
    return await this.request
      .post(`options/companies`,{...payload}, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async getSchoolsListBySearch(query) {
    return await this.request
      .get(`options/schools?q=${query}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async createSchool(name) {
    const payload={
      title:name,
      image:'placeholder.png',
    }
    return await this.request
      .post(`options/schools`,{...payload}, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }


  async getSkillsList() {
    return await this.request
      .get("options/skills", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  async getGeneralData() {
    // if 
  }
}



export default new DataProviderApis(http);
