import { LoginRequestDTO } from "../../api/types/request/login";
import { RegisterRequestDTO } from "../../api/types/request/register";

export interface User {
  id: string;
  email: string;
  name: string;
}

export type Status = "idle" | "loading" | "success" | "error";

export interface AuthContextType {
  user: User | null;
  status: Status;
  login: (loginRequestDTO: LoginRequestDTO) => Promise<void>;
  register: (registerDTO: RegisterRequestDTO) => Promise<void>;
  logout: () => void;
}
