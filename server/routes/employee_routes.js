import express from "express";
import {
  getAllDetails,
  employeeSignup,
  employeeLogin,
  updatePassword,
  employeeUpdateDetails,
  employeeLogout,
} from "../controllers/employee_controller";
import protect from "../middleware/employeeAuth";
const router = express.Router();

router.route("/").get(protect, getAllDetails);
router.route("/signup").post(employeeSignup);
router.route("/login").post(employeeLogin);
router.route("/updatePassword").put(protect, updatePassword);
router.route("/updateDetails").patch(protect, employeeUpdateDetails);
router.route("/logout").get(protect, employeeLogout);

export default router;

//
