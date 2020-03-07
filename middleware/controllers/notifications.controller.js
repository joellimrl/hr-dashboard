import * as mongoUtils from "../utils/mongo.utils";
import { pushNotificationService } from "../services/notifications.service";

export async function postNotificationTokenController(req, res) {
  try {
    const { token } = req.body;
    const body = { pushToken: token };
    await mongoUtils.insert("expo-push-tokens", body);
  } catch (e) {
    return res.send(e);
  }
  return res.json({ success: true });
}

export async function pushNotificationController(req, res) {
  try {
    await pushNotificationService(req.body);
  } catch (e) {
    return res.send(e);
  }
  return res.json({ success: true });
}
