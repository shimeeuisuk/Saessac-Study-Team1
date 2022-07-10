export const setSignState = (msg) => {
  return {
    type: "CHECK_LOGIN",
    payload: {
      msg: msg
    }
  }
}

export const trySignout = () => {
  return {
    type: "SIGNOUT",
    payload: {
      msg: false
    }
  }
}