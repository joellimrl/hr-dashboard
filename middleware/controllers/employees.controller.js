import * as mongoUtils from "../utils/mongo.utils";
import { pushNotificationService } from "../services/notifications.service";

export async function getEmployeeListController(_req, res) {
  const response = await mongoUtils.find("employee-list");
  return res.json(response);
}

export async function postEmployeeController(req, res) {
  const { name, id, position } = req.body;
  const listBody = { name, id, position };
  try {
    // Check if employee already exists
    const response = await mongoUtils.findOne("employee-details", { id });
    if (response)
      return res.json({ success: false, message: "Employee already exists" });

    await mongoUtils.insert("employee-list", listBody);
    await mongoUtils.insert("employee-details", req.body);

    // Send notification to everyone that a new employee has been registered
    const message = {
      body: "A new employee has been registered!"
    };
    await pushNotificationService(message);
  } catch (e) {
    return res.send(e);
  }
  return res.json({ success: true });
}

export async function getEmployeeDetailsController(req, res) {
  const { employeeId } = req.params;
  const response = await mongoUtils.findOne("employee-details", {
    id: employeeId
  });
  return res.json(
    response ? response : { success: false, message: "Could not find employee" }
  );
}
