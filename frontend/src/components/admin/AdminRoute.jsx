import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const AdminRoute = ({ children }) => {
  const { authUser } = useAuthStore();

  if (!authUser) return <Navigate to="/login" />;

  if (authUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;