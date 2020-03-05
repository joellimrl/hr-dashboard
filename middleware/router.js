import * as authController from "./controllers/auth.controller";
import * as employeesController from "./controllers/employees.controller";
import express from "express";
const router = express.Router();

// Public Key
router.get("/publicKey", authController.getPublicKeyController);

// Login route
router.put("/login", authController.putLoginController);

router.get("/employees", employeesController.getEmployeeListController);

router.post("/employee", employeesController.postEmployeeController);

router.get(
  "/employee/:employeeId",
  employeesController.getEmployeeDetailsController
);

router.get("/notifications", function(req, res) {
  res.send("publicKey");
});

module.exports = router;
