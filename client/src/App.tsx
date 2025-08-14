import { RouterProvider } from "react-router-dom";
import { Suspense, useMemo } from "react";
import { router } from "./routes/router";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user, setUser } = useAuth();

  const authValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <AuthContext.Provider value={authValue}>
      <Suspense fallback={<div>Loading…</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthContext.Provider>
  );
}
