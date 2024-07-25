import { useContext } from "react";
import MyContext from "../../context/MyContext";

export default function UserDetails() {

  const { getAllUser } = useContext(MyContext);

  return (
    <div>
      <div className=" flex justify-between items-center">
        <h1 className=" text-[22px] font-semibold">All Users</h1>
      </div>

      <div className="w-full mt-[20px]">
        <table className="w-full text-left border-[#ffe300] border-[3px] text-[black]" >
            <tbody>

              <tr>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">S.No.</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Name</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Email</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Uid</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Role</th>
                <th className="h-12 px-6 text-md font-bold border-2 border-[#ffe300]">Date</th>
              </tr>

              {getAllUser.map((value, index) => {
                return(
                  <tr>
                    <td className="h-12 px-6 text-md border-2 border-[#ffe300]">{index + 1}.</td>
                    <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{value.name}</td>
                    <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{value.email}</td>
                    <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{value.uid}</td>
                    <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{value.role}</td>
                    <td className="h-12 px-6 text-md border-2 border-[#ffe300] first-letter:uppercase ">{value.date}</td>
                  </tr>
                )
              })}
              
            </tbody>
        </table>
      </div>

    </div>
  )
}
