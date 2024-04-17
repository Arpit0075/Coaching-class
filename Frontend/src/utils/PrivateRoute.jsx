import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  let decoded = jwt_decode(token);
  let currentTime = new Date().getTime() / 1000; //in seconds

  if (currentTime > decoded.exp) {
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }
  return children;
}

export default PrivateRoute;
