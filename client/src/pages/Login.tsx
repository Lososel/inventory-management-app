import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      sessionStorage.setItem("access_token", token);
      navigate("/");
    }
  }, [params, navigate]);

  return <div>Logging in...</div>;
};

export default Login;
