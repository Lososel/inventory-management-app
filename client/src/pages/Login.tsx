import Header from "../components/nav/Header";
import LoginForm from "../components/auth/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";

export default function Login() {
  const { processing, error } = useLoginForm({ redirectTo: "/profile" });
  return (
    <div>
      <Header />
      {processing && <div className="mb-2">Signing you in…</div>}
      {error && <div className="text-danger small mb-2">{error}</div>}
      <LoginForm />
    </div>
  );
}
