import { cipher, decipher } from "./enc";

function storeItem(key, item) {
  var itemString = JSON.stringify(item);

  const encripted = cipher(itemString);

  localStorage.setItem(key, encripted);

}

function getItem(key) {

  if (localStorage.getItem(key)) {
    const deciper = localStorage.getItem(key);

    const data = decipher(deciper);

    var parsed = JSON.parse(data);

    return parsed;
  }

  return "";
}

export { getItem, storeItem };