import api from "@api/client";

export interface Credentials {
  email: string;
  password: string;
}

export interface SignUpInput extends Credentials {
  name: string;
  address: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const login = async (credentials: Credentials) => {
  const { data } = await api.post<AuthResponse>("/auth/login", credentials);
  return data.data;
};

export const signup = async (payload: SignUpInput) => {
  const { data } = await api.post<AuthResponse>("/auth/signup", payload);
  return data.data;
};

export const refresh = async (refreshToken: string) => {
  const { data } = await api.post<AuthResponse>("/auth/refresh", { refreshToken });
  return data.data;
};
