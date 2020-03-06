import { all, takeLeading } from "redux-saga/effects";
import { loginSaga } from "./authSaga";
import {
  getEmployeesSaga,
  getEmployeeDetailsSaga,
  postEmployeeSaga
} from "./employeeSaga";
export function* rootSaga() {
  yield all([
    takeLeading("LOGIN", loginSaga),
    takeLeading("GET_EMPLOYEE_LIST", getEmployeesSaga),
    takeLeading("GET_EMPLOYEE_DETAILS", getEmployeeDetailsSaga),
    takeLeading("POST_EMPLOYEE", postEmployeeSaga)
  ]);
}
