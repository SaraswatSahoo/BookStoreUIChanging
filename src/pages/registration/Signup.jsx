import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import './img.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Signup() {

  const { loading, setLoading } = useContext(MyContext);
  const navigate = useNavigate();
  const [ userSignup, setUserSignup ] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const googleProvider = new GoogleAuthProvider();

  function createUserInDataBase(users){
    const user = {
      name: users.displayName,
      email: users.email,
      uid: users.uid,
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
  }

  async function signInWithGoogle() {

    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const users = result.user;

      const userReference = collection(fireDB, "user");
      const querySnapshot = await getDocs(query(userReference, where("email", "==", users.email)));

      if (!querySnapshot.empty) {
        toast.error("Email is already registered. Please log in.");
        setLoading(false);
        navigate('/login');
        return;
      }

      createUserInDataBase(users);
      toast.success("Signup Successfully");
      setLoading(false);
      navigate('/login');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setUserSignup({
        name: "",
        email: "",
        password: "",
      })
    }
  }

  async function userSignUpHandler () {

    if( userSignup.name == "" || userSignup.email == "" || userSignup.password == "")
      return toast.error("All fields are required");

    setLoading(true);

    try {

      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);
      const user = users.user;
      user.displayName = userSignup.name;
      user.email = userSignup.email;
      createUserInDataBase(user);

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

  const inputClass = "bg-white border-gray-300 outline-none border-2 px-[14px] py-[8px] am:py-[12px] text-[15px] sm:text-[20px] rounded-lg w-full focus:border-black focus:ring-1 focus:ring-black transition duration-200";

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center bg-[#EE964B]">
      <h1 className=" text-[30px] sm:text-[60px] font-extrabold text-black mt-[-100px] sm:mt-3"><Link to='/'>Epic<span className=" text-white">Reads</span></Link></h1>
      {loading && <Loader />}
      <div className="container bg-cover sm:bg-contain flex justify-center items-center w-[95%] sm:w-[100%] sm:h-[90vh] rounded-[50px] mt-[10px]">
        <div className=" h-[380px] sm:h-[600px] w-[300px] sm:w-[500px] bg-white shadow-lg flex flex-col justify-center items-center rounded-[30px] border-gray-300 border-2 p-10 mb-[150px] sm:mb-[200px] mt-[20px]">
          <h1 className=" text-[20px] sm:text-[36px] font-bold text-gray-700 mb-2 sm:mb-8">Sign Up</h1>
          <div className="w-full mb-3 sm:mb-8 flex flex-col gap-2 sm:gap-6">
            <input type="text" placeholder="Full Name" className={inputClass} value={userSignup.name} name="name" onChange={handleChange}/>
            <input type="email" placeholder="Email" className={inputClass} value={userSignup.email} name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" className={inputClass} value={userSignup.password} name="password" onChange={handleChange}/>
          </div>
          <button onClick={userSignUpHandler} className="w-full border-2 text-white bg-black px-8 py-2 sm:py-4 hover:bg-white hover:text-black hover:border-black text-[15px] sm:text-lg font-semibold rounded-lg transition duration-300">Sign Up</button>
          <div className=" mt-5">
            <button className=" text-[14px] sm:text-[20px] border-solid border-black border-[2px] px-8 py-2 rounded-[20px] hover:bg-[#9d9fa1] hover:border-[#9d9fa1] transition-all duration-100" onClick={signInWithGoogle}>
              <FontAwesomeIcon icon={faGoogle} className=" mr-3"/>
              SignUp with google
            </button>
          </div>
          <p className=" mt-3 sm:mt-6 text-gray-700 text-[14px] sm:text-[18px]">Have an account ? <Link to='/login' className="text-black hover:underline cursor-pointer"> Login </Link></p>
        </div>
      </div>
    </div>
  );
}
