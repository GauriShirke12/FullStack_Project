export interface StoreListItem {
  id: number;
  name: string;
  address: string;
  averageRating: number | null;
  userRating: number | null;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  address?: string;
  role: "USER";
}
