import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { getMe } from "../api";
import { User } from "../contexts/types/auth-context";
import "../styles/home.scss";
import LoadingFallback from "../components/LoadingFallback";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  const getCurrentUser = useCallback(async () => {
    try {
      const response = await getMe();
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (!user) {
    return <LoadingFallback />;
  }
  return (
    <div className="home-container">
      <h1>Welcome to EasyAuth</h1>

      <p>
        A simple and secure authentication system built with React and NestJS.
        {user ? ` Welcome back, ${user.name}!` : ""}
      </p>

      {user ? (
        <div className="user-info-card">
          <h2>Your Profile</h2>
          <div className="user-info">
            <div className="user-info-item">
              <span className="label">Name:</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="user-info-item">
              <span className="label">Email:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="user-info-item">
              <span className="label">User ID:</span>
              <span className="value user-id">{user.id}</span>
            </div>
          </div>
        </div>
      ) : (
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
  );
}
