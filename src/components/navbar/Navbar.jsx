import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

export default function Navbar() {
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
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        <li>
          <Link to='/user-dashboard'>Saraswat</Link>
        </li>
        <li>
          <Link to="/cart">Cart (0)</Link>
        </li>
      </ul>
    </div>
  );
}
