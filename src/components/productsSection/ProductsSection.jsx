import ProductCard from "../productCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../../context/MyContext";

export default function ProductsSection() {

  const { getAllProduct } = useContext(MyContext);

  return (
    <>
    <div className="">
      <h1 className=" text-center text-[40px] font-semibold mt-10">Bestselling Products</h1>
    </div>
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-4 gap-20 p-20">
        {getAllProduct.slice(0,8).map((book, index) => {
          const { id, bookName, bookPrice, bookImageURL } = book;
          return <ProductCard
            key={id}
            BookID={id}
            BookImg={bookImageURL}
            BookTitle={bookName}
            BookAuthor={'book.author'}
            BookPrice={bookPrice}
          />
        })}
      </div>
    </div>
    </>
    
  );
}
