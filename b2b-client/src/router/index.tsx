import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "src/pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);
