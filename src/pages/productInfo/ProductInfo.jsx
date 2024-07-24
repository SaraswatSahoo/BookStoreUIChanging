import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader"

export default function ProductInfo() {

  const { ID } = useParams();
  const { loading, setLoading } = useContext(MyContext);
  const [ book, setBook ] = useState('');
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  async function getBookInfo(){
    setLoading(true);
    try {
      const bookTemp = await getDoc(doc(fireDB, "product", ID));
      setBook({...bookTemp.data(), id: bookTemp.id});
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function addCart(item){
    const { time, date, ...restData } = item ;
    dispatch(addToCart(restData));
    toast.success("Add to cart");
  }

  function removeItem(item){
    dispatch(deleteFromCart(item));
    toast.success("Delete from cart");
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getBookInfo();
  },[]);

  return (
    <Layout>
      <div className="flex justify-evenly items-start my-[100px]">
        {loading ? 
          <div className="flex justify-center items-center">
            <Loader />
          </div>
          :
          <>
            <div className="w-[570px] h-[800px] flex justify-center items-center bg-white shadow-xl p-6 rounded-lg">
              <img src={book.bookImageURL} className="h-[700px] object-cover mb-4 rounded-lg" alt={book.bookName} />
            </div>
            <div className="flex flex-col justify-center items-start w-[550px] mt-[70px]">
              <h1 className="text-[50px] font-bold mb-2">{book.bookName}</h1>
              <p className="text-[20px] text-blue-700 text-center mb-4">{book.bookAuthor}</p>
              <p className="text-[40px] font-semibold mb-4">Rs. {book.bookPrice}</p>
              <p className="text-[22px] font-semibold mb-2">Description:</p>
              <p className="text-[18px] mb-10">{book.description}</p>
              {cartItems.some((p)=>p.id === book.id) ?
                <button
                  onClick={()=>removeItem(book.id)}
                  className="w-full border text-white bg-black px-8 py-3 hover:bg-white hover:text-black hover:border-black text-lg rounded-lg transition duration-300">
                    Remove From Cart
                </button> :
                <button 
                  onClick={()=>addCart(book)}
                  className="w-full border text-white bg-black px-8 py-3 hover:bg-white hover:text-black hover:border-black text-lg rounded-lg transition duration-300">
                    Add to Cart
                </button>
              }
            </div>
          </>
        }
      </div>
    </Layout>
  );
}
