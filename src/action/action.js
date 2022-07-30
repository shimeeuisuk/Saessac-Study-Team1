export const setSignState = (msg) => {
  return {
    type: "CHECK_LOGIN",
    payload: {
      msg: msg,
    },
  };
};

export const setUserData = (data) => {
  return {
    type: "SET_USER_DATA",
    payload: {
      data: data,
    },
  };
};

export const trySignout = () => {
  return {
    type: "SIGNOUT",
    payload: {
      msg: false,
    },
  };
};

export const select = (num) => {
  return {
    type: "SELECTEDTAB",
    payload: num,
  };
};
