import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, userLoading } = useContext(AuthContext);
  if (userLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  else {
    if (user) return children;
    else return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
