import * as authController from "./controllers/auth.controller";
import * as employeesController from "./controllers/employees.controller";
import * as notificationController from "./controllers/notifications.controller";
import express from "express";
const router = express.Router();

router.get("/publicKey", authController.getPublicKeyController);

router.put("/login", authController.putLoginController);

router.post("/register", authController.postRegistrationController);

router.get("/employees", employeesController.getEmployeeListController);

router.post("/employee", employeesController.postEmployeeController);

router.get(
  "/employee/:employeeId",
  employeesController.getEmployeeDetailsController
);

router.post(
  "/notifications/token",
  notificationController.postNotificationTokenController
);

router.put(
  "/notifications/pushNotification",
  notificationController.pushNotificationController
);

module.exports = router;
