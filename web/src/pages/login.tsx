import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { object, string } from "yup";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { getUser, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (!user) {
      return;
    }

    navigate("/", { replace: true });
  }, [getUser, navigate]);

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
        await login(values.email, values.password);
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  });

  if (getUser()) {
    return null;
  }
  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...formik.getFieldProps("email")} />
          {formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
