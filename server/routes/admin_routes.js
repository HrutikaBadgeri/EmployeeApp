import express from "express";
import {
  adminLogin,
  adminLogout,
  adminSignup,
  deleteEmployee,
  viewEmpDetails,
  updateEmployee,
  searchEmployee,
} from "../controllers/admin_controller";
import protect from "../middleware/employeeAuth";
const router = express.Router();

router.route("/signup").post(adminSignup);
router.route("/login").post(adminLogin);
router.route("/logout").get(protect, adminLogout);
router.route("/view").get(viewEmpDetails);
router.route("/delete/:id").delete(deleteEmployee);
router.route("/update/:id").patch(updateEmployee);
router.route("/search/:key").get(searchEmployee);
export default router;
