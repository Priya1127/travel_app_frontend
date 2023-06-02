import { useState } from "react";
import "./Auth.css";
import { useAuth, useAlert } from "../../context";
import {
  validateEmail,
  validateName,
  validateNumber,
  validatePassword,
} from "../../utils";

import { signupHandler, loginHandler } from "../../services";
import { Alert } from "@mui/material";

let isNumberValid,
  isNameValid,
  isEmailValid,
  isPasswordValid,
  isConfirmPasswordValid;

export const AuthSignup = () => {
  const [errors, setErrors] = useState({});
  const { username, email, password, number, confirmPassword, authDispatch } =
    useAuth();

  // const { setAlert } = useAlert();

  const handleNumberChange = (event) => {
    isNumberValid = validateNumber(event.target.value);
    if (isNumberValid) {
      authDispatch({
        type: "NUMBER",
        payload: event.target.value,
      });
      delete errors[event.target.name];
    } else {
      setErrors({ ...errors, [event.target.name]: "Invalid Phone Number" });
    }
  };

  const handleNameChange = (event) => {
    isNameValid = validateName(event.target.value);
    if (isNameValid) {
      authDispatch({
        type: "NAME",
        payload: event.target.value,
      });
      delete errors[event.target.name];
    } else {
      setErrors({ ...errors, [event.target.name]: "Invalid UserName" });
    }
  };

  const handleEmailChange = (event) => {
    isEmailValid = validateEmail(event.target.value);
    if (isEmailValid) {
      authDispatch({
        type: "EMAIL",
        payload: event.target.value,
      });
      delete errors[event.target.name];
    } else {
      setErrors({ ...errors, [event.target.name]: "Invalid Email" });
    }
  };

  const handlePasswordChange = (event) => {
    isPasswordValid = validatePassword(event.target.value);
    if (isPasswordValid) {
      authDispatch({
        type: "PASSWORD",
        payload: event.target.value,
      });
      delete errors[event.target.name];
    } else {
      setErrors({ ...errors, [event.target.name]: "Invalid Password" });
    }
  };

  const handleConfirmPasswordChange = (event) => {
    isConfirmPasswordValid = validatePassword(event.target.value);
    if (isConfirmPasswordValid) {
      authDispatch({
        type: "CONFIRM_PASSWORD",
        payload: event.target.value,
      });
      delete errors[event.target.name];
    } else {
      setErrors({ ...errors, [event.target.name]: "Invalid Confirm Password" });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      signupHandler(username, number, email, password);
      setErrors("none");
    }
    // const { accessTokn, userName } = await loginHandler(
    //   number,
    //   password,
    //   setAlert
    // );
    // authDispatch({
    //   type: "SET_ACCESS_TOKEN",
    //   payload: accessTokn,
    // });
    // authDispatch({
    //   type: "SET_USER_NAME",
    //   payload: userName,
    // });
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    // authDispatch({
    //   type: "SET_TO_LOGIN",
    // });
  };

  return (
    <div className="auth-container">
      {errors === "none" ? (
        <Alert severity="error">Successfully Signed Up. Please Login to continue</Alert>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="d-flex direction-column lb-in-container">
            <label className="auth-label">
              Mobile Number <span className="asterisk">*</span>{" "}
            </label>
            <input
              name="number"
              defaultValue={number}
              type="number"
              className="auth-input"
              maxLength="10"
              placeholder="Enter Mobile Number"
              required
              onChange={handleNumberChange}
            />
            {errors?.number && (
              <span className="isformvalid">{errors.number}</span>
            )}
          </div>
          <div className="d-flex direction-column lb-in-container">
            <label className="auth-label">
              Name <span className="asterisk">*</span>{" "}
            </label>
            <input
              name="username"
              defaultValue={username}
              className="auth-input"
              placeholder="Enter Name"
              required
              onChange={handleNameChange}
            />
            {errors?.username && (
              <span className="isformvalid">{errors.username}</span>
            )}
          </div>
          <div className="d-flex direction-column lb-in-container">
            <label className="auth-label">
              Email <span className="asterisk">*</span>{" "}
            </label>
            <input
              name="email"
              defaultValue={email}
              className="auth-input"
              placeholder="Enter Email"
              type="email"
              required
              onChange={handleEmailChange}
            />
            {errors?.email && (
              <span className="isformvalid">{errors.email}</span>
            )}
          </div>
          <div className="d-flex direction-column lb-in-container">
            <label className="auth-label">
              Password <span className="asterisk">*</span>{" "}
            </label>
            <input
              name="password"
              defaultValue={password}
              className="auth-input"
              placeholder="Enter Password"
              type="password"
              required
              onChange={handlePasswordChange}
            />
            {errors?.password && (
              <span className="isformvalid">{errors.password}</span>
            )}
          </div>
          <div className="d-flex direction-column lb-in-container">
            <label className="auth-label">
              Confirm Password <span className="asterisk">*</span>{" "}
            </label>
            <input
              name="confirmPassword"
              defaultValue={confirmPassword}
              className="auth-input"
              placeholder="Enter Password"
              type="password"
              required
              onChange={handleConfirmPasswordChange}
            />
            {errors?.confirmPassword && (
              <span className="isformvalid">{errors.confirmPassword}</span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="button btn-primary btn-login cursor"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
