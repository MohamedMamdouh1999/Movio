import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Spinner from "../components/shared/Spinner";

const Movie = lazy(() => import("../pages/Movie"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "movie/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <Movie />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;