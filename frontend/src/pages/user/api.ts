import api from "@api/client";
import { StoreListItem, UserProfile } from "./types";

interface StoresResponse {
  success: boolean;
  data: StoreListItem[];
}

interface ProfileResponse {
  success: boolean;
  data: UserProfile;
}

export const getUserStores = async () => {
  const { data } = await api.get<StoresResponse>("/stores");
  return data.data;
};

export const getUserProfile = async () => {
  const { data } = await api.get<ProfileResponse>("/auth/me");
  return data.data;
};

export const submitRating = async ({ storeId, score }: { storeId: number; score: number }) => {
  await api.post("/ratings", { storeId, score });
};
