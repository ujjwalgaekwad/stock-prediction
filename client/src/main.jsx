import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import WhishlistPage from "./pages/WhishlistPage.jsx";
import StockDetailsPage from "./pages/StockDetailsPage.jsx";

//Context 
import { StocksProvider } from "./context/StocksContext";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/whishlist",
        element: <WhishlistPage />,
      },
      {
        path: "/stocks/:stockId",
        element: <StockDetailsPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/password-recovery",
        element: <PasswordRecoveryPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StocksProvider>
      <RouterProvider router={router} />
    </StocksProvider>
  </React.StrictMode>
);
