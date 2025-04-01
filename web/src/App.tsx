import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import useAuth from "./hooks/useAuth";
import Login from "./pages/login";

export default function App() {
  const { getUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      navigate("/login");
    }
  }, [getUser, navigate]);

  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" Component={Login} />
      <Route path="/register" element={<div>Register</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
