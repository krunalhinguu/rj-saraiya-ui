import { createBrowserRouter } from "react-router-dom";

// pages
import LoginPage from "../pages/LoginPage";
import WorkerPage from "../pages/WorkerPage";
import CustomerPage from "../pages/CustomerPage";
import ExpensePage from "../pages/ExpensePage";
import PurchasePage from "../pages/PurchasePage";
import InventoryPage from "../pages/InventoryPage";
import NotFoundPage from "../pages/NotFoundPage";
import ReportPage from "../pages/ReportPage";
import PrivateRoute from "../utils/PrivateRoute";
import AdminRoute from "../utils/AdminRoute";
import Unauthorised from "../pages/Unauthorised";
import AboutPage from "../pages/AboutPage";
import UserPage from "../pages/UserPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <AboutPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "customer",
    element: (
      <PrivateRoute>
        <CustomerPage />
      </PrivateRoute>
    ),
  },
  {
    path: "report",
    element: (
      <PrivateRoute>
        <ReportPage />
      </PrivateRoute>
    ),
  },
  {
    path: "worker",
    element: (
      <PrivateRoute>
        <WorkerPage />
      </PrivateRoute>
    ),
  },
  {
    path: "expense",
    element: (
      <PrivateRoute>
        <ExpensePage />
      </PrivateRoute>
    ),
  },
  {
    path: "purchase",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <PurchasePage />
        </AdminRoute>
      </PrivateRoute>
    ),
  },
  {
    path: "inventory",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <InventoryPage />
        </AdminRoute>
      </PrivateRoute>
    ),
  },
  {
    path: "user",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <UserPage />
        </AdminRoute>
      </PrivateRoute>
    ),
  },
  {
    path: "unauthorised",
    element: <Unauthorised />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
