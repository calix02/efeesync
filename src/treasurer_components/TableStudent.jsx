import { useState } from "react";
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";

import "../animate.css";

function TableStudent({ code , students = [], show, update, reloadStudents, paginate, year, search, pid, currentUserData }) {
  const animate = "card-In";

  const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#020180]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
    COT: "border-[#847714] text-[#847714] bg-[#847714]",
    ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
    SSC: "border-[#174515] text-[#174515] bg[#174515]",
  };

  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

  const fallback = [];
  let data = students.length ? students : fallback;

  // ✅ filter students by year if provided
  if (year) {
    data = data.filter((s) => {
      const sec = (s.student_section || "").toLowerCase();
      if (year === "1") return sec.includes("1");
      if (year === "2") return sec.includes("2");
      if (year === "3") return sec.includes("3");
      if (year === "4") return sec.includes("4");
      return true;
    });
  }

  const [checkedIds, setCheckedIds] = useState([]);

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setCheckedIds((prev) => [...prev, id]);
    } else {
      setCheckedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCheckedIds(data.map((s) => s.id));
    } else {
      setCheckedIds([]);
    }
  };

  const allChecked = data.length > 0 && checkedIds.length === data.length;

  const deleteStudent = (s) => {
    confirmAlert("It will delete permanently").then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/students/" + s.student_id, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
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
  };

  // ✅ year label
  const yearMap = {
    "1": "1st Year",
    "2": "2nd Year",
    "3": "3rd Year",
    "4": "4th Year",
  };
  const yearLabel = year ? yearMap[year] || `${year} Year` : null;

  return (
    <div className={`w-full ${animate} flex flex-col gap-6 lg:text-sm text-xs font-poppins`}>
      <div className={`lg:ml-70 overflow-x-scroll bg-white text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        {yearLabel && (
          <p className="text-left font-semibold mb-3">
            Showing {yearLabel} Students
          </p>
        )}
        <table className="lg:w-full w-230 text-center">
          <thead>
            <tr className={`border-b-2 bg-white border-[#adadad] ${color}`}>
              <th hidden>
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Year &amp; Section</th>
              <th>Program</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? 
            (data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a]">
                <td hidden>
                  <input
                    type="checkbox"
                    id={s.student_id}
                    checked={checkedIds.includes(s.student_id)}
                    onChange={(e) => handleCheckboxChange(e, s.student_id)}
                  />
                </td>
                <td>{s.student_number_id}</td>
                <td>{s.full_name}</td>
                <td>{s.student_section}</td>
                <td>{s.program_code}</td>
                <td className="flex lg:flex-row flex-col gap-2 justify-center py-6">
                  <span
                    onClick={() => update(s)}
                    className={`material-symbols-outlined ${color} cursor-pointer bg-white shadow-[2px_2px_1px_grey] rounded-sm border px-0.5`}
                  >
                    edit_square
                  </span>
                  <span
                    onClick={() => deleteStudent(s)}
                    className="material-symbols-outlined px-0.5 bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-sm border border-[#d10707] "
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))) :
            (
              <tr>
                <td colSpan="5" className="py-5 text-gray-500 italic text-center">No Student Data</td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>

      {/* pagination controls */}
      <div className={` relative lg:ml-[270px] mt-[-10px] flex flex-col-reverse justify-center items-center`}>
        <div className="mt-4 flex justify-center gap-2 items-center">
          <button
            onClick={() => reloadStudents(
                currentUserData,
                paginate.page - 1,
                search,
                pid
            )}
            disabled={paginate.page <= 1}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <span className="px-3">
            Page {paginate.page} of {paginate.total_pages}
          </span>

          <button
            onClick={() => reloadStudents(
                currentUserData,
                paginate.page + 1,
                search,
                pid
            )}
            disabled={paginate.page >= paginate.total_pages}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <i
          onClick={show}
          className="fa-solid fa-circle-plus text-[50px] absolute right-[40px] top-[-40px] cursor-pointer text-[#157112] bg-white rounded-full "
        ></i>
      </div>
    </div>
  );
}

export default TableStudent;
