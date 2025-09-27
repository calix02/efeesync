import { useState, useMemo } from "react";
import { confirmAlert, errorAlert, okayAlert } from "../utils/alert";
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  students   – array of { id, name, yearSection }
 */
function TableStudentOsas({ code = "osas", students = [] , update,add,reloadStudents,paginate}) {
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
    student_number_id: `No data`,
    full_name: `No data`,
    student_section: `No data`,
    department_code: `No data`,
    program_code: `No data`,
  }
  ];

  const data = students.length ? students : fallback;
  
  const deleteStudent = (s) => {
    confirmAlert("It will delete permanently").then( async (result) =>{
          if(result.isConfirmed){
            try {
              const res = await fetch("/api/students/" + s.student_id, {
                  method: "DELETE",
                  credentials: "include",
                  headers: {
                      "Content-Type": "application/json"
                  }
              });
              const response = await res.json();
              if (response.status === "success") {
                  await reloadStudents();
              } else {
                  alert("Failed: " + response.message);
              }
          } catch (err) {
              alert("Fetch failed: " + err);
          }
          }
        });
  }

  /* -------------------------------- render --------------------------------- */
  return (
  
    <div className={`w-full flex flex-col ${animate} gap-6`}>
      {/* table wrapper */}
      <div className="lg:ml-68 lg:mr-4 font-[family-name:Arial] lg:text-sm text-xs bg-white border-1 border-[#174515] text-black flex-grow p-5  mt-3 rounded-lg shadow-[2px_2px_2px_grey]">
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] text-[#000]`}>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Section</th>
              <th>College </th>
              <th>Program</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td>{s.student_number_id}</td>
                <td>{s.full_name}</td>
                <td>{s.student_section}</td>
                <td>{s.department_code}</td>
                <td>{s.program_code}</td>



                <td className="flex lg:flex-row flex-col gap-2 justify-center py-2">
                  <span onClick={() => update(s)} className="material-symbols-outlined cursor-pointer text-[#174515] bg-white  shadow-[2px_2px_1px_grey] rounded-sm border border-[#174515] px-1">
                    edit_square
                  </span>
                  <span onClick={() => deleteStudent(s)} className="material-symbols-outlined bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-sm border border-[#d10707] px-1">
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* pagination controls */}
        <div className=" relative lg:ml-70 font-[family-name:Arial] text-xs lg:text-sm mt-[-10px] flex flex-col-reverse justify-center items-center">
        <div className="mt-4 flex justify-center gap-2 items-center">
          <button
            onClick={() => reloadStudents(paginate.page - 1)}
            disabled={paginate.page <= 1}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <span className="px-3">
            Page {paginate.page} of {paginate.total_pages}
          </span>

          <button
            onClick={() => reloadStudents(paginate.page + 1)}
            disabled={paginate.page >= paginate.total_pages}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
            <i onClick={add}  className="fa-solid fa-circle-plus text-5xl absolute right-10 top-[-40px] cursor-pointer text-[#157112] bg-white rounded-full "></i>

        </div>
    </div>
   
  );
}


export default TableStudentOsas;
