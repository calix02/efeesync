import { useState, useMemo } from "react";
import { confirmAlert, errorAlert } from "../utils/alert";
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  programs   – array of { id, name, yearSection }
 */
function TableProgram({ code = "osas", programs = [] , update, reloadPrograms}) {
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
  const fallback = [
    {
    program_code: `No data`,
    program_name: `No data`,
    department_code: `No data`,
    
  }
  ];

  const data = programs.length ? programs : fallback;

  const deleteProgram = (s) => {
      confirmAlert("It will delete permanently").then( async (result) =>{
        if(result.isConfirmed){
          try {
            const res = await fetch("/api/programs/" + s.program_id, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const response = await res.json();
            if (response.status === "success") {
                await reloadPrograms();
            } else {
                errorAlert("Failed: " + response.message);
            }
        } catch (err) {
            errorAlert("Failed: " + err);
        }
        }
      });
    };

  /* -------------------------------- render --------------------------------- */
  return (
  
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      {/* table wrapper */}
      <div className="lg:ml-68 lg:mr-4 font-poppins overflow-x-scroll lg:text-sm text-xs bg-white border-1 border-[#174515] text-black flex-grow p-5  mt-3 rounded-lg shadow-[2px_2px_2px_grey]">
        <table className="lg:w-full w-230 text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] text-[#000]`}>
              <th>Program Code</th>
              <th>Program Name</th>
              <th>College Code</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td>{s.program_code}</td>
                <td>{s.program_name}</td>
                <td>{s.department_code}</td>

                <td className="flex lg:flex-row flex-col gap-2 justify-center py-6">
                  <span onClick={() => update(s)} className="material-symbols-outlined cursor-pointer text-[#174515] bg-white  shadow-[2px_2px_1px_grey] rounded-sm border border-[#174515] px-1">
                    edit_square
                  </span>
                  <span onClick={() => deleteProgram(s)} className="material-symbols-outlined bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-sm border border-[#d10707] px-1">
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   
  );
}


export default TableProgram;
