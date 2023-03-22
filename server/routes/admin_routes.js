import express from "express";
import {
  adminLogin,
  adminLogout,
  adminSignup,
  deleteEmployee,
  searchEmpDetailsByName,
  viewEmpDetails,
} from "../controllers/admin_controller";
import protect from "../middleware/employeeAuth";
const router = express.Router();

router.route("/signup").post(adminSignup);
router.route("/login").post(adminLogin);
router.route("/logout").get(protect, adminLogout);
router.route("/view").get(viewEmpDetails);
router.route("/search").post(searchEmpDetailsByName);
router.route("/delete/:id").delete(deleteEmployee);
export default router;
