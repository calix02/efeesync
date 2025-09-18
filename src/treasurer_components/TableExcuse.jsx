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
  const textColor =
    code === "cit" ? "text-[#4F1C51]"
    : code === "coe" ? "text-[#0E2148]"
    : code === "coc" ? "text-[#3A0519]"
    : code === "cot" ? "text-[#FFD95F]"
    : code === "eap" ? "text-[#4B352A]"
    : code === "osas" ? "text-[#27391C]"
    : "text-blue";


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
            <tr className={`border-b-2 border-[#adadad] ${textColor}`}>
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
                  <button onClick={viewLetter} className="bg-white py-1 flex items-center gap-1 justify-center lg:px-5 md:px-5 px-2  border-1 text-sm cursor-pointer hover:bg-[#621668] hover:text-white transition duration-200 border-[#621668] text-[#621668] rounded-md"><i className="fa-regular fa-eye"></i>Letter</button>
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
        <div className=" relative lg:ml-70 font-[family-name:Arial] lg:text-sm text-xs mt-[-10px] flex flex-col-reverse justify-center items-center">
            <p className='text-[#8A2791] lg:absolute left-9'>Showing of 600</p>  
        <span className="flex">
             <button
            className=" mx-1 flex items-center rounded-md cursor-pointer  border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>

          </button>

            <button className={`px-2 mx-1 rounded-md bg-[#621668] text-white border cursor-pointer`}>1</button>

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
