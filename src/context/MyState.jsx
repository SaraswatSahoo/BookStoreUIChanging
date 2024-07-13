import { useEffect, useState } from "react";
import MyContext from "./MyContext";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { fireDB } from '../firebase/FirebaseConfig';

export default function MyState({children}) {

  const [loading, setLoading] = useState(false);
  const [getAllProduct, setGetAllProduct] = useState([]);

  async function getAllProductHandler() {

    setLoading(true);

    try {

      const q = query(
        collection(fireDB, "product"),
        orderBy('time')
      );

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProduct(productArray);
        setLoading(false);
      });

      return () => data(); 

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProductHandler();
  }, []);

  return (
    <MyContext.Provider value={{ loading, setLoading, getAllProduct, getAllProductHandler }}>
      {children}
    </MyContext.Provider>
  )
}
