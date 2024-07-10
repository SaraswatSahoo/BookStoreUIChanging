import { Trash } from "lucide-react";
import DUMMY_DATA from "../../DUMMY_DATA/DUMMY_DATA";
import Layout from "../../components/layout/Layout";

export default function Cart() {

  const totalPrice = DUMMY_DATA.reduce(
    (accumulator, book) => accumulator + book.price,
    0,
  );

  return (
    <Layout>
      <div className="flex justify-around items-start px-4">

        <div className="flex flex-col justify-center items-start w-full max-w-4xl">
          <h1 className="text-4xl font-semibold mt-10 mb-[70px]">Shopping Cart</h1>
          <div className="space-y-4 w-full mb-10">
            {DUMMY_DATA.map((book) => 
              <div key={book.id} className="flex justify-between items-center border-b-2 p-4">
                <div className="flex items-start space-x-6 w-full">
                  <img src={book.img} className="h-[150px] w-[100px] object-cover rounded-lg" alt={book.name} />
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h2 className="text-xl font-semibold">{book.name}</h2>
                      <p className="text-xl font-medium mt-2">₹ {book.price}</p>
                    </div>
                    <div className="flex items-center mt-5">
                      <button type="button" className="text-[20px] font-semibold">-</button>
                      <input type="number" className="mx-4 h-10 w-12 rounded-md border text-center font-semibold" defaultValue={1} />
                      <button type="button" className="text-[20px] font-semibold">+</button>
                      <button className="text-[#e74040] flex ml-5 items-center gap-2"><Trash color="#e74040" /> Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-start w-full max-w-[500px]">
          <h1 className="text-2xl font-semibold mt-[170px] mb-8 border-b-2 pb-[20px] px-[25px] w-full">Price Details</h1>
          <div className="mb-8 border-b-2 border-dashed pb-[25px] px-[20px] w-full text-[19px] space-y-5">
            <div className=" flex justify-between items-center w-full">
              <p>Price (8 items)</p>
              <p>₹ {totalPrice}</p>
            </div>
            <div className=" flex justify-between items-center w-full">
              <p>Discount</p>
              <p className=" text-green-700">- ₹ {0.05 * totalPrice}</p>
            </div>
            <div className=" flex justify-between items-center w-full">
              <p>Delivery Price</p>
              <p className=" text-green-700">Free</p>
            </div>
          </div>
          <div className=" flex justify-between items-center w-full px-[20px] text-[22px] mb-8 border-b-2 pb-[20px] border-dashed">
            <p>Total Amount</p>
            <p>₹ {totalPrice - 0.05 * totalPrice}</p>
          </div>
          <button className="w-full border text-white bg-black px-8 py-3 hover:bg-white hover:text-black hover:border-black text-lg font-semibold rounded-lg transition duration-300">Buy Now</button>
        </div>
      </div>
    </Layout>
  )
}
