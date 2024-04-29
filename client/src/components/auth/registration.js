import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { object, string } from "yup";
import { Form, Field, useFormik, Formik } from "formik";
import { UserContext } from "../../context/UserContext";
import * as Yup from "yup";
import YupPassword from "yup-password";

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
  const { login, setUser } = useContext(UserContext);
  const requestedUrl = isLogin ? "/login" : "/signup";
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


  const handleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleCallbackResponse = (response) => {
    navigate("/googleauth")
  }


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
          return resp.json().then((errorObj) => toast.error(errorObj.message));
        }
      });
    },
  });

  return (
    <div className="auth">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <Formik onSubmit={formik.handleSubmit}>
        <Form className="form" onSubmit={formik.handleSubmit}>
            {!isLogin && (
                <>
                <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="input"
                />
                {formik.errors.email &&
                    formik.touched.email && (
                    <div className="error-message show">
                        {formik.errors.email}
                    </div>
                    )}
                </>
            )}
          <Field
            type="text"
            name="username"
            placeholder="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="input"
            autoComplete="username"
          />
          {formik.errors.username && formik.touched.username && (
            <div className="error-message show">{formik.errors.username}</div>
          )}
          <Field
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values._password_hash}
            className="input"
            autoComplete="current-password"
          />
          {formik.errors._password_hash && formik.touched._password_hash && (
            <div className="error-message show">
              {formik.errors._password_hash}
            </div>
          )}
          {!isLogin && (
            <>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="input"
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
            className="submit"
            value={isLogin ? "Login" : "Sign up"}
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
              Login
            </button>
          )}
        </Form>
      </Formik>
      <button onClick={handleCallbackResponse}>GoogleLogin</button>
    </div>
  );
};

export default Registration;
