import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRouteForUser({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("users"));

  useEffect(() => {
    // Redirect if user role is not 'user'
    if (user?.role !== "user") {
      navigate('/login');
    }
  }, [user, navigate]);

  // Render children if user role is 'user'
  return user?.role === "user" ? children : null;
}
