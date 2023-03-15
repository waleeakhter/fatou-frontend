import { http } from "../core/http.request";

class AccessRequestService {
    constructor(http) {
      this.request = http;
    }
  
  
    async create(data) {
      return  this.request
        .post("access-request", {
          ...data,
        })
        .then((response) => {
          return response.data;
        });
    }
  
  }
  
  export default new AccessRequestService(http);
  