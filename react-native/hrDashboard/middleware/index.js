import { create } from "apisauce";

const api = create({
  baseURL: "http://192.168.1.11:3000",
  headers: { Accept: "application/json", "Access-Control-Allow-Origin": "*" }
});

export function getPublicKey() {
  return api.get("/publicKey", {});
}

export function login(body) {
  return api.put("/login", body);
}

export function getEmployees() {
  return api.get("/employees");
}

export function getEmployeeDetails(employeeId) {
  return api.get(`/employee/${employeeId}`);
}

export function postEmployee(body) {
  return api.post("/employee", body);
}

export function postNotificationToken(body) {
  return api.post("/notifications/token", body);
}
