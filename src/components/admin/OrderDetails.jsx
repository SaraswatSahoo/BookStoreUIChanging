import { useContext } from "react"
import MyContext from "../../context/MyContext"

export default function OrderDetails() {

  const { getAllOrder, deleteProduct } = useContext(MyContext);

  return (
    <div>
      <div className=" flex justify-between items-center">
        <h1 className=" text-[22px] font-semibold">All Orders</h1>
      </div>

      <div className="w-full mt-[20px]">
        <table className="w-full text-left border-[#ffe300] border-[3px] text-[black]" >
            <tbody>

              <tr>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">S.No.</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Order Id</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Image</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Title</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Category</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Price</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Quantity</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Total Price</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Status</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Name</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Address</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Pincode</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Phone Number</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Email</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Date</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Action</th>
              </tr>

              
              {getAllOrder.map((order) => {
                return(
                  <>
                    {order.cartItems.map((item, index) => {
                      const { id, bookImageURL, bookName, genre, bookPrice, quantity } = item ;
                      return (
                        <tr key={index}>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300]">{index + 1}.</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{order.id}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase "><img src={bookImageURL} alt={bookName} /></td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{bookName}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{genre}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">₹ {bookPrice}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{quantity}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">₹ {bookPrice * quantity}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase text-green-600">{order.status}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{order.addressInfo.name}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{order.addressInfo.address}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{order.addressInfo.pincode}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{order.addressInfo.mobileNumber}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{order.email}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{order.date}</td>
                          <td className="h-12 px-6 text-md border-2 border-[#ffe300] text-red-500 cursor-pointer hover:underline" onClick={()=>deleteProduct(order.id)}>Delete</td>
                        </tr>
                      )
                    })}
                  </>
                )
              })}
            

            </tbody>
        </table>
      </div>

    </div>
  )
}
