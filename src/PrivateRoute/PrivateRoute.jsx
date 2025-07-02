import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const user = useSelector(state => state.user)
  const isAuthenticated = user.email !== "";
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;