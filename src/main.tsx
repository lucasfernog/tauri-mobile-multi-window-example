import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import List from "./routes/List.tsx";
import Detail from "./routes/Detail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/list" replace /> },
      { path: "/list", element: <List /> },
      { path: "/detail/:id", element: <Detail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
