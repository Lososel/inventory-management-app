import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { router } from "./routes/AppRouter";

export default function App() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
