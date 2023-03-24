import Admin from "../models/Admin";
import Employee from "../models/Employee";
import asyncWrapper from "../middleware/async";
import mongoose from "mongoose";

//@description login an admin
//@route POST /api/v1/admin/login
//@access public
export const adminLogin = asyncWrapper(async (req, res) => {
  //   const admin = await Admin.find({});
  //   res.status(200).json({ data: admin });
  const { adminEmail, adminPassword } = req.body;

  //validation
  if (!adminEmail || !adminPassword) {
    return res
      .status(404)
      .json({ message: "Please enter an EmaiID and password" });
  }

  //check if admin exists in the database
  const admin = await Admin.findOne({ adminEmail });
  if (!admin) {
    return res
      .status(401)
      .json({ message: "admin with this creds does not exist" });
  }

  //check if password matches the hashed password in database
  const isMatch = await admin.matchPassword(adminPassword);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect Password" });
  }
  sendTokenResponse(admin, 200, res);
});

//@description register a new admin
//@route POST /api/v1/admin/signup
//@access public
export const adminSignup = asyncWrapper(async (req, res) => {
  const admin = await Admin.create(req.body);
  sendTokenResponse(admin, 200, res);
});

//@route POST /api/v1/admin/logout
//@access private
export const adminLogout = asyncWrapper(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});

// @description show all emp details to admin
// @route POST /api/v1/admin/getEmpDetails
// @access public
export const viewEmpDetails = asyncWrapper(async (req, res) => {
  const page = req.query.p || 0;
  const employeePerPage = 3;

  let emp = await Employee.find()
    .skip(page * employeePerPage)
    .limit(employeePerPage);
  if (!emp) {
    return res
      .status(404)
      .json({ status: false, message: "Employee not found", data: {} });
  }
  return res.status(200).json({ status: true, success: true, data: { emp } });
});

//@description delete employee
//@route GET /api/admin/deleteEmployee/:id
//@access private
export const deleteEmployee = asyncWrapper(async (req, res) => {
  const empid = req.params.id;
  let emp = await Employee.findByIdAndDelete(empid);
  if (!emp) {
    return res.status(401).json({ message: "Employee with this id not found" });
  }
  return res.status(200).json({ message: "Employee deleted successfully" });
});

//@description update employee details
//@route GET /api/admin/update/:id
//@access private
export const updateEmployee = asyncWrapper(async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const id = new ObjectId(req.params.id);
  let fieldsToUpdate = {};
  const {
    employeeName,
    employeeEmail,
    employeeAge,
    employeeSalary,
    employeeContact,
    employeeGender,
    employeeCountry,
    employeeCity,
    employeeState,
  } = req.body;
  if (employeeName) {
    fieldsToUpdate = { ...fieldsToUpdate, employeeName };
  }
  if (employeeEmail) {
    fieldsToUpdate = { ...fieldsToUpdate, employeeEmail };
  }
  if (employeeAge) {
    fieldsToUpdate = { ...fieldsToUpdate, employeeAge };
  }
  if (employeeSalary) {
    fieldsToUpdate = { ...fieldsToUpdate, employeeSalary };
  }
  if (employeeContact) {
    fieldsToUpdate = { ...fieldsToUpdate, employeeContact };
  }
  if (employeeGender) {
    fieldsToUpdate = { ...fieldsToUpdate, employeeGender };
  }
  if (employeeCountry) {
    fieldsToUpdate = { ...fieldsToUpdate, employeeCountry };
  }
  if (employeeCity) {
    fieldsToUpdate = { ...fieldsToUpdate, employeeCity };
  }
  if (employeeState) {
    fieldsToUpdate = { ...fieldsToUpdate, employeeState };
  }
  const employee = await Employee.findByIdAndUpdate(id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  if (!employee) {
    return res.status(401).json({
      message: "Employee with this id not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: employee,
    message: "Employee details updated successfully",
  });
});

//@description search employee
//@route GET /api/admin/search/:key
//@access private
export const searchEmployee = asyncWrapper(async (req, res) => {
  const emp_data = await Employee.find({
    $or: [
      { employeeName: { $regex: req.params.key } },
      { employeeEmail: { $regex: req.params.key } },
    ],
  });
  if (!emp_data) {
    return res
      .status(401)
      .json({ message: "Could not find employee with this name" });
  }
  return res.status(200).json({ message: "Employee found", data: emp_data });
});
//Get token from model, create a cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
  //create a token
  const token = admin.getSignedJWTToken();
  const expireTime = new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  );
  const options = {
    expires: expireTime,
    httpOnly: false,
  };
  console.log(expireTime);
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
