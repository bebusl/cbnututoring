import Axios from "axios";
import React, { useState } from "react";
import { toaster } from "evergreen-ui";

const ForgotPassword = (props) => {
    const [checkstuNum, setcheckstuNum] = useState(false);
    const [checktoken, setcheckToken] = useState(false);
    const [values, setValues]=useState({
        stuNum:"",
        token:"",
        newpassword:"",
        checkpassword:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setValues({ ...values, [name]: value });
      };
    
    const onsubmitStuNum = (e) =>{
      e.preventDefault();
        
        Axios.get(`/api/accounts/makeToken/${values.stuNum}`).then(res=>{console.log(res);if(res.success===true) {setcheckstuNum(true)}});
        //여기에 학번 제출하면 해야 할 일 적기(api 호출해서 then. success시 checkstuNum true로 바꾸기)
    }

    const onsubmitchangePassword = (e) =>{
      e.preventDefault();
      Axios.post("/api/accounts/changePassword", { studentNumber:values.stuNum,token:values.token,password:values.newpassword })
        .then((res) => {
          console.log("비밀번호 변경 쌉가능입니꽈",res);
        })
        .catch((err) => console.log("에러" + err));
        //여기에 학번 제출하면 해야 할 일 적기(api 호출해서 then. success시 checkstuNum true로 바꾸기)
    }

    const onsubmittoken = (e) =>{
        e.preventDefault();
        Axios.post("/api/accounts/checkToken", { studentNumber:values.stuNum,token:values.token})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log("에러" + err));
        //여기에 학번 제출하면 해야 할 일 적기(api 호출해서 then. success시 checkstuNum true로 바꾸기)
    }



  return (
    <>
    <h3>비밀번호 재설정 페이지</h3>
    <form onSubmit={onsubmitStuNum}>
        <label for="stuNum">학번/ID를 입력해주세요.</label>
        <input type="text" name="stuNum" value={values.stuNum} onChange={handleChange}></input>
        <button type="submit">확인</button>
    </form>
    <form onSubmit={onsubmittoken}>
        <label for="token">이메일로 받은 인증번호를 입력해주세요</label>
        <input type="text" name="token" value={values.token} onChange={handleChange}></input>
        <button type="submit">확인</button>
    </form>

    <form onSubmit={onsubmitchangePassword}>
        <label for="newpassword">새 비밀번호를 입력해주세요.</label>
        <input type="password" name="newpassword" value={values.newpassword} onChange={handleChange}></input>
        <label for="checkpassword">비밀번호를 한번 더 입력해 주세요</label>
        <input type="password" name="checkpassword" value={values.checkpassword} onChange={handleChange}></input>
        <button type="submit">변경</button>
    </form>

    </>
  );
};

export default ForgotPassword;


