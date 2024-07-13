import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Loader from '../../components/loader/Loader'

export default function Login() {

  const { loading, setLoading } = useContext(MyContext);
  const navigate = useNavigate();
  const [ userLogin, setUserLogin ] = useState({
    email: "",
    password: "",
  });

  async function userLoginHandler () {

    if(userLogin.email === "" || userLogin.password === "")
      return toast.error("All fields are required");

    setLoading(true);
    
    try {
      
      const users = await signInWithEmailAndPassword( auth, userLogin.email, userLogin.password);
      console.log(users.user);

      try {
        const q = query(
          collection(fireDB, "user"),
          where('uid', '==', users?.user?.uid)
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => user = doc.data());
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          })
          toast.success("Login Successfully");
          setLoading(false);

          if(user.role === 'user'){
            navigate('/user-dashboard');
          } else{
            navigate('/admin-dashboard');
          } 
        })

        return () => data;

      } catch (error) {
        console.log(error);
        setLoading(false);
      }

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function handleChange(event){
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    })
  }

  const inputClass = "bg-white border-gray-300 outline-none border-2 px-[14px] py-[12px] text-[20px] rounded-lg w-full focus:border-black focus:ring-1 focus:ring-black transition duration-200";

  return (
    <div className="h-screen flex justify-center items-center bg-[#fff49e]">
      {loading && <Loader />}
      <div className="h-auto w-[500px] bg-white shadow-lg flex flex-col justify-center items-center rounded-[30px] border-gray-300 border-2 p-10">
        <h1 className="text-[36px] font-bold text-gray-700 mb-8">Login</h1>
        <div className="w-full mb-8 flex flex-col gap-6">
          <input type="email" placeholder="Email Address" className={inputClass} name="email" onChange={handleChange} value={userLogin.email}/>
          <input type="password" placeholder="Password" className={inputClass} name="password" onChange={handleChange} value={userLogin.password}/>
        </div>
        <button onClick={userLoginHandler} className="w-full border-2 text-white bg-black px-8 py-4 hover:bg-white hover:text-black hover:border-black text-lg font-semibold rounded-lg transition duration-300">Login</button>
        <p className="mt-6 text-gray-700 text-[18px]">Don't have an account ? <Link to='/signup' className="text-black hover:underline cursor-pointer"> Sign Up </Link></p>
      </div>
    </div>
  );
}
