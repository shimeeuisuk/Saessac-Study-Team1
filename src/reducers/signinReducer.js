const signinReducer = (state = {loginState: false}, action) => {

  switch (action.type) {
    case "CHECK_LOGIN":
      return {...state, loginState: action.payload.msg}
    case "SIGNOUT":
      return {...state, loginState: action.payload.msg}
    default:
      return state;
  }
}

export default signinReducer;