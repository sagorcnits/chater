import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const user = localStorage.getItem("user");

  if (user) {
    return children;
  }


  return <Navigate to="/login"></Navigate>
}

export default PrivateRoute;
