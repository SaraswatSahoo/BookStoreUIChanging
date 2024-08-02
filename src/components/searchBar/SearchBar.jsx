import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";

export default function SearchBar() {

  const [ search, setSearch ]=useState("");
  const navigate = useNavigate();
  const { getAllProduct } = useContext(MyContext);

  function navigateHandler(ID){
    navigate(`/${ID}`);
    setSearch("");
  }

  function searchBookHandler(event){
    setSearch(event.target.value.toLowerCase());
  }


  const searchedBook = getAllProduct.filter((book) => book.bookName.toLowerCase().includes(search)).slice(0,8);

  return (
    <>
      <div>
        <input 
          className=" h-[46px] w-[900px] rounded-[10px] outline-none px-[10px] text-center text-[20px] font-semibold" 
          placeholder=" Search Your Book ..."
          onChange={searchBookHandler}
          value={search}
        />
        <div className=" flex justify-center">
          {search && <div className=" bg-gray-200 w-[870px] my-1 rounded-[10px] p-2 absolute">
            {searchedBook.length > 0 ? <div className=" px-2 py-2">
              {searchedBook.map((book,index) => {
                return(
                  <div key={index} onClick={() => {navigateHandler(book.id)}} className=" flex gap-3 text-[25px] items-center p-2 cursor-pointer">
                    <img src={book.bookImageURL} alt="" className="w-10"/>
                    {book.bookName}
                  </div>
                ) 
              })}
            </div>
              : 
            <div className=" flex gap-3 text-[20px] items-center p-2 text-gray-800">
              <img className='w-14' src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"/>
              Book not Listed !!!
            </div>
            }  
          </div>}
        </div>
        
      </div>
    </>
    
  )
}
