import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import Cart from "./pages/cart/Cart";
import AllProducts from "./pages/allProducts/AllProducts";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import UserDashBoard from "./pages/user/UserDashBoard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import MyState from "./context/MyState";
import { Toaster } from "react-hot-toast";
import ProtectedRouteForUser from "./protectedRoute/ProtectedRouteForUser";
import ProtectedRouteForAdmin from "./protectedRoute/ProtectedRouteForAdmin";
import HomeLandingPage from "./pages/HomeLandingPage/HomeLandingPage";

export default function App() {

  const router = createBrowserRouter ([
    {path: '/', element: <HomeLandingPage />},
    {path:'/*', element: <NoPage />},
    {path:'/:ID', element: <ProductInfo />},
    {path:'/cart', element: <Cart />},
    {path:'/products', element: <AllProducts />},
    {path:'/login', element: <Login />},
    {path:'/signup', element: <Signup />},
    {path:'/user-dashboard', element: <ProtectedRouteForUser><UserDashBoard /></ProtectedRouteForUser>},
    {path:'/admin-dashboard', element: <ProtectedRouteForAdmin><AdminDashboard /></ProtectedRouteForAdmin>},
    {path:'/addproduct', element: <ProtectedRouteForAdmin><AddProductPage /></ProtectedRouteForAdmin>},
    {path:'/updateproduct/:id', element: <ProtectedRouteForAdmin><UpdateProductPage /></ProtectedRouteForAdmin>},
  ]);

  return (
    <MyState>
      <RouterProvider router={ router }/>
      <Toaster />
    </MyState>
  );
}
