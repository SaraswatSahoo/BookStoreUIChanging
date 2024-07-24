import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

export default function Navbar() {

  const user = JSON.parse(localStorage.getItem('users'));1
  const navigate = useNavigate();
  const cartItem = useSelector(state => state.cart);

  function logout(){
    localStorage.clear('users');
    navigate('/login');
  }

  return (
    <div className="w-full h-[80px] bg-[#ffe300] sticky top-0 flex items-center justify-between px-4">
      <h1 className="text-[40px] font-extrabold">
        <Link to="/" className="ml-[30px]">Books</Link> 
      </h1>
      <SearchBar />
      <ul className="flex space-x-5 text-[22px] font-medium mr-[20px]">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">All Products</Link>
        </li>

        {!user? 
          <li>
            <Link to="/signup">SignUp</Link>
          </li> : ""
        }

        {!user? 
          <li>
            <Link to="/login">Login</Link>
          </li> : ""
        }
        
        {user?.role === 'user' &&
          <li>
            <Link to='/user-dashboard'>{user?.name}</Link>
          </li>
        }
        
        {user?.role === "admin" && 
          <li>
            <Link to='/admin-dashboard'>{user?.name}</Link>
          </li>
        }

        {user && 
          <li className=" cursor-pointer" onClick={logout}>
            Logout
          </li>
        }
        
        <li>
          <Link to="/cart">Cart ({cartItem.length})</Link>
        </li>
      </ul>
    </div>
  );
}
