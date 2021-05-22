import { Button, Input } from "@material-ui/core";
import login from "../../../services/auth.service";
import useInput from "../../hook/useInput";
import { useEffect } from "react";

function Login(props) {
  useEffect(() => {
    console.log("LOGIN", props);
  }, []);
  const [values, onChange, reset] = useInput({ _id: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const LOGIN = await login(values._id, values.password);
    if (LOGIN.data.success === true) {
      props.login(LOGIN.data.account);
      props.history.push("/tutor/student/courselist");
    }
  };
  //로그인 실패/ 성공 다이얼로그 뜨는 거 만들기.
  //밸리데이터 적용.

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="_id">학번</label>
      <Input type="text" name="_id" value={values._id} onChange={onChange} />
      <label htmlFor="password">비밀번호</label>
      <Input
        type="password"
        name="password"
        value={values.password}
        onChange={onChange}
      />
      <Button type="submit">로그인</Button>
    </form>
  );
}

export default Login;
