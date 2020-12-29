import axios from "axios";

const register = (values) => {
  console.log("젭알", values);
  return axios
    .post("/api/accounts/register", values)
    .then((res) => console.log("회원가입test", res));
};

const login = (_id, password) => {
  return axios.post("/api/accounts/" + "login", {
    _id,
    password,
  });
};

const logout = () => {
  return axios.get("/api/accounts/logout");
};

export default {
  register,
  login,
  logout,
};
