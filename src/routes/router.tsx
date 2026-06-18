import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Spinner from "../components/Spinner";

const MovieDetails = lazy(() => import("../pages/MovieDetails"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "movie/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <MovieDetails />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;