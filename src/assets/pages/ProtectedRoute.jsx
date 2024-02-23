import { Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProtectedRoute({ user, children, redirect }) {
  const location = useLocation();

  return (
    <div>
      {user ? (
        <div className="flex flex-col items-stretch ">
          <Navbar />
          {children}
        </div>
      ) : (
        <Navigate to={redirect || location.pathname} />
      )}
    </div>
  );
}
