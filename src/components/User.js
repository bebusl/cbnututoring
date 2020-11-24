import React, { useContext, useState } from "react";
import { TextInput, TextInputField, Pane, Button } from "evergreen-ui";
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
      width="auto"
      padding="40px"
      backgroundColor="#ffffff"
    >
      <h4>회원정보 수정</h4>
      <label htmlFor="_id">학번</label>
      <TextInput name="_id" value={userData._id} disabled />
      <label htmlFor="newPassword">새 비밀번호</label>
      <TextInput name="newPassword"></TextInput>
      <label htmlFor="newPassword"></label>새 비밀번호 확인
      <TextInput name="newPasswordCheck"></TextInput>
      <label htmlFor="name">이름</label>
      <TextInput name="name" value={userData.name}></TextInput>
      <label htmlFor="email">이메일</label>
      <TextInput name="email" value={userData.email}></TextInput>
      <label htmlFor="phoneNumber">휴대폰번호</label>
      <TextInput name="phoneNumber" value={userData.phoneNumber}></TextInput>
      <label htmlFor="department">학과</label>
      <TextInput name="department" value={userData.department}></TextInput>
      <Button type="submit">수정</Button>
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
department: "010-9061-6840"
role: 0
_id: "2018037004"
__proto__: Object */
export default User;
