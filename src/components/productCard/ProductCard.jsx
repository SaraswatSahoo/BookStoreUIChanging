import { useNavigate } from "react-router-dom";

export default function ProductCard({ BookID, BookImg, BookTitle, BookAuthor, BookPrice, BookButton }) {

  const navigate = useNavigate();

  function navigateHandler (ID){
    navigate(`/${ID}`);
  }

  return (
    <div className="w-[340px] min-h-[600px] flex flex-col justify-center items-center bg-white shadow-md p-6 rounded-lg">
      <img onClick={() => navigateHandler(BookID)} src={BookImg} className="w-[300px] h-[450px] object-cover mb-4 rounded-md" />
      <p className="text-[20px] font-medium text-center mb-2">{BookTitle}</p>
      <p className="text-[17px] text-blue-700 text-center mb-2">{BookAuthor}</p>
      <p className="text-gray-800 text-center text-[20px] mb-4">₹ {BookPrice}</p>
      { BookButton }
    </div>
  );
}
