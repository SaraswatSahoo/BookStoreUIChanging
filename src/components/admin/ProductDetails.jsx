import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../../context/MyContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

export default function ProductDetails() {

  const { loading, setLoading, getAllProduct, getAllProductHandler } = useContext(MyContext);
  const navigate = useNavigate();

  async function deleteProduct(id){
    setLoading(true);
    try {
      await deleteDoc(doc( fireDB, "product", id))
      toast.success("Product deleted successfully");
      getAllProductHandler();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-semibold">All Product</h1>
        <Link to={'/addproduct'}>
          <button className="bg-black text-white text-[18px] px-[20px] py-[8px] rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black hover:py-[6px]">Add Product</button>
        </Link>
      </div>

      <div className="flex justify-center relative top-20">
        {loading && <Loader />}
      </div>

      <div className="w-full mt-[20px]">
        <table className="w-full text-left border-[#ffe300] border-[3px] text-[black]">
          <tbody>
            <tr>
              <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">S.No.</th>
              <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Image</th>
              <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Name</th>
              <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Author</th>
              <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Price</th>
              <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Genre</th>
              <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Date</th>
              <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Action</th>
              <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Action</th>
            </tr>

            {getAllProduct.map((item, index) => {
              const { id, bookName, bookAuthor, bookPrice, genre, date, bookImageURL } = item;
              return (
                <tr key={id}>
                  <td className="h-12 px-6 text-md border-2 border-[#ffe300]">{index + 1}.</td>
                  <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase py-2"><img src={bookImageURL} alt="" className=" h-[150px]" /></td>
                  <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase">{bookName}</td>
                  <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase">{bookAuthor}</td>
                  <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase">₹ {bookPrice}</td>
                  <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase">{genre}</td>
                  <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase">{date}</td>
                  <td onClick={() => navigate(`/updateproduct/${id}`)} className="h-12 px-6 text-md border-2 border-[#ffe300] text-green-500 cursor-pointer hover:decoration-solid hover:underline">Edit</td>
                  <td onClick={() => deleteProduct(id)} className="h-12 px-6 text-md border-2 border-[#ffe300] text-red-500 cursor-pointer hover:decoration-solid hover:underline">Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
