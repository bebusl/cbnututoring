import React, { useContext, useState } from "react";
import { TextInput } from "evergreen-ui";
import { UserData } from "../App";

const User = () => {
  const { userData, setUserData } = useContext(UserData);
  console.log(userData);
  return (
    <>
      <TextInput name="_id" value={userData._id} disabled></TextInput>
      <TextInput name="password" value={userData.password} />
      <TextInput name="newPassword"></TextInput>
      <TextInput name="newPasswordCheck"></TextInput>
    </>
  );
};

export default User;
