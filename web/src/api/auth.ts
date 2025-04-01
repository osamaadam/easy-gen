import axiosInstance from "./axios";
import { LoginResponse } from "./types/response/login";
import { TokenResponse } from "./types/response/tokens";

export function loginRequest(email: string, password: string) {
  return axiosInstance.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
}

export function refreshRequest(refreshToken: string) {
  return axiosInstance.get<TokenResponse>("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
}

export function registerRequest(registerDTO: {
  name: string;
  email: string;
  password: string;
}) {
  return axiosInstance.post<LoginResponse>("/auth/register", registerDTO);
}
