import { createBrowserRouter } from "react-router-dom";

// pages
import LoginPage from "../pages/LoginPage";
import OrderPage from "../pages/OrderPage";
import WorkerPage from "../pages/WorkerPage";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "customer",
    element: <OrderPage />,
  },
  {
    path: "/worker",
    element: <WorkerPage />,
  },
]);
