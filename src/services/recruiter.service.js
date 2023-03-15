import { http } from "../core/http.request";
import authHeader from "../core/utils/auth.header";

class RecruiterService {
  constructor(http) {
    this.request = http;
  }
  
  async requestAccess(data) {
    return await this.request
      .post('/recruiters', data,
      { headers: authHeader() })
      .then((res) => {
        return res.data;
      })
  }
}

export default new RecruiterService(http);