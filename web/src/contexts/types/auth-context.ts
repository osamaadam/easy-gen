import { LoginRequestDTO } from "../../api/types/request/login";
import { RegisterRequestDTO } from "../../api/types/request/register";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (loginRequestDTO: LoginRequestDTO) => Promise<void>;
  register: (registerDTO: RegisterRequestDTO) => Promise<void>;
  logout: () => void;
}
