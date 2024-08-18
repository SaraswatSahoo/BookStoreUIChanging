import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRouteForAdmin({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role !== "admin") {
      navigate('/login');
    }
  }, [navigate]);

  // Render nothing if the condition is not met and navigation is in progress
  return children;
}
