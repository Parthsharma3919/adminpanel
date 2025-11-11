import { Navigate } from "react-router-dom";

export default function RedirectIfAuth({ to="/app", children }) {
  const token = localStorage.getItem("vs_token");
  if (token) return <Navigate to={to} replace />;
  return children;
}
