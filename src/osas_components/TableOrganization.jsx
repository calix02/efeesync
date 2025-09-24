import { useState, useMemo } from "react";
import { confirmAlert, errorAlert, okayAlert } from "../utils/alert";
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  organizations   – array of { id, name, yearSection }
 */
function TableOrganisation({ code = "osas", organizations = [] , update, reloadOrgs}) {
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
    organization_code: `No data`,
    organization_name: `No data`,
    department_code: `No data`,
    }
  ];

  const data = organizations.length ? organizations : fallback;

  const deleteOrg = (s) => {
    confirmAlert("It will delete permanently").then( async (result) =>{
      if(result.isConfirmed){
        try {
          const res = await fetch("/api/organizations/" + s.organization_id, {
              method: "DELETE",
              credentials: "include",
              headers: {
                  "Content-Type": "application/json"
              }
          });
          const response = await res.json();
          if (response.status === "success") {
              await reloadOrgs();
          } else {
              errorAlert("Failed: " + response.message);
          }
      } catch (err) {
          errorAlert("Failed: " + err);
      }
      }
    });
  };

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

  /* -------------------------------- render --------------------------------- */
  return (
  
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      {/* table wrapper */}
      <div className="lg:ml-68 lg:mr-4 bg-white border-1 border-[#174515] text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]">
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] text-[#000]`}>
              <th>Organization Code</th>
              <th>Organization Name</th>
              <th>Assigned College</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pageData.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td>{s.organization_code}</td>
                <td>{s.organization_name}</td>
                <td>{s.department_code}</td>
                <td className="flex lg:flex-row flex-col gap-2 justify-center py-2">
                  <span onClick={() =>update(s)} className="material-symbols-outlined cursor-pointer text-[#174515] bg-white  shadow-[2px_2px_1px_grey] rounded-sm border border-[#174515] px-1">
                    edit_square
                  </span>
                  <span onClick={() => deleteOrg(s)} className="material-symbols-outlined bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-sm border border-[#d10707] px-1">
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* pagination controls */}
        <div className=" relative lg:ml-70 mt-[-10px] font-[family-name:Arial] lg:text-sm text-xs flex flex-col-reverse justify-center items-center">
            <p className='text-[#174515] lg:absolute left-9'>Showing of 600</p>  
        <span className="flex">
             <button
            onClick={goPrev}
            disabled={page === 0}
            className=" mx-1 flex cursor-pointer items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>

          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-2 mx-1 rounded-md border cursor-pointer
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


export default TableOrganisation;
