const selectedTabReducer = (state = 0, action) => {
  switch (action.type) {
    case "SELECTEDTAB":
      return action.payload;
    default:
      return state;
  }
};

export default selectedTabReducer;
