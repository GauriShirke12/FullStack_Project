import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

interface ProtectedRouteProps {
  roles?: Array<"ADMIN" | "USER" | "OWNER">;
  redirectTo?: string;
}

const ProtectedRoute = ({ roles, redirectTo = "/auth/login" }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={roleFallback(user.role)} replace />;
  }

  return <Outlet />;
};

const roleFallback = (role: "ADMIN" | "USER" | "OWNER") => {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "OWNER":
      return "/owner";
    default:
      return "/user";
  }
};

export default ProtectedRoute;
