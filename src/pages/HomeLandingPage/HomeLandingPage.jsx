import { Search } from "lucide-react";
import homeImage from "./Images/james-barker-RKK_nvoOJ6Y-unsplash.jpg";
import Carousel from "../../components/CarouselSlider/CarouselSlider";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import MyContext from "../../context/MyContext";

export default function HomeLandingPage() {

  const searchedBook = useRef("");
  const { getAllProduct } = useContext(MyContext);
  const navigate = useNavigate();

  function handleClick() {
    const Book = getAllProduct.find((book) => book.bookName.toLowerCase() === searchedBook.current.value.toLowerCase());
    navigate(`/${Book.id}`);
  }


  return (
    <div className=" m-[30px] flex justify-center items-center flex-col">
      <div className=" w-100 flex items-center justify-center relative mb-[10px]">
        <h1 className=" text-[60px] font-extrabold"><Link to='/'>Epic<span className=" text-[#EE964B]">Reads</span></Link></h1>
        <span className=" text-[20px] font-medium absolute right-[-700px] hover:underline hover:decoration-solid hover:text-[#EE964B] "><Link to="/login">LogIn / SignUp</Link></span>
      </div>
      <div className=" flex justify-between items-center w-[80%] my-[50px] mx-[100px]">
        <div>
          <p className=" text-[70px] w-[800px] font-[1000]">
            <span className=" text-[#EE964B]">Book Haven:</span>Your Gateway to Literary Treasures
          </p>
          <div className="mt-[40px] flex space-x-5">
            <input
              type="text"
              placeholder="Search"
              ref={searchedBook}
              className="p-4 px-10 w-[80%] bg-gray-100 border border-gray-300 rounded-[40px] focus:outline-none focus:ring-2 focus:ring-[#EE964B] text-[25px]"
            />
            <button
                onClick={handleClick}
                className="bg-[#EE964B] p-4 h-[80px] w-[80px] rounded-[60px] flex items-center justify-center"
            >
              <Search size={32} color="#ffffff" />
            </button>
          </div>
        </div>
        <div>
          <img className=" w-[600px] rounded-[50px]" src={homeImage} />
        </div>
      </div>
      <Carousel/>
    </div>
  )
}
