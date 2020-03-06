const initialState = {
  success: false,
  message: ""
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state
      };
    }
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        success: true
      };
    }
    case "LOGIN_FAIL": {
      return {
        ...state,
        success: false,
        message: action.message
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
