import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import AuthProvider from "./components/AuthProvider";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Spinner from "./components/Spinner";

const Navbar = React.lazy(() => import("./components/Navbar"));
const Footer = React.lazy(() => import("./components/Footer"));
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <main className="container">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    ),
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <React.Suspense
          fallback={
            <div className="mt-36">
              <Spinner />
            </div>
          }
        >
          <RouterProvider router={router} />
        </React.Suspense>
      </AuthProvider>
      <Toaster position="top-right" closeButton richColors />
    </ThemeProvider>
  </React.StrictMode>
);
