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

const logout = async () => {
  console.log("로그아웃 중");
  return await axios.get("/api/accounts/logout");
};

export default {
  register,
  login,
  logout,
};
