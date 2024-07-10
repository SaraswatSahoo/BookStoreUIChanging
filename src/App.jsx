import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import Cart from "./pages/cart/Cart";
import AllProducts from "./pages/allProducts/AllProducts";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import UserDashBoard from "./pages/user/UserDashBoard";

export default function App() {

  const router = createBrowserRouter ([
    {path: '/', element: <Home />},
    {path:'/*', element: <NoPage />},
    {path:'/:ID', element: <ProductInfo />},
    {path:'/cart', element: <Cart />},
    {path:'/products', element: <AllProducts />},
    {path:'/login', element: <Login />},
    {path:'/signup', element: <Signup />},
    {path:'/user-dashboard', element: <UserDashBoard />},
  ]);

  return (
    <RouterProvider router={ router }/>
  );
}
