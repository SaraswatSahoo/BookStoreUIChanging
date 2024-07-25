import { Trash } from "lucide-react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteFromCart, incrementQuantity, decrementQuantity } from "../../redux/cartSlice";
import { useEffect, useState } from "react";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { Navigate } from "react-router-dom";

export default function Cart() {

  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  
  function removeItem(item){
    dispatch(deleteFromCart(item));
    toast.success("Deleted From Cart");
  }

  function handleIncrement(id){
    dispatch(incrementQuantity(id));
  }

  function handleDecrement(id){
    dispatch(decrementQuantity(id));
  }

  const cartTotalItems = cartItems.map( item => item.quantity).reduce((prevVal, curValue) => prevVal + curValue, 0);
  const cartTotalPrice = cartItems.map( item => item.bookPrice * item.quantity).reduce((prevVal, curValue) => prevVal + curValue, 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])

  const user = JSON.parse(localStorage.getItem('users'));

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      'en-US',
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });

  function buyNow(){

    if(addressInfo.name === "" || addressInfo.address === "" ||addressInfo.pincode === "" || addressInfo.mobileNumber === ""){
      return toast.error("All fields are required");
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString(
        "en-US",
        {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }
      )
    }

    try {
      const orderRef = collection(fireDB, 'order');
      addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      })
      toast.success("Order Placed Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <Layout>
      <div className="flex justify-around items-start px-4 my-10">

        <div className="flex flex-col justify-center items-start w-full max-w-4xl">
          <h1 className="text-4xl font-semibold mt-10 mb-[70px]">Shopping Cart</h1>
          <div className="space-y-4 w-full mb-10">
          {cartItems.length > 0 ?
          <>
            {cartItems.map((book) => 
              <div key={book.id} className="flex justify-between items-center border-b-2 p-4">
                <div className="flex items-start space-x-6 w-full">
                  <img src={book.bookImageURL} className="h-[150px] w-[100px] object-cover rounded-lg" alt={book.bookname} />
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h2 className="text-xl font-semibold">{book.bookName}</h2>
                      <p className="text-xl font-medium mt-2">₹ {book.bookPrice}</p>
                    </div>
                    <div className="flex items-center mt-5">
                      <button type="button" className="text-[20px] font-semibold" onClick={() => handleDecrement(book.id)}>-</button>
                      <input type="number" className="mx-4 h-10 w-12 rounded-md border text-center font-semibold" value={book.quantity} readOnly/>
                      <button type="button" className="text-[20px] font-semibold" onClick={() => handleIncrement(book.id)}>+</button>
                      <button className="text-[#e74040] flex ml-5 items-center gap-2" onClick={() => removeItem(book.id)}><Trash color="#e74040"/> Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
            :
          <h1>Not Found</h1>
        }
          </div>
        </div>

        <div className="flex flex-col justify-center items-start w-full max-w-[500px]">
          <h1 className="text-2xl font-semibold mt-[170px] mb-8 border-b-2 pb-[20px] px-[25px] w-full">Price Details</h1>
          <div className="mb-8 border-b-2 border-dashed pb-[25px] px-[20px] w-full text-[19px] space-y-5">
            <div className=" flex justify-between items-center w-full">
              <p>Price ({cartTotalItems} items)</p>
              <p>₹ {cartTotalPrice}</p>
            </div>
            <div className=" flex justify-between items-center w-full">
              <p>Delivery Price</p>
              <p className=" text-green-700">Free</p>
            </div>
          </div>
          <div className=" flex justify-between items-center w-full px-[20px] text-[22px] mb-8 border-b-2 pb-[20px] border-dashed">
            <p>Total Amount</p>
            <p>₹ {cartTotalPrice}</p>
          </div>
          {
            user ? <BuyNowModal addressInfo={addressInfo} setAddressInfo={setAddressInfo} buyNow={buyNow}/> : <Navigate to={'/login'}/>
          }
        </div>
      </div>
    </Layout>
  )
}
