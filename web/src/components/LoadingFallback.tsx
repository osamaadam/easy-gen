import "./LoadingFallback.scss";

export default function LoadingFallback() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading content...</p>
    </div>
  );
}
