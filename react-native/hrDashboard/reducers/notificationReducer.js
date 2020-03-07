const initialState = {
  success: false,
  message: ""
};
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_NOTIFICATION_TOKEN": {
      return {
        ...state
      };
    }
    case "POST_NOTIFICATION_TOKEN_SUCCESS": {
      return {
        ...state,
        success: true
      };
    }
    case "POST_NOTIFICATION_TOKEN_FAIL": {
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

export default notificationReducer;
