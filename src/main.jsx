import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import AuthProvider from "./components/AuthProvider";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Spinner from "./components/Spinner";

import General from "./pages/MyProfile/General";
import Preferences from "./pages/MyProfile/Preferences";
const Navbar = React.lazy(() => import("./components/Navbar"));
const Footer = React.lazy(() => import("./components/Footer"));
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const Recipes = React.lazy(() => import("./pages/Recipes"));
const AddRecipe = React.lazy(() => import("./pages/AddRecipe/AddRecipe"));
const MyRecipes = React.lazy(() => import("./pages/MyRecipes"));
const MyProfile = React.lazy(() => import("./pages/MyProfile/MyProfile"));


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <main className="container flex flex-col min-h-screen">
        <Navbar />
        <div className="my-4 flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "recipes", element: <Recipes /> },
      { path: "add-recipe", element: <AddRecipe /> },
      { path: "my-recipes", element: <MyRecipes /> },
      {
        path: "my-profile",
        element: <MyProfile />,
        children: [
          {
            path: "/my-profile",
            element: <General />,
          },
          {
            path: "preferences",
            element: <Preferences />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
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
      <Toaster offset={60} position="top-right" closeButton richColors />
    </ThemeProvider>
  </React.StrictMode>
);
