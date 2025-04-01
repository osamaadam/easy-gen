import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import "./App.scss";
import NavBar from "./components/NavBar";
import useAuth from "./hooks/useAuth";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/NotFound";
import Register from "./pages/register";

export default function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && !["/login", "/register"].includes(location.pathname)) {
      navigate("/login");
    }
  }, [user, navigate, location.pathname]);

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route index path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </main>
    </>
  );
}
