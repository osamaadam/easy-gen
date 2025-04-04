import { isAxiosError } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { object, string } from "yup";
import useAuth from "../hooks/useAuth";
import "../styles/forms.scss";
import LoadingFallback from "../components/LoadingFallback";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    navigate("/", { replace: true });
  }, [user, navigate]);

  const validationSchema = object().shape({
    email: string().email().required("Email is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoginError("");
        await login({
          email: values.email,
          password: values.password,
        });
      } catch (error) {
        console.error("Login failed", error);
        if (isAxiosError(error)) {
          setLoginError(
            error.response?.data?.message || "Invalid email or password."
          );
        } else {
          setLoginError(
            "An unexpected error occurred. Please try again later."
          );
        }
      }
    },
  });

  if (user) {
    return <LoadingFallback />;
  }
  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="user@example.com"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="StrongP@ss123"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>

        {loginError && <div className="error-message">{loginError}</div>}
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: "var(--spacing-3)", textAlign: "center" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
