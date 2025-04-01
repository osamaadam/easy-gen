import axiosInstance from "./axios";
import { LoginRequestDTO } from "./types/request/login";
import { RegisterRequestDTO } from "./types/request/register";
import { LoginResponse } from "./types/response/login";
import { TokenResponse } from "./types/response/tokens";

export function loginRequest({ email, password }: LoginRequestDTO) {
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

export function registerRequest(registerDTO: RegisterRequestDTO) {
  return axiosInstance.post<LoginResponse>("/auth/register", registerDTO);
}
