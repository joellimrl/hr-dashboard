import * as mongoUtils from "../utils/mongo.utils";
import { pushNotificationService } from "../services/notifications.service";

export async function postNotificationTokenController(req, res) {
  try {
    const { token } = req.body;
    const response = await mongoUtils.findOne("expo-push-tokens", {
      pushToken: token
    });
    if (!response) {
      const body = { pushToken: token };
      await mongoUtils.insert("expo-push-tokens", body);
      return res.json({ success: true });
    }
    return res.json({ success: false, message: "Token already registered" });
  } catch (e) {
    return res.send(e);
  }
}

export async function pushNotificationController(req, res) {
  try {
    await pushNotificationService(req.body);
  } catch (e) {
    return res.send(e);
  }
  return res.json({ success: true });
}
