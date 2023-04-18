import { createBrowserRouter } from "react-router-dom";

// pages
import LoginPage from "../pages/LoginPage";
import WorkerPage from "../pages/WorkerPage";
import CustomerPage from "../pages/CustomerPage";
import ExpensePage from "../pages/ExpensePage";
import PurchasePage from "../pages/PurchasePage";
import AdminPage from "../pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "customer",
    element: <CustomerPage />,
  },
  {
    path: "/worker",
    element: <WorkerPage />,
  },
  {
    path: "/expense",
    element: <ExpensePage />,
  },
  {
    path: "/purchase",
    element: <PurchasePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);
