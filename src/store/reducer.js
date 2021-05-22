import { LOGIN, LOGOFF, UPDATE_USERDATA } from "./action";

const reducer = (state = { isLogin: false, userData: {} }, action) => {
  switch (action.type) {
    case LOGOFF:
      return { ...state, isLogin: false, userData: {} };
    case LOGIN:
      return { ...state, isLogin: true, userData: action.userData };
    case UPDATE_USERDATA:
      return { ...state, userData: action.userData };

    default:
      return state;
  }
};

export default reducer;
