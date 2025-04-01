import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { loginRequest, registerRequest } from "../api/auth";
import { LoginRequestDTO } from "../api/types/request/login";
import { LocalStorageKeys } from "../enums/local-storage-keys";
import { AuthContextType, User } from "./types/auth-context";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      return;
    }

    const userString = localStorage.getItem(LocalStorageKeys.USER);
    if (!userString) {
      return;
    }

    const parsedUser = JSON.parse(userString);
    setUser(parsedUser);
  }, [user]);

  const setSession = useCallback(
    ({
      accessToken,
      refreshToken,
      user,
    }: {
      accessToken: string | null;
      refreshToken: string | null;
      user: User | null;
    }) => {
      if (accessToken && refreshToken && user) {
        localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);
        localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, refreshToken);
        localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(user));
        setUser(user);
      } else {
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
        localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
        localStorage.removeItem(LocalStorageKeys.USER);
        setUser(null);
      }
    },
    []
  );

  const login = useCallback(
    async (loginDTO: LoginRequestDTO) => {
      const response = await loginRequest(loginDTO);

      const { user, tokens } = response.data;

      setSession({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user,
      });

      navigate("/", { replace: true });
    },
    [navigate, setSession]
  );

  const logout = useCallback(() => {
    setSession({
      accessToken: null,
      refreshToken: null,
      user: null,
    });

    navigate("/login", { replace: true });
  }, [navigate, setSession]);

  const register = useCallback(
    async (registerDTO: { name: string; email: string; password: string }) => {
      const response = await registerRequest(registerDTO);

      const { user, tokens } = response.data;

      setSession({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user,
      });

      navigate("/", { replace: true });
    },
    [navigate, setSession]
  );

  const value: AuthContextType = useMemo(
    () => ({
      login,
      register,
      logout,
      user,
    }),
    [login, logout, user, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
