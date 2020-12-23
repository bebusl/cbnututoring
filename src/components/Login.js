import React, { useState, useRef, useContext } from "react";
import {Link} from "react-router-dom";
import { IsLogin, UserData } from "../App";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        필수 입력 칸입니다.
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { loginStatus, setLoginStatus } = useContext(IsLogin);
  const { userData, setUserData } = useContext(UserData);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleChangeUserData = (newData) => {
    setUserData((state) => {
      return Object.assign({}, state, newData);
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const response = await AuthService.login(username, password).catch(
        (error) => {
          setLoginStatus(false);
          window.alert("로그인 실패");
          setLoading(false);
          setPassword("");
          props.history.push("/login");
        }
      );
      if (response !== undefined) {
        if (response.data.success === true) {
          console.log("로그인 페이지 : 로그인 성공");
          setLoginStatus(true); //로그인 성공시 status true로 바꿔서 헤더랑 이것저것 권한 되겡
          handleChangeUserData(response.data.account); //로그인 성공시 유저 데이터 불러옴.
          props.history.push("/tutor/student/alllist");
        } else {
          console.log("로그인 페이지 : 로그인 실패");
          setLoginStatus(false);
          window.alert("로그인 실패");
          setLoading(false);
          props.history.push("/login");
        }
      }
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">ID/학번</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>로그인</span>
            </button>
          </div>


          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <p className="forgetQuestion">비밀번호를 잊으셨나요? <Link to="/forgotpassword">여기</Link>를 클릭하세요</p>
      </div>
    </div>
  );
};

export default Login;
