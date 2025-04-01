import { Link } from "react-router";
import "../styles/not-found.scss";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <div className="not-found-divider"></div>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="home-link">
          Go Home
        </Link>
      </div>
    </div>
  );
}
