import Layout from '../../components/layout/Layout.jsx';
import ProductCard from '../../components/productCard/ProductCard.jsx'
import { useContext } from 'react';
import MyContext from '../../context/MyContext.jsx';

export default function AllProducts() {

  const { getAllProduct } = useContext(MyContext);

  return (
    <Layout>
    <div className="">
      <h1 className=" text-center text-[40px] font-semibold mt-10">All Products</h1>
    </div>
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-4 gap-20 p-20">
        {getAllProduct.map((book,index) => (
          <ProductCard
            key={index}
            BookID={book.id}
            BookImg={book.bookImageURL}
            BookTitle={book.bookName}
            BookAuthor={`book.author`}
            BookPrice={book.bookPrice}
          />
        ))}
      </div>
    </div>
    </Layout>
    
  );
}
