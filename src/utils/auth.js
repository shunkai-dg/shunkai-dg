import Cookies from "js-cookie";

// Token 存于 Cookie，key 为 Authorization（原产物 app.js b775/852e）
const TokenKey = "Authorization";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
