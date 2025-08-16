import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import LogoLoader from "./LogoLoader";


const allowedRoutesForUnverified = ["/", "/about_us", "/contact_us"];

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <LogoLoader />;

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If user is not email verified, restrict to allowed pages
  if (!user.emailVerified) {
    if (!allowedRoutesForUnverified.includes(location.pathname)) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  // If user is email verified but not admin verified, restrict to allowed pages
  if (!user.adminVerified) {
    if (!allowedRoutesForUnverified.includes(location.pathname)) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  // If both verified, allow access
  return children;
};

export default ProtectedRoute;
