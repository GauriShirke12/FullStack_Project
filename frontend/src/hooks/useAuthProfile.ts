import { useQuery } from "@tanstack/react-query";
import api from "@api/client";
import { AuthUser } from "@context/AuthContext";

interface ProfileResponse {
  success: boolean;
  data: AuthUser;
}

const fetchProfile = async (): Promise<AuthUser> => {
  const { data } = await api.get<ProfileResponse>("/auth/me");
  return data.data;
};

export const profileQueryKey = ["auth", "me"] as const;

export const useAuthProfile = () => {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5
  });
};
