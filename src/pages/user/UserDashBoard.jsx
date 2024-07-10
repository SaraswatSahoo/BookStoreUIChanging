import DUMMY_DATA from "../../DUMMY_DATA/DUMMY_DATA";
import Layout from "../../components/layout/Layout";

export default function UserDashBoard() {

  const book = DUMMY_DATA[0];

  return (
    <Layout>
      <div className=" flex flex-col justify-center items-start px-[100px] py-[50px]">

        <div className=" h-[270px] w-full rounded-[30px] bg-[#fff49e] flex flex-col justify-center items-center">
          <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" className="mb-5" />
          <p className=" text-[20px] mb-2"><span className=" text-[20px] font-semibold">Name :</span> Saraswat Sahoo</p>
          <p className=" text-[20px]"><span className=" text-[20px] font-semibold">Email :</span> saraswatsahoo13@gmail.com</p>
        </div>

        <div className=" px-[120px] w-full mb-10">

          <h1 className="text-4xl font-semibold mt-10 mb-8">Order Details</h1>

          <div className=" h-[380px] w-full rounded-[30px] border-[#ffe300] border-2 flex">

            <div className=" h-full w-[400px] bg-[#fff49e] border-[#ffe300] border-r-2 rounded-l-[30px] flex flex-col justify-center items-start px-[60px]">
              <p className=" text-[17px] font-semibold mb-2">Order Id</p>
              <p className=" text-[17px] mb-5 text-gray-900">#74557994327</p>
              <p className=" text-[17px] font-semibold mb-2">Date</p>
              <p className=" text-[17px] mb-5 text-gray-900">4 March, 2023</p>
              <p className=" text-[17px] font-semibold mb-2">Total Amount</p>
              <p className=" text-[17px] mb-5 text-gray-900">₹ 84,499</p>
              <p className=" text-[17px] font-semibold mb-2">Order Status</p>
              <p className=" text-[17px] mb-5 text-green-800">Confirmed</p>
            </div>

            <div className=" h-full w-full p-[30px] flex justify-start items-start">
              <img src={book.img} alt={book.name} className=" h-[120px] rounded-lg"/>
              <div className="ml-8 mt-2 w-full">
                <p className="text-[17px] font-semibold">{book.name}</p>
                <p className="text-[17px] text-blue-500 mb-5">{book.author}</p>
                <p className="text-gray-700 text-[17px]">x 1</p>
              </div>
              <p className="w-[100px] p-[20px] text-[18px] font-semibold">₹ {book.price}</p>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  )
}
