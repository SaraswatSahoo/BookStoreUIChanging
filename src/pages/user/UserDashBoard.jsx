import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/MyContext";
import Loader from "../../components/loader/Loader";

export default function UserDashBoard() {
  
  const user = JSON.parse(localStorage.getItem("users"));
  const { loading, getAllOrder } = useContext(MyContext);

  return (
    <Layout>
      <div className=" flex flex-col justify-center items-start px-[100px] py-[50px]">

        <div className="w-full rounded-[30px] bg-[#fff49e] flex flex-col justify-center items-center py-[30px] space-y-1">
          <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" className="mb-5" />
          <p className=" text-[20px]"><span className=" text-[20px] font-semibold">Name :</span> {user?.name}</p>
          <p className=" text-[20px]"><span className=" text-[20px] font-semibold">Email :</span> {user?.email}</p>
          <p className=" text-[20px]"><span className=" text-[20px] font-semibold">Date :</span> {user?.date}</p>
          <p className=" text-[20px]"><span className=" text-[20px] font-semibold">Role :</span> {user?.role}</p>
        </div>

        <div className=" px-[120px] w-full mb-10">

          <h1 className="text-4xl font-semibold mt-10 mb-8">Order Details</h1>

            {loading && <Loader />}

            {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => {
              return(
                <div key={index}>
                  {order.cartItems.map((item, index) => {
                    const { id, bookAuthor, bookImageURL, bookName, bookPrice, genre, quantity } = item;
                    const { status } = order;
                    return (
                      <div className=" h-[380px] w-full rounded-[30px] border-[#ffe300] border-2 flex mb-[20px]">
                        <div className=" h-full w-[400px] bg-[#fff49e] border-[#ffe300] border-r-2 rounded-l-[30px] flex flex-col justify-center items-start px-[60px]">
                          <p className=" text-[17px] font-semibold mb-2">Order Id</p>
                          <p className=" text-[17px] mb-5 text-gray-900">#{id}</p>
                          <p className=" text-[17px] font-semibold mb-2">Date</p>
                          <p className=" text-[17px] mb-5 text-gray-900">4 July, 2024</p>
                          <p className=" text-[17px] font-semibold mb-2">Total Amount</p>
                          <p className=" text-[17px] mb-5 text-gray-900">₹ {bookPrice * quantity}</p>
                          <p className=" text-[17px] font-semibold mb-2">Order Status</p>
                          <p className=" text-[17px] mb-5 text-green-800">{status}</p>
                        </div>

                        <div className=" h-full w-full p-[30px] flex justify-start items-start">
                          <img src={bookImageURL} alt={bookName} className=" h-[250px] rounded-lg"/>
                          <div className="ml-8 mt-2 w-full">
                            <p className="text-[25px] font-semibold">{bookName}</p>
                            <p className="text-[20px] text-blue-500 mb-5">{bookAuthor}</p>
                            <p className="text-gray-700 text-[20px]">x {quantity}</p>
                          </div>
                          <p className="w-[150px] p-[20px] text-[25px] font-semibold">₹ {bookPrice}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}

          </div>
        </div>
    </Layout>
  )
}
