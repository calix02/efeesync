import { useState, useMemo } from "react";
import "../animate.css";
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";


/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  excuses   – array of { id, name, yearSection }
 */
function TableExcuse({ code = "cit", excuses = [], viewLetter, fetchAttendanceExcuse, paginate, status, formatDateStr }) {
  const animate = "card-In";
  /* --------------------------------- colors -------------------------------- */
  const colors = {
    CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
    CESC: "border-[#020180] text-[#020180] bg-[#020180]",
    CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
    COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
    SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
    SSC: "border-[#174515] text-[#174515] bg[#174515]",
  };

  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";
  const hoverColors = {
            CITSC: " hover:bg-[#621668]",
            CESC: "hover:bg-[#020180]",
            CCSC: "hover:bg-[#660A0A]",
            COTSC: "hover:bg-[#847714]",
            SCEAP: "hover:bg-[#6F3306]",
            SSC: "hover:bg-[#174515]"
        };
  const hoverColor = hoverColors[code] || "hover:bg-[#174515]";


  /* ---------------------------- sample fallback ---------------------------- */
  const fallback = [];

  const data = excuses.length ? excuses : fallback;

  const actionExcuse = async (excuseId, action) =>{
      try {
          const res = await fetch(`/api/attendance/excuse/${excuseId}/${action}`, {
              method: "POST",
              credentials: "include"
          });
          const response = await res.json();
          if (response.status === "success") {
              fetchAttendanceExcuse();
          } else {
              errorAlert("Failed: " + response.message);
          }
      } catch (err) {
          errorAlert("Failed: " + err);
      }
  }

  return (
  
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      {/* table wrapper */}
      <div className="lg:ml-70 overflow-x-scroll bg-white text-black font-poppins lg:text-sm text-xs flex-grow p-5  mt-3 rounded-lg shadow-[2px_2px_2px_grey]">
        <table className="lg:w-full w-230 text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] bg-white ${color}`}>
              <th>Student Name</th>
              <th>Year &amp; Section</th>
              <th>Event Name</th>
              <th>Date Submitted</th>
              <th>Preview Letter</th>
              <th>Action</th>


            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
            data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td>{s.full_name}</td>
                <td>{s.student_section}</td>
                <td>{s.event_name}</td>
                <td>{formatDateStr(s.submitted_at)}</td>
                <td className="flex justify-center py-6" >
                  <button onClick={()=>{viewLetter(s)}} className={`bg-white ${hoverColor} ${color} py-1 flex items-center gap-1 justify-center lg:px-5 md:px-5 px-2  border-1 text-sm cursor-pointer shadow-[2px_2px_1px_gray]  hover:text-white transition duration-200  rounded-2xl`}><i className="fa-regular fa-eye"></i>Letter</button>
                </td>
                <td className="lg:text-lg md:text-lg text-sm">
                  {s.attendance_excuse_status == "PENDING" && (
                    <>
                    <i onClick={()=>{actionExcuse(s.attendance_excuse_id, "approve")}} className="fa-solid fa-circle-check cursor-pointer text-[#70B914]"></i>
                    <i onClick={()=>{actionExcuse(s.attendance_excuse_id, "reject")}} className="fa-solid fa-circle-xmark cursor-pointer ml-1 text-[#DE0004]"></i>
                    </>
                  )}
                  {s.attendance_excuse_status == "APPROVED" && (
                    <button className="text-sm bg-[#368642] text-white px-2 py-1 rounded-md">APPROVED</button>
                  )}
                  {s.attendance_excuse_status == "REJECTED" && (
                    <button className="text-sm bg-[#c92c2c] text-white px-2 py-1 rounded-md">REJECTED</button>

                  )}
                </td>
              </tr>
            ))) : ( 
            <tr>
              <td colSpan="6" className="py-5 text-gray-500 italic text-center">No Excuse Request Found</td>
            </tr>)
            }
          </tbody>
        </table>
      </div>
        {/* pagination controls */}
        <div className="mt-4 lg:ml-60 flex justify-center gap-2 items-center">
          <button
            onClick={() => fetchAttendanceExcuse(status, paginate.page - 1)}
            disabled={paginate.page <= 1}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <span className="px-3">
            Page {paginate.page} of {paginate.total_pages}
          </span>

          <button
            onClick={() => fetchAttendanceExcuse(status, paginate.page + 1)}
            disabled={paginate.page >= paginate.total_pages}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
    </div>
   
  );
}
export default TableExcuse;
