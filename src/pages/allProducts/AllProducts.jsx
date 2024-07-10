import Layout from '../../components/layout/Layout.jsx';
import ProductCard from '../../components/productCard/ProductCard.jsx'
import DUMMY_DATA from "../../DUMMY_DATA/DUMMY_DATA";

export default function AllProducts() {
  return (
    <Layout>
    <div className="">
      <h1 className=" text-center text-[40px] font-semibold mt-10">All Products</h1>
    </div>
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-4 gap-20 p-20">
        {DUMMY_DATA.map((book) => (
          <ProductCard
            key={book.id}
            BookID={book.id}
            BookImg={book.img}
            BookTitle={book.name}
            BookAuthor={book.author}
            BookPrice={book.price}
          />
        ))}
      </div>
    </div>
    </Layout>
    
  );
}
