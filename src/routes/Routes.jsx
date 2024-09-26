import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Root from "../layout/Root";
import Chat from "../pages/home/Chat";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/chat-home",
    element: (
      <PrivateRoute>
        <Home></Home>
      </PrivateRoute>
    ),

    children:[
      {
        path:"/chat-home/chat-user/:id",
        element:<PrivateRoute><Chat></Chat></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/api/users/users/${params.id}`)
      }
    ]
  },
]);

export default router;
