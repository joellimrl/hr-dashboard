const initialState = {
  success: false,
  error: false,
  messsage: "",
  employeeList: [],
  employeeDetails: {}
};
const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    // EMPLOYEE LIST
    case "GET_EMPLOYEE_LIST": {
      return {
        ...state
      };
    }
    case "EMPLOYEE_LIST_SUCCESS": {
      return {
        ...state,
        employeeList: action.body,
        success: true
      };
    }
    case "EMPLOYEE_LIST_FAIL": {
      return {
        ...state,
        error: true
      };
    }

    // EMPLOYEE DETAILS
    case "GET_EMPLOYEE_DETAILS": {
      return {
        ...state
      };
    }
    case "EMPLOYEE_DETAILS_SUCCESS": {
      return {
        ...state,
        employeeDetails: action.body,
        success: true,
        error: false,
        message: ""
      };
    }
    case "EMPLOYEE_DETAILS_FAIL": {
      return {
        ...state,
        error: true
      };
    }

    // SUBMIT EMPLOYEE
    case "POST_EMPLOYEE": {
      return {
        ...state
      };
    }
    case "POST_EMPLOYEE_SUCCESS": {
      return {
        ...state,
        success: true
      };
    }
    case "POST_EMPLOYEE_FAIL": {
      return {
        ...state,
        error: true,
        message: action.message
      };
    }

    case "RESET_EMPLOYEE_STATE": {
      return {
        ...state,
        error: false,
        message: "",
        success: false
      };
    }
    default: {
      return state;
    }
  }
};

export default employeeReducer;
