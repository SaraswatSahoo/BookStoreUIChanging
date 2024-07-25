import { useEffect, useState } from "react";
import MyContext from "./MyContext";
import { collection, onSnapshot, query, orderBy, QuerySnapshot, doc, deleteDoc } from "firebase/firestore";
import { fireDB } from '../firebase/FirebaseConfig';
import toast from "react-hot-toast";

export default function MyState({children}) {

  const [loading, setLoading] = useState(false);
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [getAllOrder, setGetAllOrder] = useState([]);
  const [getAllUser, setGetAllUser] = useState([]);

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

  async function getAllOrdersHandler(){
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "order"),
        orderBy("time")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];
        QuerySnapshot.forEach((doc) => {
          orderArray.push({...doc.data(), id: doc.id});
        });
        setGetAllOrder(orderArray);
        setLoading(false);
      })
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function deleteProduct(id){
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, 'order', id));
      toast.success('Order Deleted Successfully');
      getAllOrdersHandler();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function getAllUserHandler(){
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, 'user'),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id});
        });
        setGetAllUser(userArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProductHandler();
    getAllOrdersHandler();
    getAllUserHandler();
  }, []);

  return (
    <MyContext.Provider value={{ loading, setLoading, getAllProduct, getAllProductHandler, getAllOrder, deleteProduct, getAllUser }}>
      {children}
    </MyContext.Provider>
  )
}
