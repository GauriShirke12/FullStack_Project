import { Role } from "@context/AuthContext";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  address?: string | null;
  role: Role;
  createdAt: string;
}

export interface AdminStore {
  id: number;
  name: string;
  email?: string | null;
  address: string;
  owner?: {
    id: number;
    name: string;
    email: string;
  } | null;
  averageRating: number | null;
}

export interface AdminDashboardResponse {
  success: boolean;
  data: {
    stats: {
      users: number;
      stores: number;
      ratings: number;
    };
  };
}
