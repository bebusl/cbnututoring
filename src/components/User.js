import React, { useContext, useState } from "react";
import { TextInput, TextInputField, Pane } from "evergreen-ui";
import { UserData } from "../App";

const department = [
  "컴퓨터공학과",
  "소프트웨어학과",
  "정보통신학과",
  "로봇학과",
];
const User = () => {
  const { userData, setUserData } = useContext(UserData);
  console.log(userData);
  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent=" center"
      width={2500}
    >
      <Pane>
        학번
        <TextInput name="_id" value={userData._id} disabled />
      </Pane>
      <Pane>
        현재 비밀번호 <TextInput name="password" />
      </Pane>
      <Pane>
        새 비밀번호 <TextInput name="newPassword"></TextInput>
      </Pane>
      <Pane>
        새 비밀번호 확인<TextInput name="newPasswordCheck"></TextInput>
      </Pane>
      <Pane>
        이름
        <TextInput name="newPasswordCheck" value={userData.name}></TextInput>
      </Pane>
      <Pane>
        이메일
        <TextInput name="newPasswordCheck" value={userData.email}></TextInput>
      </Pane>
    </Pane>
  );
};

/*
department: 0
email: "bebus1998@naver.com"
exp: 1605780310
iat: 1605776710
id: 3
isAdmin: false
name: "이진희"
phoneNumber: "010-9061-6840"
role: 0
_id: "2018037004"
__proto__: Object */
export default User;
