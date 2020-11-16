import axios from "axios";

const AuthCheck = (props,option, checkAdmin = false) => {
    let auth=false;
    let datas = {};
  axios.get("/api/accounts/auth").then((res) => {

    const data = res.data;
    console.log("AuthCheck : ",data);
    auth=true;
    datas=data.account;
    if (!data.success) {
      if (option) {
        props.history.push("/login");
      }
      if (checkAdmin) {
        props.history.push("/login");
      }
    } else {
      if (checkAdmin && !data.account.isAdmin) {
        //관리자 아니고 data.account.isAdmin아니면
        props.history.push("/");
      }
    }

  });
  return{auth , datas};
};

export default AuthCheck;