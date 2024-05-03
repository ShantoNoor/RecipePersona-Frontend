import { Navigate, useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import useAuth from "@/hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { pathname, state } = useLocation();

  if (loading) return <Spinner />;
  if (user) return children;
  return <Navigate to="/login" state={{...state, pathname}} replace={true} />;
};

export default PrivateRoute;
