import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import AuthProvider from "./components/AuthProvider";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Spinner from "./components/Spinner";

import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import General from "./pages/MyProfile/General";
import Preferences from "./pages/MyProfile/Preferences";
const Navbar = React.lazy(() => import("./components/Navbar"));
const Footer = React.lazy(() => import("./components/Footer"));
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const ViewRecipe = React.lazy(() => import("./pages/ViewRecipe"));
const UpdateRecipe = React.lazy(() => import("./pages/UpdateRecipe"));
const Recipes = React.lazy(() => import("./pages/Recipes"));
const AddRecipe = React.lazy(() => import("./pages/AddRecipe/AddRecipe"));
const MyRecipes = React.lazy(() => import("./pages/MyRecipes"));
const MyProfile = React.lazy(() => import("./pages/MyProfile/MyProfile"));
const Recommendations = React.lazy(() => import("./pages/Recommendations"));

const queryClient = new QueryClient();

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
      { path: "view-recipe/:_id", element: <ViewRecipe /> },
      { path: "update-recipe/:_id", element: <UpdateRecipe /> },
      { path: "my-recipes", element: <MyRecipes /> },
      { path: "recommendations", element: <Recommendations /> },
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
    <ThemeProvider
      defaultTheme="dark"
      attribute="class"
      storageKey="vite-ui-theme"
    >
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
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
        </HelmetProvider>
      </QueryClientProvider>
      <Toaster offset={60} position="top-right" closeButton richColors />
    </ThemeProvider>
  </React.StrictMode>
);
