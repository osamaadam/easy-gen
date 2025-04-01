import { User } from "../../../contexts/types/auth-context";
import { TokenResponse } from "./tokens";

export interface LoginResponse {
  tokens: TokenResponse;
  user: User;
}
