import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import FilmPage from "../pages/FilmPage/FilmPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/film/:id",
    element: <FilmPage />,
  },
]);
