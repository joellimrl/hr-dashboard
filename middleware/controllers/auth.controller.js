import * as authService from "../services/auth.service";

export function getPublicKeyController(_req, res) {
  const response = authService.getPublicKeyService();
  return res.json(response);
}

export async function putLoginController(req, res) {
  const { username, password } = req.body;
  const response = await authService.putLoginService(username, password);
  return res.json(response);
}

export async function postRegistrationController(req, res) {
  const { username, password } = req.body;
  const response = await authService.postRegistrationService(
    username,
    password
  );
  return res.json(response);
}
