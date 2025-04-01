import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./hooks/useAuth";

export default function App() {
  const { getUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      navigate("/login");
    }
  }, [getUser, navigate]);

  return <h1>Hello World!</h1>;
}
