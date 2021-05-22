import axios from "axios";
const AUTH_FALSE = "AUTH_FALSE";
const axios_ = axios.create();
//axios사용해서 오류시 return AuthFailed

axios_.interceptors.response.use(
  function (response) {
    if (response.data.success === false && response.data.msg === "인증 실패!") {
      return AUTH_FALSE;
    } else return response;
  },
  function (error) {
    console.error("ERROR", error);
    return Promise.reject(error);
  }
);

// export default function axios_(req) {
//   return req.then((res) => {
//     if (res.data.success === false && res.data.msg === "인증 실패!") {
//       // setLoginStatus(false);
//       // setUserData({});
//       // toaster.danger("다른 컴퓨터에서 로그인이 되어서 종료됩니다.");
//       // props.history.push("/login");
//       //에러페이지 따로 만들어서 거기서 처리하게 하긩~~!^0^
//     }
//   });
// }

export default axios_;
