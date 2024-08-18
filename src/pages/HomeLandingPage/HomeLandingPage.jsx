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
    <div className=" h-full w-full my-[30px] flex justify-center items-center flex-col">
      <div className=" w-full flex items-center justify-between mb-[10px]">
        <h1 className=" text-[25px] sm:text-[60px] font-extrabold ml-[25px] sm:ml-[70px]"><Link to='/'>Epic<span className=" text-[#EE964B]">Reads</span></Link></h1>
        <span className=" text-[12px] sm:text-[25px] font-medium px-[10px] sm:px-[15px] py-[2px] sm:py-[5px] rounded-[25px] hover:bg-[#EE964B] hover:text-white transition-all duration-100 mr-[25px] sm:mr-[70px] border-solid border-[2px] border-[#EE964B]"><Link to="/login">Login / SignUp</Link></span>
      </div>
      <div className=" flex flex-col sm:flex-row justify-between items-center w-[80%] my-[10px] sm:my-[50px] mx-[100px]">
        <div>
          <img className=" w-[300px] sm:w-[600px] rounded-[20px] sm:rounded-[50px]" src={homeImage} />
        </div>
        <div className=" flex flex-col justify-center items-center ">
          <p className=" text-[30px] sm:text-[70px] w-[300px] sm:w-[800px] font-[1000] my-[20px] text-center">
            <span className=" text-[#EE964B]">Book Haven:</span>Your Gateway to Literary Treasures
          </p>
          <div className=" mt-[10px] sm:mt-[40px] flex space-x-2 sm:space-x-5 w-full">
            <input
              type="text"
              placeholder="Search"
              ref={searchedBook}
              className="p-4 px-10 w-[80%] h-[50px] sm:h-[80px] bg-gray-100 border border-gray-300 rounded-[40px] focus:outline-none focus:ring-2 focus:ring-[#EE964B] text-[15px] sm:text-[25px]"
            />
            <button
                onClick={handleClick}
                className="bg-[#EE964B] p-4 h-[50px] sm:h-[80px] w-[50px] sm:w-[80px] rounded-[25px] sm:rounded-[60px] flex items-center justify-center"
            >
              <Search size={32} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>
      <Carousel/>
    </div>
  )
}
