import api from "@api/client";

interface OwnerDashboardResponse {
  success: boolean;
  data: Array<{
    store: {
      id: number;
      name: string;
      averageRating: number | null;
    };
    ratings: Array<{
      score: number;
      user: {
        id: number;
        name: string;
        email: string;
      };
    }>;
  }>;
}

export const getOwnerDashboard = async () => {
  const { data } = await api.get<OwnerDashboardResponse>("/owner/stores/dashboard");
  return data.data;
};
