import { createBrowserRouter } from "react-router-dom";
import GamePage from "../pages/GamePage";
import Root from "../layouts/Root";
import Learn from "../pages/Learn";
import NewsPage from "../pages/NewsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/game",
        element: <GamePage />,
      },
      {
        path: "/learn",
        element: <Learn />,
      },
      {
        path: "/news",
        element: <NewsPage />,
      },
    ],
  },
]);

export default router;
