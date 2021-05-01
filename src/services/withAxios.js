import axios from "axios";

export default function axios_(req) {
  return req.then((res) => {
    if (res.data.success === false && res.data.msg === "인증 실패!") {
      // setLoginStatus(false);
      // setUserData({});
      // toaster.danger("다른 컴퓨터에서 로그인이 되어서 종료됩니다.");
      // props.history.push("/login");
      //에러페이지 따로 만들어서 거기서 처리하게 하긩~~!^0^
    }
  });
}
