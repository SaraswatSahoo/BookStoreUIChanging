import { useNavigate } from "react-router-dom";

export default function ProtectedRouteForUser({children}) {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  if(user?.role === "user")
    return children ;
  else
    navigate('/login');
}
