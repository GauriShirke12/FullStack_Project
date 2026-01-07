import api from "@api/client";
import { AdminStore, AdminUser } from "./types";
import { AuthUser } from "@context/AuthContext";

interface AdminDashboardPayload {
  success: boolean;
  data: {
    stats: {
      users: number;
      stores: number;
      ratings: number;
    };
    currentUser: AuthUser;
  };
}

interface AdminUsersPayload {
  success: boolean;
  data: AdminUser[];
}

interface AdminStoresPayload {
  success: boolean;
  data: AdminStore[];
}

export const getAdminDashboard = async () => {
  const { data } = await api.get<AdminDashboardPayload>("/admin/dashboard");
  return data.data;
};

export const getAdminUsers = async () => {
  const { data } = await api.get<AdminUsersPayload>("/admin/users");
  return data.data;
};

export const getAdminStores = async () => {
  const { data } = await api.get<AdminStoresPayload>("/admin/stores");
  return data.data;
};
