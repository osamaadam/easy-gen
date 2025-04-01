import { isAxiosError } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { object, ref, string } from "yup";
import { registerRequest } from "../api/auth";
import useAuth from "../hooks/useAuth";
import "../styles/forms.scss";
import LoadingFallback from "../components/LoadingFallback";

export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const validationSchema = object().shape({
    name: string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters")
      .required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password must contain Latin letters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: string()
      .required("Please confirm your password")
      .oneOf([ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setRegisterError("");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...submitData } = values;
        await registerRequest(submitData);
      } catch (error) {
        console.error("Registration failed", error);
        if (isAxiosError(error)) {
          setRegisterError(
            error.response?.data?.message ||
              "Registration failed. Please try again."
          );
        } else {
          setRegisterError(
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
      <h1>Register</h1>

      {registerError && <div className="error-message">{registerError}</div>}

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Smith"
            {...formik.getFieldProps("name")}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="StrongP@ss123"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <div className="error">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        <button type="submit">Register</button>
      </form>
      <p style={{ marginTop: "var(--spacing-3)", textAlign: "center" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
