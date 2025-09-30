import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { session } = useAuth();

  // While session is undefined (still loading), show a loader
  if (session === undefined) {
    return <p>Loading...</p>;
  }

  // If no session → redirect to login
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // If session exists → render children
  return children;
};

export default ProtectedRoute;
