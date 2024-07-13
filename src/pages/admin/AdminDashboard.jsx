import { ListOrdered, ShoppingBasket, Users } from "lucide-react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetails from "../../components/admin/ProductDetails";
import OrderDetails from "../../components/admin/OrderDetails";
import UserDetails from "../../components/admin/UserDetails";
import { useContext } from "react";
import MyContext from "../../context/MyContext";

export default function AdminDashboard() {

  const user = JSON.parse(localStorage.getItem("users"));
  const { getAllProduct } = useContext(MyContext);

  const classTab = "flex flex-col justify-center items-center py-[20px] bg-[#fff49e] w-full rounded-[20px] border-[#ffe300] border-[3px] mb-[20px] hover:bg-[#ffeb54] transition duration-300";

  return (
    <div className="flex flex-col justify-center items-center p-[30px] space-y-[20px]">

      <div className="flex flex-col justify-center items-center py-[20px] bg-[#fff49e] w-full rounded-[10px] border-[#ffe300] border-[3px]">
        <h1 className="text-[25px] font-semibold">Admin Dashboard</h1>
      </div>
      <div className="flex flex-col justify-center items-center py-[20px] bg-[#fff49e] w-full rounded-[10px] border-[#ffe300] border-[3px] space-y-1">
        <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" className="mb-5" />
        <p className=" text-[20px]"><span className=" text-[20px] font-semibold">Name :</span> {user?.name}</p>
        <p className=" text-[20px]"><span className=" text-[20px] font-semibold">Email :</span> {user?.email}</p>
        <p className=" text-[20px]"><span className=" text-[20px] font-semibold">Date :</span> {user?.date}</p>
        <p className=" text-[20px]"><span className=" text-[20px] font-semibold">Role :</span> {user?.role}</p>
      </div>

      <Tabs className='w-full'>

        <TabList className=" flex justify-evenly items-center w-full space-x-[20px] px-[50px]">
          <Tab className={classTab}>
            <ShoppingBasket size={48} />
            <h1 className="text-[30px] mt-[15px]">{getAllProduct.length}</h1>
            <h1 className="text-[16px] font-semibold ">Total Products</h1>
          </Tab>
          <Tab className={classTab}>
          <ListOrdered size={48} />
            <h1 className="text-[30px] mt-[15px]">10</h1>
            <h1 className="text-[16px] font-semibold ">Total Orders</h1>
          </Tab>
          <Tab className={classTab}>
          <Users size={48} />
            <h1 className="text-[30px] mt-[15px]">10</h1>
            <h1 className="text-[16px] font-semibold ">Total Users</h1>
          </Tab>
        </TabList>

        <TabPanel>
          <ProductDetails />
        </TabPanel>
        <TabPanel>
          <OrderDetails />
        </TabPanel>
        <TabPanel>
          <UserDetails />
        </TabPanel>

      </Tabs>
    </div>
  )
}
