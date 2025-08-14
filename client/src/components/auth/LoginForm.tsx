import { useState } from "react";

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onLogin) onLogin(email, password);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title mb-3 text-center">Log in</h5>

              <form onSubmit={handleSubmit} className="d-grid gap-2">
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={!onLogin}
                >
                  Login
                </button>
              </form>

              <div className="text-center my-3">
                <span className="text-muted">OR</span>
              </div>

              <div className="d-grid gap-2">
                <a
                  className="btn btn-outline-secondary w-100"
                  href={`${API_URL}/auth/google`}
                >
                  <i className="bi bi-google me-2" /> Continue with Google
                </a>
                <a
                  className="btn btn-outline-dark w-100"
                  href={`${API_URL}/auth/github`}
                >
                  <i className="bi bi-github me-2" /> Continue with GitHub
                </a>
              </div>

              <div className="text-center mt-3">
                <a href="#" className="link-secondary small">
                  Do not have an account? Register
                </a>
              </div>
            </div>
          </div>
          <p className="text-muted text-center mt-3 small">
            Inventory Management App
          </p>
        </div>
      </div>
    </div>
  );
}
