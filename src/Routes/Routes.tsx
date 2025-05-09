import { RouteObject, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../components/404/NotFound";
import Home from "../components/Home/Home";
import DashboardLayout from "../components/Layout/DashboardLayout";
import MainLayout from "../components/Layout/MainLayout";
import PrivateRoute from "../components/RouteComponents/PrivateRoute";
import PublicRoute from "../components/RouteComponents/PublicRoute";
import About from "../Pages/About/About";
import AllBooks from "../Pages/Books/All Books/AllBooks";
import SingleBook from "../Pages/Books/Single Book/SingleBook";
import CheckoutPage from "../Pages/CheckOut/CheckOut";
import Login from "../Pages/Login/Login";
import OrderConfirmation from "../Pages/OrderConfirmation/OrderConfirmation";
import Register from "../Pages/Register/Register";
import UserDashboard from "../Pages/User/UserDashboard";
import AdminRoutes from "./AdminRoutes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-books",
        element: <AllBooks />,
      },
      {
        path: "books/:id",
        element: <SingleBook />,
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "order-confirmation",
        element: (
          <PrivateRoute>
            <OrderConfirmation />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: AdminRoutes as RouteObject[],
  },

  {
    path: "user",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
    ],
  },
]);

export default router;
