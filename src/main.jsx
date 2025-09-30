import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { RouterProvider } from "react-router";
import CalendarPage from "./components/Calander";
import AppLayout from "./components/AppLayout";
import ProjectsPage from "./components/Project/ProjectPage";
import ProjectDetailsPage from "./components/Project/ProjectDetail";
import RegisterForm from "./components/Auth/Register";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/project/deatil/:id",
        element: <ProjectDetailsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </StrictMode>
);
