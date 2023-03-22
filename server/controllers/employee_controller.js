import Employee from "../models/Employee";
import mongoose from "mongoose";
import asyncWrapper from "../middleware/async";

//@description show all emp details
//@route GET /api/v1/employee
//@access public
export const getAllDetails = asyncWrapper(async (req, res) => {
  res.status(200).json({ success: true, data: req.employee });
});

//@description register a new employee
//@route POST /api/v1/employee/signup
//@access public
export const employeeSignup = asyncWrapper(async (req, res) => {
  console.log(req.body);
  const employee = await Employee.create(req.body);
  sendTokenResponse(employee, 200, res);
});

//@description login an employee
//@route POST /api/v1/employee/login
//@access public
export const employeeLogin = asyncWrapper(async (req, res) => {
  const { employeeEmail, employeePassword } = req.body;

  //validation
  if (!employeeEmail || !employeePassword) {
    return res
      .status(404)
      .json({ message: "Please enter an EmaiID and password" });
  }

  //check if employee exists in the database
  const employee = await Employee.findOne({ employeeEmail });
  if (!employee) {
    return res
      .status(401)
      .json({ message: "Employee with this creds does not exist" });
  }

  //check if password matches the hashed password in database
  const isMatch = await employee.matchPassword(employeePassword);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect Password" });
  }
  sendTokenResponse(employee, 200, res);
});

//@description UPDATE currently logged in user's password
//@route PUT /api/v1/employee/updatePassword
//@access private
export const updatePassword = asyncWrapper(async (req, res, next) => {
  const employee = await Employee.findById(req.employee.id);

  //if the current password and new password are not entered
  if (!req.body.currentemployeePassword || !req.body.newemployeePassword) {
    return res.status(401).json({
      message: "Incomplete details, please enter current and new password",
    });
  }

  //check current password
  if (!(await employee.matchPassword(req.body.currentemployeePassword))) {
    return res.status(401).json({ message: "Password is incorrect" });
  }
  employee.employeePassword = req.body.newemployeePassword;
  employee.save();
  sendTokenResponse(employee, 200, res);
});

//@route POST /api/v1/employee/logout
//@access private
export const employeeLogout = asyncWrapper(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});

//@description UPDATE currently logged in emp's details
//@route PATCH /api/v1/employee/updateDetails
// @access private
export const employeeUpdateDetails = asyncWrapper(async (req, res, next) => {
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
  const employee = await Employee.findByIdAndUpdate(
    req.employee._id.toString(),
    fieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ success: true, data: employee });
});

//Get token from model, create a cookie and send response
const sendTokenResponse = (employee, statusCode, res) => {
  //create a token
  const token = employee.getSignedJWTToken();
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
