import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Loader from '../../components/loader/Loader'
import './img.css';
import { GoogleAuthProvider } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login() {

  const { loading, setLoading } = useContext(MyContext);
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const googleProvider = new GoogleAuthProvider();

  async function verifyUserAndNavigate(user) {
    try {
      const userQuery = query(
        collection(fireDB, "user"),
        where("email", "==", user.email)
      );

      // Set up real-time listener
      const unsubscribe = onSnapshot(userQuery, (snapshot) => {
        if (!snapshot.empty) {
          let userData;
          snapshot.forEach(doc => {
            userData = doc.data();
          });

          // Store user data in local storage
          localStorage.setItem("users", JSON.stringify(userData));

          // Navigate based on user role
          if (userData.role === "user") {
            navigate('/user-dashboard');
          } else {
            navigate('/admin-dashboard');
          }

          toast.success("Login Successfully");
        } else {
          // If user does not exist, prompt them to sign up
          toast.error("User not found in the database. Please sign up.");
          navigate('/signup');
        }
        setLoading(false); // Stop loading spinner after data check
      });

      // Clean up the listener on component unmount
      return () => unsubscribe();

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Use the refactored function
      await verifyUserAndNavigate(user);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function userLoginHandler() {
    if (userLogin.email === "" || userLogin.password === "")
      return toast.error("All fields are required");

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
      const user = userCredential.user;

      // Use the refactored function
      await verifyUserAndNavigate(user);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function handleChange(event) {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  }

  const inputClass = "bg-white border-gray-300 outline-none border-2 px-[14px] py-[8px] am:py-[12px] text-[15px] sm:text-[20px] rounded-lg w-full focus:border-black focus:ring-1 focus:ring-black transition duration-200";

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#EE964B]">
      <h1 className="text-[30px] sm:text-[60px] font-extrabold text-black mt-[-100px] sm:mt-3"><Link to='/'>Epic<span className="text-white">Reads</span></Link></h1>
      {loading && <Loader />}
      <div className="container bg-cover sm:bg-contain flex justify-center items-center w-[95%] sm:w-[100%] sm:h-[90vh] rounded-[50px] mt-[10px]">
        <div className="h-[380px] sm:h-[500px] w-[300px] sm:w-[500px] bg-white shadow-lg flex flex-col justify-center items-center rounded-[30px] border-gray-300 border-2 p-10 mb-[150px] sm:mb-[200px] mt-[20px]">
          <h1 className="text-[20px] sm:text-[36px] font-bold text-gray-700 mb-2 sm:mb-8">Login</h1>
          <div className="w-full mb-3 sm:mb-8 flex flex-col gap-2 sm:gap-6">
            <input type="email" placeholder="Email Address" className={inputClass} name="email" onChange={handleChange} value={userLogin.email} />
            <input type="password" placeholder="Password" className={inputClass} name="password" onChange={handleChange} value={userLogin.password} />
          </div>
          <button onClick={userLoginHandler} className="w-full border-2 text-white bg-black px-8 py-2 sm:py-4 hover:bg-white hover:text-black hover:border-black text-[15px] sm:text-lg font-semibold rounded-lg transition duration-300">Login</button>
          <div className="mt-5">
            <button className="text-[15px] sm:text-[20px] border-solid border-black border-[2px] px-8 py-2 rounded-[20px] hover:bg-[#9d9fa1] hover:border-[#9d9fa1] transition-all duration-100" onClick={signInWithGoogle}>
              <FontAwesomeIcon icon={faGoogle} className="mr-3" />
              Login with google
            </button>
          </div>
          <p className="mt-3 sm:mt-6 text-gray-700 text-[14px] sm:text-[18px]">Don't have an account? <Link to='/signup' className="text-black hover:underline cursor-pointer"> Sign Up </Link></p>
        </div>
      </div>
    </div>
  );
}
