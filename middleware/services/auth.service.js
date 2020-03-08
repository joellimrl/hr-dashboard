import fs from "fs";
import crypto from "crypto";
import * as mongoUtils from "../utils/mongo.utils";

export function getPublicKeyService() {
  return fs.readFileSync("public.key").toString();
}

function getPrivateKeyService() {
  return fs.readFileSync("private.key").toString();
}

function decryptKey(message) {
  const decrypted = crypto.privateDecrypt(
    {
      key: getPrivateKeyService(),
      padding: crypto.constants.RSA_PKCS1_PADDING
    },
    Buffer.from(message, "base64")
  );
  return decrypted.toString("utf8");
}

export async function putLoginService(username, password) {
  try {
    const plainPassword = decryptKey(password);
    const authDetails = await mongoUtils.findOne("authentication", {
      username
    });
    if (authDetails) {
      if (plainPassword === authDetails.password) {
        return { success: true };
      }
    }
  } catch (e) {
    console.log(e);
  }
  // Return generic message to prevent dictionary attacks
  return {
    success: false,
    message: "You have entered wrong credentials, please try again"
  };
}

export async function postRegistrationService(username, password) {
  try {
    // const plainPassword = decryptKey(password);
    await mongoUtils.insert("authentication", {
      username,
      password
    });
    return { success: true };
  } catch (e) {
    console.log(e);
  }
  return {
    success: false,
    message: "Registration failed"
  };
}
