import Axios from "axios";

// create an new axios http instance
const url = import.meta.env.VITE_APP_SERVER;

const http = Axios.create({
  baseURL: `${url}`,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

http.defaults.headers.common.accept = "application/json";

// before a request is made start  anything
// http.interceptors.request.use((config) => {
//     return config;
// });

// // before a response is returned do anything
// http.interceptors.response.use((response) => {

//   return response;
// }, error => {
//       if (
//       error.response.status === 401 &&
//       error.response.data.error === "Token has Expired"
//     ){
//       localStorage.removeItem("token");
//       return window.location = '/';
//     }
//       return error;
// });

// http.defaults.withCredentials = true;

const base_url = http.defaults.baseURL;

export { http, base_url };
