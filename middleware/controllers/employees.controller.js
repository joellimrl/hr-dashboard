import * as mongoUtils from "../utils/mongo.utils";

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

    await mongoUtils.insertEmployee("employee-list", listBody);
    await mongoUtils.insertEmployee("employee-details", req.body);
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
