import { useState, useMemo } from "react";
import { confirmAlert, errorAlert, okayAlert } from "../utils/alert";
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  colleges   – array of { id, name, yearSection }
 */
function TableCollege({ code = "osas", colleges = [] , update, reloadColleges}) {
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
    department_code: `No data`,
    department_name: `No data`,
    student_population: `N/A`,
    program_count: `N/A`,
    
  }];

  const data = colleges.length > 1 ? colleges : fallback;

  /* ----------------------------- pagination -------------------------------- */
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(0);          // 0‑based
  const pageCount = Math.ceil(data.length / PAGE_SIZE);

  const pageData = useMemo(
    () => data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page, data]
  );

  const goPrev = () => setPage(Math.max(0, page - 1));
  const goNext = () => setPage(Math.min(pageCount - 1, page + 1));

  const deleteCollege = (s) => {
    confirmAlert("It will delete permanently").then( async (result) =>{
      if(result.isConfirmed){
        try {
          const res = await fetch("/api/departments/" + s.department_id, {
              method: "DELETE",
              credentials: "include",
              headers: {
                  "Content-Type": "application/json"
              }
          });
          const response = await res.json();
          if (response.status === "success") {
              okayAlert("Deleted!");
              reloadColleges();
          } else {
              alert("Failed: " + response.message);
          }
      } catch (err) {
          alert("Fetch failed: " + err);
      }

      }
    });
  };

  /* -------------------------------- render --------------------------------- */
  return (
  
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      {/* table wrapper */}
      <div className="lg:ml-68 lg:mr-4 bg-white border-1 font-[family-name:Arial] lg:text-sm text-xs border-[#174515] text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]">
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] text-[#000]`}>
              <th>College Code</th>
              <th>College Name</th>
              <th>Student Population</th>
              <th>Programs Count</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pageData.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td>{s.department_code}</td>
                <td>{s.department_name}</td>
                <td>{s.student_population}</td>
                <td>{s.program_count}</td>

                <td className="flex lg:flex-row flex-col gap-2 justify-center py-2">
                  <span onClick={() =>update(s)} className="material-symbols-outlined cursor-pointer text-[#174515] bg-white  shadow-[2px_2px_1px_grey] rounded-sm border border-[#174515] px-1">
                    edit_square
                  </span>
                  <span onClick={() => deleteCollege(s)} className="material-symbols-outlined bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-sm border border-[#d10707] px-1">
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* pagination controls */}
        <div className=" relative font-[family-name:Arial] lg:text-sm text-xs lg:ml-70 mt-[-10px] flex flex-col-reverse justify-center items-center">
            <p className='text-[#174515] lg:absolute left-9'>Showing of 600</p>  
        <span className="flex">
             <button
            onClick={goPrev}
            disabled={page === 0}
            className=" mx-1 cursor-pointer flex items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>

          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-2 mx-1 cursor-pointer rounded-md border
                ${i === page
                  ? "bg-[#174515] text-white"
                  : "bg-white "}`} >
              {i + 1}
            </button>
          ))}

          <button
            onClick={goNext}
            disabled={page === pageCount - 1}
           className=" mx-1 flex cursor-pointer items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_right</span>

          </button>

        </span>
        </div>
    </div>
   
  );
}


export default TableCollege;
