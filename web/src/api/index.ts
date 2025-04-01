import { User } from "../contexts/types/auth-context";
import axiosInstance from "./axios";

export function getMe() {
  return axiosInstance.get<User>("/");
}
