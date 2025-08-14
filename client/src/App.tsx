import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { router } from "./routes/router";
import AuthProvider from "./context/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading…</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}
