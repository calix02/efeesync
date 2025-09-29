import { useState, useMemo } from "react";
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  excuses   – array of { id, name, yearSection }
 */
function TableExcuse({ code = "cit", excuses = [], viewLetter }) {
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
  const fallback = Array.from({ length: 5 }, (_, i) => ({
    studID: `22-1034`,
    studName: `Jaspher Yummy`,
    yearSection: `3A`,
    eventName: `IT Night`,
    date: `06/05/2025`
    
  }));

  const data = excuses.length ? excuses : fallback;
  


  return (
  
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      {/* table wrapper */}
      <div className="lg:ml-70 bg-white text-black font-[family-name:Arial] lg:text-sm text-xs flex-grow p-5  mt-3 rounded-lg shadow-[2px_2px_2px_grey]">
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] bg-white ${color}`}>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Year &amp; Section</th>
              <th>Event Name</th>
              <th>Date</th>
              <th>Preview Letter</th>
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
                <td>{s.date}</td>
                <td className="flex justify-center py-3" >
                  <button onClick={viewLetter} className={`bg-white ${hoverColor} ${color} py-1 flex items-center gap-1 justify-center lg:px-5 md:px-5 px-2  border-1 text-sm cursor-pointer  hover:text-white transition duration-200  rounded-md`}><i className="fa-regular fa-eye"></i>Letter</button>
                </td>
                
                <td className="lg:text-lg md:text-lg text-sm">
                  <i className="fa-solid fa-circle-check cursor-pointer text-[#70B914]"></i>
                  <i className="fa-solid fa-circle-xmark cursor-pointer ml-1 text-[#DE0004]"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* pagination controls */}
        <div className={` ${color} bg-[#fff0] relative lg:ml-70 font-[family-name:Arial] lg:text-sm text-xs mt-[-10px] flex flex-col-reverse justify-center items-center`}>
            <p className={` ${color} bg-[#fff0] lg:absolute left-9`}>Showing of 600</p>  
        <span className="flex">
             <button
            className=" mx-1 flex items-center rounded-md cursor-pointer  border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>

          </button>

            <button className={`px-2 ${color} mx-1 rounded-md text-white border cursor-pointer`}>1</button>

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
export default TableExcuse;
