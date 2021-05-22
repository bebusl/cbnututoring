// const ADD = "ADD";
// const DELETE = "DELETE";
export const LOGIN = "LOGIN",
  LOGOFF = "LOGOFF",
  UPDATE_USERDATA = "UPDATE_USERDATA";

export const login = (userData) => {
  return {
    type: LOGIN,
    userData,
  };
};

export const logoff = () => ({ type: LOGOFF });

export const updateUserdata = (userData) => {
  return {
    type: UPDATE_USERDATA,
    userData,
  };
};
