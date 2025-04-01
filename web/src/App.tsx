import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate, Link } from "react-router";
import useAuth from "./hooks/useAuth";
import Login from "./pages/login";
import Register from "./pages/register";
import NavBar from "./components/NavBar";
import "./App.scss";

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
          <Route
            index
            path="/"
            element={
              <div className="home-container">
                <h1>Welcome to EasyAuth</h1>
                <p>
                  A simple and secure authentication system built with React and
                  NestJS.
                  {user ? ` Welcome back, ${user.name}!` : ""}
                </p>
                {!user && (
                  <div className="btn-group">
                    <Link to="/login" className="button primary-button">
                      Login
                    </Link>
                    <Link to="/register" className="button primary-button">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            }
          />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route
            path="*"
            element={
              <div className="not-found">
                <h1>404</h1>
                <p>The page you're looking for doesn't exist.</p>
                <Link to="/">Go Home</Link>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}
