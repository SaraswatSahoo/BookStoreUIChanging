import { useNavigate } from "react-router-dom";

export default function ProtectedRouteForAdmin({children}) {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  if(user?.role === "admin")
    return children ;
  else
    navigate('/login');
}
