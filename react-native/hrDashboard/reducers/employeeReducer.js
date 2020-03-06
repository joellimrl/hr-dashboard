const initialState = {
  error: false,
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
        employeeList: action.body
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
        employeeDetails: action.body
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
        success: false,
        message: action.message
      };
    }
    default: {
      return state;
    }
  }
};

export default employeeReducer;
