import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyContext from "../../context/MyContext"
import { Timestamp, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader"
import { fireDB } from "../../firebase/FirebaseConfig";

export default function UpdateProductPage() {

  const { loading, setLoading, getAllProductHandler } = useContext(MyContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [ product, setProduct ] = useState({
    bookName: "",
    bookPrice: "",
    bookAuthor: "",
    bookImageURL: "",
    genre: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });

  async function getSingleProductHandler(){

    setLoading(true);

    try {
      const productTemp = await getDoc(doc(fireDB, "product", id));
      const product = productTemp.data();
      setProduct({
        bookName: product?.bookName,
        bookPrice: product?.bookPrice,
        bookAuthor: product?.bookAuthor,
        bookImageURL: product?.bookImageURL,
        genre: product?.genre,
        description: product?.description,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date
      })
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
      getSingleProductHandler();
  }, []);

  async function updateProduct() {
    setLoading(true)
    try {
        await setDoc(doc(fireDB, 'product', id), product)
        toast.success("Product Updated successfully")
        getAllProductHandler();
        setLoading(false);
        navigate('/admin-dashboard')
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
  }

  function handleChange(event){
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    })
  }

  const inputClass = "bg-white border-gray-300 outline-none border-2 px-[14px] py-[12px] text-[20px] rounded-lg w-full focus:border-black focus:ring-1 focus:ring-black transition duration-200";
  const genreList = [
    { name: "Fiction" },
    { name: "Non-Fiction" },
    { name: "Horror" },
    { name: "Thriller" },
    { name: "Academic" },
    { name: "Mystery" },
    { name: "Science Fiction" },
  ];

  const selectClass = `${inputClass} appearance-none`;

  return (
    <div className="h-screen flex justify-center items-center bg-[#fff49e]">
      {loading && <Loader />}
      <div className="h-auto w-[500px] bg-white shadow-lg flex flex-col justify-center items-center rounded-[30px] border-gray-300 border-2 p-10">
        <h1 className="text-[36px] font-bold text-gray-700 mb-8">Update Product</h1>
        <div className="w-full mb-8 flex flex-col gap-6">
          <input type="text" placeholder="Book Name" className={inputClass} name="bookName" value={product.bookName} onChange={handleChange}/>
          <input type="text" placeholder="Book Author" className={inputClass} name="bookAuthor" value={product.bookAuthor} onChange={handleChange}/>
          <input type="number" placeholder="Book Price" className={inputClass} name="bookPrice" value={product.bookPrice} onChange={handleChange}/>
          <input type="text" placeholder="Book Image URL" className={inputClass} name="bookImageURL" value={product.bookImageURL} onChange={handleChange}/>
          <div className="relative w-full">
            <select className={selectClass} defaultValue="" name="genre" value={product.genre} onChange={handleChange}>
              <option value="" disabled>Select Book Genre</option>
              {genreList.map((value, index) => {
                const { name } = value;
                return (
                  <option className="first-letter:uppercase" key={index} value={name}>{name}</option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z"/></svg>
            </div>
          </div>
          <textarea placeholder="Book Description" rows="5" className={inputClass} name="description" value={product.description} onChange={handleChange}></textarea>
        </div>
        <button onClick={updateProduct} className="w-full border-2 text-white bg-black px-8 py-4 hover:bg-white hover:text-black hover:border-black text-lg font-semibold rounded-lg transition duration-300">Update Product</button>
      </div>
    </div>
  );
}
