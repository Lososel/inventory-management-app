import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken } from "../lib/token";

export default function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      setToken(token);
      navigate("/");
    }
  }, [params, navigate]);

  return <div>Logging in...</div>;
}
