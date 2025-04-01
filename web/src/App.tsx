import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import "./App.scss";
import NavBar from "./components/NavBar";
import useAuth from "./hooks/useAuth";
import { authenticatedRoutes } from "./constants/authenticated-routes";

// Lazy load route components
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

export default function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && authenticatedRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [user, navigate, location.pathname]);

  return (
    <>
      <NavBar />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="*" Component={NotFound} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
