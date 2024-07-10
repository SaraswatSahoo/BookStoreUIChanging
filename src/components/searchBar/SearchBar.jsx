import { useState } from "react";
import DUMMY_DATA from '../../DUMMY_DATA/DUMMY_DATA'
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

  const [ search, setSearch ]=useState("");
  const navigate = useNavigate();

  function navigateHandler(ID){
    navigate(`/${ID}`);
  }

  function searchBookHandler(event){
    setSearch(event.target.value.toLowerCase());
  }

  const searchedBook = DUMMY_DATA.filter((book) => book.name.toLowerCase().includes(search)).slice(0,8);

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
              {searchedBook.map((book) => {
                return(
                  <div onClick={() => {navigateHandler(book.id)}} className=" flex gap-3 text-[25px] items-center p-2 cursor-pointer">
                    <img src={book.img} alt="" className="w-10"/>
                    {book.name}
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
