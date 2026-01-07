import { lazy, Suspense } from "react";
import { useAuth } from "@context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@routes/ProtectedRoute";
import Loader from "@components/Loader";

const LoginPage = lazy(() => import("@pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@pages/auth/SignupPage"));
const AdminDashboard = lazy(() => import("@pages/admin/AdminDashboard"));
const AdminUsersPage = lazy(() => import("@pages/admin/AdminUsersPage"));
const AdminStoresPage = lazy(() => import("@pages/admin/AdminStoresPage"));
const UserStoresPage = lazy(() => import("@pages/user/UserStoresPage"));
const UserProfilePage = lazy(() => import("@pages/user/UserProfilePage"));
const OwnerDashboardPage = lazy(() => import("@pages/owner/OwnerDashboardPage"));

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Suspense fallback={<Loader /> }>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />

        <Route element={<ProtectedRoute roles={["ADMIN"]} redirectTo="/auth/login" /> }>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/stores" element={<AdminStoresPage />} />
        </Route>

        <Route element={<ProtectedRoute roles={["USER"]} redirectTo="/auth/login" /> }>
          <Route path="/user" element={<UserStoresPage />} />
          <Route path="/user/profile" element={<UserProfilePage />} />
        </Route>

        <Route element={<ProtectedRoute roles={["OWNER"]} redirectTo="/auth/login" /> }>
          <Route path="/owner" element={<OwnerDashboardPage />} />
        </Route>

        <Route
          path="/"
          element={isAuthenticated ? <Navigate to={defaultHome(user?.role)} replace /> : <Navigate to="/auth/login" replace />}
        />

        <Route path="*" element={<Navigate to={isAuthenticated ? defaultHome(user?.role) : "/auth/login"} replace /> } />
      </Routes>
    </Suspense>
  );
};

const defaultHome = (role: "ADMIN" | "USER" | "OWNER" | undefined) => {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "OWNER":
      return "/owner";
    default:
      return "/user";
  }
};

export default AppRoutes;
