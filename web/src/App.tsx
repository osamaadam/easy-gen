import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import useAuth from "./hooks/useAuth";
import Login from "./pages/login";
import Register from "./pages/register";
import NavBar from "./components/NavBar";

export default function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && !["/login", "/register"].includes(location.pathname)) {
      console.log(location.pathname);
      navigate("/login");
    }
  }, [user, navigate, location.pathname]);

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route index path="/" element={<div>Home</div>} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>
    </>
  );
}
