import { Link } from "react-router-dom";

export default function Login() {

  const inputClass = "bg-white border-gray-300 outline-none border-2 px-[14px] py-[12px] text-[20px] rounded-lg w-full focus:border-black focus:ring-1 focus:ring-black transition duration-200";

  return (
    <div className="h-screen flex justify-center items-center bg-[#fff49e]">
      <div className="h-auto w-[500px] bg-white shadow-lg flex flex-col justify-center items-center rounded-[30px] border-gray-300 border-2 p-10">
        <h1 className="text-[36px] font-bold text-gray-700 mb-8">Login</h1>
        <div className="w-full mb-8 flex flex-col gap-6">
          <input type="email" placeholder="Email Address" className={inputClass} />
          <input type="password" placeholder="Password" className={inputClass} />
        </div>
        <button className="w-full border-2 text-white bg-black px-8 py-4 hover:bg-white hover:text-black hover:border-black text-lg font-semibold rounded-lg transition duration-300">Login</button>
        <p className="mt-6 text-gray-700 text-[18px]">Don't have an account ? <Link to='/signup' className="text-black hover:underline cursor-pointer"> Sign Up </Link></p>
      </div>
    </div>
  );
}
