import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { router } from "./routes/router";
import AuthProvider from "./context/AuthProvider";
import ThemeProvider from "./context/ThemeProvider";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<div>Loading…</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}
