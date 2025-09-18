import { useState, useMemo } from "react";
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  communityService   – array of { id, name, yearSection }
 */
function TableCommunityService({ code = "cit", communityService = [] }) {
  const animate = "card-In";
  /* --------------------------------- colors -------------------------------- */
  const colors = {
        CIT: "border-[#621668] text-[#621668] bg-[#621668]",
        COE: "border-[#020180] text-[#020180] bg-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COT: "border-[#847714] text-[#847714] bg-[#847714]",
        SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg-[#174515]"
      };
      const color = colors[code] || "border-black text-black";


  /* ---------------------------- sample fallback ---------------------------- */
  const fallback = Array.from({ length: 5 }, (_, i) => ({
    studID: `22-1034`,
    studName: `Jaspher Yummy`,
    yearSection: `3A`,
    eventName: `IT Night`,

  }));

  const data = communityService.length ? communityService : fallback;
  
  return (
  
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      <div className={`lg:ml-70 font-[family-name:Arial] lg:text-sm  text-xs bg-white text-black flex-grow p-5  mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 bg-white border-[#adadad] ${color}`}>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Year &amp; Section</th>
              <th>Event Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td>{s.studID}</td>
                <td>{s.studName}</td>
                <td>{s.yearSection}</td>
                <td>{s.eventName}</td>

                <td className="flex lg:flex-row flex-col gap-2 justify-center py-2">
                  <span className="material-symbols-outlined cursor-pointer text-[#65A810] bg-white  shadow-[2px_2px_1px_grey] rounded-sm border border-[#65A810] px-1">
                    done_outline
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <div className=" relative lg:ml-70 font-[family-name: Arial] lg:text-sm text-xs mt-[-10px] flex flex-col-reverse justify-center items-center">
            <p className='text-[#8A2791] lg:absolute left-9'>Showing of 600</p>  
        <span className="flex">
             <button
            className=" mx-1 flex items-center cursor-pointer rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>

          </button>

            <button
              className={` ${color} px-2 mx-1 rounded-md border cursor-pointer text-white`}>1
            </button>

          <button
           className=" mx-1 flex items-center cursor-pointer rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_right</span>

          </button>
        </span>
        </div>
    </div>
   
  );
}


export default TableCommunityService;
