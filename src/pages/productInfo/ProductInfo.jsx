import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import MyContext from "../../context/MyContext";

export default function ProductInfo() {

  const { ID } = useParams();
  const { getAllProduct } = useContext(MyContext);

  const bookInfo = getAllProduct.find((book) => book.id === ID);

  if (!bookInfo) {
    return (
      <Layout>
        <div className="flex justify-center items-center my-[100px]">
          <p>Book not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-evenly items-start my-[100px]">
        <div className="w-[570px] h-[800px] flex justify-center items-center bg-white shadow-xl p-6 rounded-lg">
          <img src={bookInfo.bookImageURL} className="h-[700px] object-cover mb-4 rounded-lg" alt={bookInfo.bookName} />
        </div>
        <div className="flex flex-col justify-center items-start w-[550px] mt-[70px]">
          <h1 className="text-[50px] font-bold mb-2">{bookInfo.bookName}</h1>
          <p className="text-[20px] text-blue-700 text-center mb-4">{bookInfo.bookAuthor}</p>
          <p className="text-[40px] font-semibold mb-4">Rs. {bookInfo.bookPrice}</p>
          <p className="text-[22px] font-semibold mb-2">Description:</p>
          <p className="text-[18px] mb-10">{bookInfo.description}</p>
          <button className="w-full border border-black px-8 py-3 hover:bg-black hover:text-white text-lg font-semibold rounded-lg transition duration-300">Add to Cart</button>
        </div>
      </div>
    </Layout>
  );
}
