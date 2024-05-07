import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { object, string } from "yup";
import { useFormik } from "formik";
import { UserContext } from "../../context/UserContext";
import * as Yup from "yup";
import YupPassword from "yup-password";
import "./registration.css"
import GoogleAuth from "./googleauth";

YupPassword(Yup);

const signupSchema = object({
  username: string()
    .max(20, "Username must be max of 20 characters")
    .required("Username is required"),
  email: string().email().required("Email is required"),
  password: string()
    .min(5, "Password must be at least 5 characters long")
    .matches(
      /[a-zA-Z0-9]/,
      "Passwords can only contain latin numbers and letters"
    )
    .required("Password is required"),
  confirmPassword: string()
    .oneOf([Yup.ref("password"), null], "Passwords must match.")
    .required("Confirm Password is required."),
});

const signinSchema = object({
  username: string().max(20, "Username must be max of 20 characters"),
  password: string()
    .min(5, "Password must be at least 5 characters long")
    .matches(
      /[a-zA-Z0-9]/,
      "Passwords can only contain latin numbers and letters"
    )
    .required("Password is required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const Registration = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);
  const requestedUrl = isLogin ? "/login" : "/signup";
  
  useEffect(() => {
    if(user){
      navigate("/cafes")
    }
  },[user, navigate])

  const handleIsLogin = () => {
    setIsLogin(!isLogin);
  };


  const formik = useFormik({
    initialValues,
    validationSchemas: isLogin ? signinSchema : signupSchema,
    onSubmit: (formData) => {
      fetch(requestedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password_hash: formData.password,
        }),
      }).then((resp) => {
        if (resp.ok) {
          resp
            .json()
            .then(login)
            .then(() => {
              navigate("/cafes");
              toast("Grab your favorite critic pen", {
                icon: "☕",
              });
            });
        } else { 
          return resp.json().then((errorObj) => {
            if(errorObj.error){
              let errorMessage = errorObj.error
              if (errorMessage.includes("UNIQUE")){
                errorMessage = 'Username or Email already exists. Please try again.'
              }
              if (errorMessage.includes("Length")){
                errorMessage = 'Username must be 5 to 20 characters. Please try again.'
              }
              if (errorMessage.includes("Not a valid email address")){
                errorMessage = 'Please enter a valid email address.'
              }
              if (errorMessage.includes("password_hash")){
                errorMessage = 'Password must be at least 5 characters with 1 special char and 1 number. Please try again.'
              }
              toast.error(errorMessage);
            }});
        }
      });
    },
  });

  return (
    <div className='conatiner'>
      <div className="auth">
        <h2>{isLogin ? "Welcome Back" : "Join the Critics"}</h2>
          <form className="form" onSubmit={formik.handleSubmit}>
              {!isLogin && (
                  <>
                  <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="regi-input"
                  />
                  {formik.errors.email &&
                      formik.touched.email && (
                      <div className="error-message show">
                          {formik.errors.email}
                      </div>
                      )}
                  </>
              )}
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="regi-input"
              autoComplete="username"
            />
            {formik.errors.username && formik.touched.username && (
              <div className="error-message show">{formik.errors.username}</div>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values._password_hash}
              className="regi-input"
              autoComplete="current-password"
            />
            {formik.errors._password_hash && formik.touched._password_hash && (
              <div className="error-message show">
                {formik.errors._password_hash}
              </div>
            )}
            {!isLogin && (
              <>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="regi-input"
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <div className="error-message show">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </>
            )}
            <input
              type="submit"
              className="regi-submit"
              value={isLogin ? "Login ☕" : "Sign up ✏️"}
            />
            {isLogin ? (
              <button
                type="button"
                className="change-form"
                onClick={handleIsLogin}
              >
                Create New Account
              </button>
            ) : (
              <button
                type="button"
                className="change-form"
                onClick={handleIsLogin}
              >
                Already have an account?
              </button>
            )}
          </form>
        <GoogleAuth/>
      </div>
    </div>
  );
};

export default Registration;
