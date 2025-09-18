import { useState, useMemo } from "react";
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  shifts   – array of { id, name, yearSection }
 */
function TableShifting({ code = "cit", shifts = [] }) {
  const animate = "card-In";
  /* --------------------------------- colors -------------------------------- */
 const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#621668]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#621668]",
    COT: "border-[#847714] text-[#847714] bg-[#621668]",
    SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#621668]",
    SSC: "border-[#174515] text-[#174515] bg-[#621668]",
  };
  const color = colors[code] || "border-black text-black";


  /* ---------------------------- sample fallback ---------------------------- */
  const fallback = Array.from({ length: 7 }, (_, i) => ({
    studName: `Jaspher Yummy`,
    currentProgram : `Information Technology`,
    targetProgram : `Criminology`,
    date: `06/05/2025`
    
  }));

  const data = shifts.length ? shifts : fallback;
  const[status, setStatus] = useState("Pending");
  const[selectedIndex, setSelectedIndex] = useState(null);

  const clickedApprove = () =>{
        setStatus("Approved")  
  }
  const clickedReject = () =>{
    setStatus("Rejected");
  }
  
  
  return (
  
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      <div className="lg:ml-70 bg-white text-black font-[family-name:Arial] lg:text-sm text-xs flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]">
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] bg-white ${color}`}>
              <th>Student Name</th>
              <th>Current Program</th>
              <th>Target Program</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td>{s.studName}</td>
                <td>{s.currentProgram}</td>
                <td>{s.targetProgram}</td>
                <td>{s.date}</td>
                <td >
                    <button className={`
                    ${status === "Approved" ? "bg-[#66a810a1]":
                      status === "Rejected" ? "bg-[#de0004ac]":
                      status === "Pending" ? "bg-[#eab20886]":
                      "bg-white"
                    }
                     lg:px-5 m:px-5 px-2 py-1 border-1 lg:text-sm text-xs cursor-pointer rounded-md `}>{status }</button>
                </td>
                <td className="flex lg:flex-row flex-col gap-2 text-lg justify-center py-3">
                  <i onClick={clickedApprove} className="fa-solid fa-circle-check cursor-pointer text-[#70B914]"></i>
                  <i onClick={clickedReject}  className="fa-solid fa-circle-xmark  cursor-pointer text-[#DE0004]"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* pagination controls */}
        <div className=" relative lg:ml-70 font-[family-name:Arial] lg:text-sm text-xs mt-[-10px] flex flex-col-reverse justify-center items-center">
            <p className='text-[#8A2791] lg:absolute left-9'>Showing of 600</p>  
        <span className="flex">
             <button
            className=" mx-1 flex items-center cursor-pointer rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>

          </button>

            <button
              className={` ${color} px-2 mx-1 rounded-md border cursor-pointer text-white `}>1
            </button>

          <button
           className=" mx-1 flex cursor-pointer items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_right</span>

          </button>
        </span>
        </div>
    </div>
   
  );
}


export default TableShifting;
