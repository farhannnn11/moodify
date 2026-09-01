import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Home from "./features/home/pages/Home";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path:"/login",
    element:<Login />

  },{
    path:"/home",
    element:<Home />
  }
]);
