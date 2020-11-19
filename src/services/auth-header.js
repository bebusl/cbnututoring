import axios from "axios";

export default async function AuthCheck(props, option, checkAdmin = false) {
  const data = await axios.get("/api/accounts/auth");

  return data;
  /*axios.get("/api/accounts/auth").then((res) => {
      const data = res.data;
      console.log("AuthCheck : ", data);
      if (!data.success) {
        if (option) {
          props.history.push("/login");
        }
        if (checkAdmin) {
          props.history.push("/login");
        }
      } else {
        if (checkAdmin && data.account.role != 3) {
          //관리자 data.account.isAdmin아니면
          props.history.push("/");
        }
        auth = true;
        datas = data.account;
        console.log("why not???? ", auth, datas);
      }
    });
    resolve({ auth, datas });
  });*/
}
