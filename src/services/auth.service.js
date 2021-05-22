import axios from "./withAxios";
//import axios from "axios";
const login = (_id, password) => {
  return axios.post("/api/accounts/login", {
    _id,
    password,
  });
};

export default login;
