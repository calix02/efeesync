import { useState, useEffect, useRef } from "react";
import { confirmAlert, errorAlert, okayAlert } from "../utils/alert";
import "../animate.css";

function TableStudent({ code = "cit", students = [], show, update }) {
  const animate = "card-In";

   const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#621668]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#621668]",
    COT: "border-[#847714] text-[#847714] bg-[#621668]",
    SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#621668]",
    SSC: "border-[#174515] text-[#174515] bg-[#621668]",
  };
  const color = colors[code] || "border-black text-black";


  const fallback = [];
  
  const data = students.length ? students : fallback;

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

  const clickedDelete = () => {
    alert("Selected IDs: " + checkedIds.join(", "));
  };

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
                  okayAlert("Deleted!");
                  reloadStudents();
              } else {
                  alert("Failed: " + response.message);
              }
          } catch (err) {
              alert("Fetch failed: " + err);
          }
          }
        });
  }

  return (
    <div
      className={`w-full ${animate} flex flex-col gap-6 lg:text-sm text-xs font-[family-name:Arial]`}
    >
      {/* table wrapper */}
      <div
        className={`lg:ml-70 bg-white text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}
      >
        <table className="w-full text-center">
          <thead>
            <tr className={`border-b-2 bg-white border-[#adadad] ${color}`}>
              <th>
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Year &amp; Section</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a]">
                <td>
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
                <td className="flex lg:flex-row flex-col gap-2 justify-center py-3">
                  <span
                    onClick={() => update(s)}
                    className={`material-symbols-outlined ${color}  cursor-pointer bg-white shadow-[2px_2px_1px_grey] rounded-sm border px-0.5`}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination controls */}
      <div className="relative lg:ml-[270px] mt-[-10px] flex flex-col-reverse justify-center items-center">
        <p className="text-[#8A2791] lg:absolute left-9">Showing of 600</p>
        <span className="flex">
          <button className="mx-1 flex cursor-pointer items-center rounded-md border disabled:opacity-40">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <button
            className={`px-2 mx-1 rounded-md border cursor-pointer ${color} text-white`}
          >
            1
          </button>

          <button className="mx-1 flex items-center cursor-pointer rounded-md border disabled:opacity-40">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </span>
        <i
          onClick={show}
          className="fa-solid fa-circle-plus text-[50px] absolute right-[40px] top-[-40px] cursor-pointer text-[#157112] bg-white rounded-full "
        ></i>
      </div>
    </div>
  );
}

export default TableStudent;
