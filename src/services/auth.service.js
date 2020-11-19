import axios from "axios";

const register = (values) => {
  console.log("젭알", values);
  return axios.post("/api/accounts/" + "register", values);
};

const login = (_id, password) => {
  return axios.post("/api/accounts/" + "login", {
    _id,
    password,
  });
};

const logout = () => {
  localStorage.removeItem("user");
  axios
    .get("/api/accounts/" + "logout")
    .then((response) => console.log(response));
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getCookieValue = (key) => {
  let cookieKey = key + "=";
  let result = "";
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === " ") {
      cookieArr[i] = cookieArr[i].substring(1);
    }

    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
