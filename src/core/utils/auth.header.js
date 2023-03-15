import { getItem } from "./storage.helper";

export default function authHeader() {
  let data = getItem("_dsa");

  if (data && data.rsa) {
    return { Authorization: "Bearer " +  data.rsa };
  } else {
    return {};
  }
}