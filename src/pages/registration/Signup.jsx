import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

export default function Signup() {

  const { loading, setLoading } = useContext(MyContext);
  const navigate = useNavigate();
  const [ userSignup, setUserSignup ] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  async function userSignUpHandler () {

    if( userSignup.name == "" || userSignup.email == "" || userSignup.password == "")
      return toast.error("All fields are required");

    setLoading(true);

    try {

      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
      };

      const userReference = collection( fireDB, "user");
      addDoc(userReference, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      })

      toast.success("Signup Successfully");
      setLoading(false);
      navigate('/login');
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function handleChange(event){
    setUserSignup({
      ...userSignup,
      [event.target.name]: event.target.value,
    })
  }

  const inputClass = "bg-white border-gray-300 outline-none border-2 px-[14px] py-[12px] text-[20px] rounded-lg w-full focus:border-black focus:ring-1 focus:ring-black transition duration-200";

  return (
    <div className="h-screen flex justify-center items-center bg-[#fff49e]">
      {loading && <Loader />}
      <div className="h-auto w-[500px] bg-white shadow-lg flex flex-col justify-center items-center rounded-[30px] border-gray-300 border-2 p-10">
        <h1 className="text-[36px] font-bold text-gray-700 mb-8">Sign Up</h1>
        <div className="w-full mb-8 flex flex-col gap-6">
          <input type="text" placeholder="Full Name" className={inputClass} value={userSignup.name} name="name" onChange={handleChange}/>
          <input type="email" placeholder="Email" className={inputClass} value={userSignup.email} name="email" onChange={handleChange}/>
          <input type="password" placeholder="Password" className={inputClass} value={userSignup.password} name="password" onChange={handleChange}/>
        </div>
        <button onClick={userSignUpHandler} className="w-full border-2 text-white bg-black px-8 py-4 hover:bg-white hover:text-black hover:border-black text-lg font-semibold rounded-lg transition duration-300">Sign Up</button>
        <p className="mt-6 text-gray-700 text-[18px]">Have an account ? <Link to='/login' className="text-black hover:underline cursor-pointer"> Login </Link></p>
      </div>
    </div>
  );
}
