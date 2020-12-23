import Axios from "axios";
import React, { useState } from "react";
import { toaster } from "evergreen-ui";

const ForgotPassword = (props) => {
  const [validEmail, setvalidEmail] = useState("");
  const [checkstuNum, setcheckstuNum] = useState(false);
  const [checktoken, setcheckToken] = useState(false);
  const [values, setValues] = useState({
    stuNum: "",
    token: "",
    newpassword: "",
    checkpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues({ ...values, [name]: value });
  };

  const onsubmitStuNum = (e) => {
    e.preventDefault();
    Axios.get(`/api/accounts/makeToken/${values.stuNum}`)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          setvalidEmail(res.data.email);
          setcheckstuNum(true);
        } else {
          toaster.warning("에러가 발생했습니다.");
        }
      })
      .catch((err) => toaster.warning("오류 발생" + err));
    //여기에 학번 제출하면 해야 할 일 적기(api 호출해서 then. success시 checkstuNum true로 바꾸기)
  };

  const onsubmittoken = (e) => {
    e.preventDefault();
    Axios.post("/api/accounts/checkToken", {
      studentNumber: values.stuNum,
      token: values.token,
    })
      .then((res) => {
        if (res.data.success === true) {
          setcheckToken(true);
        } else {
          toaster.warning("잘못된 인증번호입니다.");
        }
      })
      .catch((err) => toaster.warning("에러" + err));
    //여기에 학번 제출하면 해야 할 일 적기(api 호출해서 then. success시 checkstuNum true로 바꾸기)
  };

  const onsubmitchangePassword = (e) => {
    e.preventDefault();
    Axios.post("/api/accounts/changePassword", {
      studentNumber: values.stuNum,
      token: values.token,
      password: values.newpassword,
    })
      .then((res) => {
        if (res.data.success === true) {
          toaster.success("비밀번호 재설정 성공");
          props.history.push("/login");
        }
      })
      .catch((err) => toaster.warning("비밀번호 재설정 실패. 오류코드" + err));
    //여기에 학번 제출하면 해야 할 일 적기(api 호출해서 then. success시 checkstuNum true로 바꾸기)
  };

  return (
    <div className="forgotPasswordwrap">
      <h3>비밀번호 재설정 페이지</h3>
      <div className="forgotPassword-form">
        <form onSubmit={onsubmitStuNum}>
          <label htmlFor="stuNum">학번/ID를 입력해주세요.</label>
          <input
            type="text"
            name="stuNum"
            value={values.stuNum}
            onChange={handleChange}
          ></input>
          <button type="submit">확인</button>
        </form>
        {checkstuNum ? (
          <div className="alert-success more">
            {validEmail}로 인증번호가 전송되었습니다.
          </div>
        ) : null}
        <form
          onSubmit={onsubmittoken}
          className={checkstuNum === false ? "hidden" : null}
        >
          <label htmlFor="token">이메일로 받은 인증번호를 입력해주세요</label>
          <input
            type="text"
            name="token"
            value={values.token}
            onChange={handleChange}
          ></input>
          <button type="submit">확인</button>
        </form>
        {checktoken ? (
          <div className="alert-success more">인증이 성공했습니다.</div>
        ) : null}

        <form
          onSubmit={onsubmitchangePassword}
          className={checktoken === false ? "hidden" : null}
        >
          <label htmlFor="newpassword">새 비밀번호를 입력해주세요.</label>
          <input
            type="password"
            name="newpassword"
            value={values.newpassword}
            onChange={handleChange}
          ></input>
          <label htmlFor="checkpassword">
            비밀번호를 한번 더 입력해 주세요
          </label>
          <input
            type="password"
            name="checkpassword"
            value={values.checkpassword}
            onChange={handleChange}
          ></input>
          <button type="submit">변경</button>
        </form>
        {}
      </div>
    </div>
  );
};

export default ForgotPassword;
