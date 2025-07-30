import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import LogoLoader from "./LogoLoader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <LogoLoader />;

  if (!user || user.emailVerified && !user.adminVerified) {
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoute;
