import { put, call } from "redux-saga/effects";
import { getEmployees, getEmployeeDetails, postEmployee } from "../middleware";
import { Toast } from "native-base";
import { navigate } from "../utils/navigation.utils";

export function* getEmployeesSaga() {
  try {
    const response = yield call(getEmployees);

    if (response.data) {
      yield put({ type: "EMPLOYEE_LIST_SUCCESS", body: response.data });
    } else {
      yield put({
        type: "EMPLOYEE_LIST_FAIL"
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getEmployeeDetailsSaga(action) {
  try {
    const { employeeId } = action;

    const response = yield call(getEmployeeDetails, employeeId);

    if (response.data) {
      navigate("employeeDetails");
      yield put({ type: "EMPLOYEE_DETAILS_SUCCESS", body: response.data });
    } else {
      yield put({
        type: "EMPLOYEE_DETAILS_FAIL"
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* postEmployeeSaga(action) {
  try {
    const response = yield call(postEmployee, action.body);

    if (response.data.success) {
      yield put({ type: "POST_EMPLOYEE_SUCCESS" });
      Toast.show({ text: "Successfully submitted employee!", type: "success" });
    } else {
      Toast.show({
        text: response.data.message,
        type: "danger"
      });
      yield put({
        type: "POST_EMPLOYEE_FAIL",
        message: response.data.message
      });
    }
  } catch (error) {
    console.log(error);
  }
}
