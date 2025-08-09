import { lazy } from "react";
import Main from "../pages/Main";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
