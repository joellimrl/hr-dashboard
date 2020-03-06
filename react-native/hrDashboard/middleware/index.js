import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:3000",
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
