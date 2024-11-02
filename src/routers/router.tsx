import { createBrowserRouter } from "react-router-dom";
import GamePage from "../pages/GamePage";

const router = createBrowserRouter([
  {
    path: "/game",
    element: <GamePage />,
  },
]);

export default router;
