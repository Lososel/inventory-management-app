import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../lib/token";
import { fetchMe } from "../api/auth.service";
import { useAuth } from "./useAuth";

type UseLoginFormOptions = {
  redirectTo?: string;
};

export function useLoginForm(options?: UseLoginFormOptions) {
  const redirectTo = options?.redirectTo ?? "/profile";
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const next = params.get("next") || redirectTo;

    if (!token) return;

    let cancelled = false;

    (async () => {
      try {
        setProcessing(true);
        setError(null);
        setToken(token);
        const me = await fetchMe();
        if (cancelled) return;
        login(me, token);
        navigate(next, { replace: true });
      } catch {
        if (cancelled) return;
        setError("Login failed. Please try again.");
        navigate("/login", { replace: true });
      } finally {
        if (!cancelled) setProcessing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [location.search, redirectTo, login, navigate]);

  return { processing, error };
}
