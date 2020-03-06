import { put, call } from "redux-saga/effects";
import JSEncrypt from "jsencrypt";
import { getPublicKey, login } from "../middleware";

function encrypt({ password, publicKey }) {
  const crypt = new JSEncrypt();
  crypt.setPublicKey(publicKey);
  return crypt.encrypt(password);
}

export function* loginSaga(action) {
  try {
    const { username, password } = action.body;

    const publicKeyResponse = yield call(getPublicKey);

    if (publicKeyResponse.ok) {
      const { data: publicKey } = publicKeyResponse;
      const encryptedPassword = encrypt({ password, publicKey });

      const response = yield call(login, {
        username,
        password: encryptedPassword
      });

      if (response.data.success) {
        yield put({ type: "LOGIN_SUCCESS" });
      } else {
        yield put({
          type: "LOGIN_FAIL",
          message: response.data.message
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
