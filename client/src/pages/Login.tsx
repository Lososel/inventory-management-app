import { useUser } from "../hooks/useUser";
import Header from "../components/nav/Header";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  const { setUser } = useUser();

  const handleLogin = async (email: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setUser(data.user);
  };

  return (
    <div>
      <Header></Header>
      <LoginForm onLogin={handleLogin}></LoginForm>
    </div>
  );
}
