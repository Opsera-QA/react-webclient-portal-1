
const cookieHelpers = {};

cookieHelpers.getCookieName = (screenName, variableName) => {
  return screenName + "-" + variableName;
};

cookieHelpers.setCookie = (screenName, variableName, value) => {
  let cookieName = cookieHelpers.getCookieName(screenName, variableName);
  localStorage.setItem(cookieName, value);
};

cookieHelpers.getCookie = (screenName, variableName) => {
  let cookieName = cookieHelpers.getCookieName(screenName, variableName);
  return localStorage.getItem(cookieName);
};

cookieHelpers.deleteCookie = (screenName, variableName) => {
  let cookieName = cookieHelpers.getCookieName(screenName, variableName);
  localStorage.removeItem(cookieName);
};

export default cookieHelpers;