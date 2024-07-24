import ProductCard from "../productCard/ProductCard";
import { useContext, useEffect } from "react";
import MyContext from "../../context/MyContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

export default function ProductsSection() {

  const navigate = useNavigate();
  const { getAllProduct } = useContext(MyContext);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  function addCart(item){
    dispatch(addToCart(item));
    console.log(item);
    toast.success("Add to Cart");
  }

  function removeCart(item){
    dispatch(deleteFromCart(item));
    console.log(item);
    toast.success("Delete from Cart");
  } 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  },[cartItems]);

  return (
    <>
    <div className="">
      <h1 className=" text-center text-[40px] font-semibold mt-10">Bestselling Products</h1>
    </div>
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-4 gap-20 p-20">
        {getAllProduct && getAllProduct.slice(0,8).map((book) => {
          const { time, date, ...restData} = book;
          return <ProductCard
            key={book.id}
            BookID={book.id}
            BookImg={book.bookImageURL}
            BookTitle={book.bookName}
            BookAuthor={book.bookAuthor}
            BookPrice={book.bookPrice}
            BookButton={
              cartItems.some((p)=>p.id === book.id) ?
              <button
                onClick={()=>removeCart(book.id)}
                className="w-full border text-white bg-black px-8 py-3 hover:bg-white hover:text-black hover:border-black text-lg rounded-lg transition duration-300">
                  Remove From Cart
              </button> :
              <button 
                onClick={()=>addCart(restData)}
                className="w-full border text-white bg-black px-8 py-3 hover:bg-white hover:text-black hover:border-black text-lg rounded-lg transition duration-300">
                  Add to Cart
              </button>
            }
          />
        })}
      </div>
    </div>
    </>
    
  );
}
