import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Tasks } from "./pages/tasks";
import { Register } from "./pages/users/register";
import { Login } from "./pages/users/login";
import App from "./App";
import { CreateTask } from "./pages/tasks/form";
export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "createtask",
        element: <CreateTask />,
      },
      {
        path: "createtask/:id",
        element: <CreateTask />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
