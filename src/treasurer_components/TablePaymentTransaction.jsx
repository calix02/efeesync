import { useState, useMemo } from "react";
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  payments   – array of { id, name, yearSection }
 */
function TablePaymentTransaction({ viewProof, payments = [], code }) {
  const animate = "card-In";
  /* --------------------------------- colors -------------------------------- */
    const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#020180]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
    COT: "border-[#847714] text-[#847714] bg-[#847714]",
    ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
    SSC: "border-[#174515] text-[#174515] bg[#174515]",
  };

  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";
  const hoverColors = {
            CIT: " hover:bg-[#621668]",
            COE: "hover:bg-[#020180]",
            COC: "hover:bg-[#660A0A]",
            COT: "hover:bg-[#847714]",
            ESAF: "hover:bg-[#6F3306]",
            SSC: "hover:bg-[#174515]"
        };
  const hoverColor = hoverColors[code] || "hover:bg-[#174515]";




  /* ---------------------------- sample fallback ---------------------------- */
  const fallback = Array.from({ length: 7 }, (_, i) => ({
    studID: `22-1031`,
    studName: `Jaspher Yummy`,
    amount : `400`,
    date: `06/05/2025`
    
  }));

  const data = payments.length ? payments : fallback;
  

    const[status, setStatus] = useState("Pending");
    const[selectedIndex, setSelectedIndex] = useState(null);


  const clickedApprove = () =>{
        setStatus("Approved")
    
  }
  const clickedReject = () =>{
    setStatus("Rejected");
  }
  
  


  /* -------------------------------- render --------------------------------- */
  return (
  
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      {/* table wrapper */}
      <div className="lg:ml-70 bg-white font-[family-name:Arial] lg:text-sm text-xs text-black flex-grow lg:p-5 p-2 mt-3 rounded-lg shadow-[2px_2px_2px_grey]">
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] bg-[#fff0] ${color}`}>
              <th className="hidden lg:block">Student ID</th>
              <th>Student Name</th>
              <th>Amount</th>
              <th className="hidden lg:block">Date</th>
              <th>Screenshot</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td className="hidden lg:block">{s.studID}</td>
                <td>{s.studName}</td>
                <td>{s.amount}</td>
                <td className="hidden lg:block py-4">{s.date}</td>
                <td >
                    <button onClick={() =>viewProof(s)} className={` ${color} ${hoverColor} bg-white  gap-1 lg:px-5 md:px-5 px-1 py-1 border-1 lg:text-sm text-xs  hover:text-white transition duration-200 cursor-pointer rounded-lg`}>
                      <i className="fa-regular fa-eye"></i>View
                    </button>

                </td>
                <td>
                    <span className={`lg:px-5 md:px-5 px-1 border-1 text-black py-1.5 rounded-md 
                      ${status === "Approved"? "bg-[#66a810a1]" : 
                      status === "Pending" ? "bg-[#eab20886]" : 
                      status === "Rejected"? "bg-[#de0004ac]" : "" }`}>{status}
                    </span>
                </td>
                <td className="flex lg:flex-row flex-col gap-2 text-lg justify-center py-3">
                  <i onClick={clickedApprove} className="fa-solid fa-circle-check cursor-pointer text-[#70B914]"></i>
                  <i onClick={clickedReject}  className="fa-solid fa-circle-xmark cursor-pointer text-[#DE0004]"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* pagination controls */}
        <div className={`relative ${color} bg-[#fff0] lg:ml-70 mt-[-10px] flex flex-col-reverse justify-center items-center`}>
            <p className=' lg:absolute left-9'>Showing of 600</p>  
        <span className="flex">
             <button
            className=" mx-1  cursor-pointer flex items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>

          </button>

            <button className={` ${color} px-2 mx-1 cursor-pointer rounded-md border text-white`}>1</button>
          <button  className=" mx-1  cursor-pointer flex items-center rounded-md border disabled:opacity-40">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </span>
        </div>
    </div>
   
  );
}
export default TablePaymentTransaction;
