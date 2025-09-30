import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { session } = useAuth();

  // While session is undefined (still loading), show a loader
  if (session === undefined) {
    return <SessionLoader />;
  }

  // If no session → redirect to login
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // If session exists → render children
  return children;
};

const SessionLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center space-y-6">
        {/* Pulsing logo/icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>

        {/* Loading text with dots animation */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 font-jakarta">
            Getting things ready
          </h3>
          <p className="text-gray-600 flex items-center justify-center space-x-1">
            <span>Loading your session</span>
            <span className="flex space-x-1">
              <span className="animate-bounce">.</span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                .
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                .
              </span>
            </span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
