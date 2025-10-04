import { useState, useMemo } from "react";
import "../animate.css";


/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  communityService   – array of { id, name, yearSection }
 */
function TableCommunityService({ code , communityService = [],done, paginate, fetchComservData}) {
  const animate = "card-In";
  /* --------------------------------- colors -------------------------------- */
  const colors = {
        CIT: "border-[#621668] text-[#621668] bg-[#621668]",
        COE: "border-[#020180] text-[#020180] bg-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COT: "border-[#847714] text-[#847714] bg-[#847714]",
        ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg-[#174515]"
      };
      const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";


  /* ---------------------------- sample fallback ---------------------------- */
  const fallback = [];

  const data = communityService.length ? communityService : fallback;
  
  return (
  
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      <div className={`lg:ml-70 ${color} font-[family-name:Arial] lg:text-sm  text-xs bg-white text-black flex-grow p-5  mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 bg-white border-[#adadad] ${color}`}>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Year &amp; Section</th>
              <th>Event Name</th>
              <th>Absence Count</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td>{s.student_number_id}</td>
                <td>{s.student_full_name}</td>
                <td>{s.student_section}</td>
                <td>{s.event_name}</td>
                <td>{s.absences}</td>

                <td className="flex lg:flex-row flex-col gap-2 justify-center py-3">
                  <button disabled={s.done} onClick={() => done(s)} className=" disabled:border-[#353535] disabled:text-[#353535] disabled:hover:bg-[#fff0] disabled:scale-100 disabled:cursor-default px-2 py-1 border border-[#1a6718] text-[#1a6718] rounded-md cursor-pointer hover:bg-[#1a6718] hover:text-white  transition duration-300 hover:scale-105">Done</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <div className={` ${color} bg-[#fff0] relative lg:ml-70 font-[family-name: Arial] lg:text-sm text-xs mt-[-10px] flex flex-col-reverse justify-center items-center`}>
          <div className="mt-4 flex justify-center gap-2 items-center">
            <button
              onClick={() => fetchComservData(paginate.page - 1)}
              disabled={paginate.page <= 1}
              className="cursor-pointer border rounded disabled:opacity-40 p-1"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <span className="px-3">
              Page {paginate.page} of {paginate.total_pages}
            </span>

            <button
              onClick={() => fetchComservData(paginate.page + 1)}
              disabled={paginate.page >= paginate.total_pages}
              className="cursor-pointer border rounded disabled:opacity-40 p-1"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
    </div>
   
  );
}


export default TableCommunityService;
