export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  getUser: () => User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
