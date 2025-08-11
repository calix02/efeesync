import { useState, useMemo } from "react";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  shifts   – array of { id, name, yearSection }
 */
function TableShifting({ code = "cit", shifts = [] }) {
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
  const fallback = Array.from({ length: 7 }, (_, i) => ({
    studName: `Jaspher Yummy`,
    currentProgram : `Information Technology`,
    targetProgram : `Criminology`,
    date: `06/05/2025`
    
  }));

  const data = shifts.length ? shifts : fallback;
  

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

    const[status, setStatus] = useState("Pending");
    const[selectedIndex, setSelectedIndex] = useState(null);


  const clickedApprove = () =>{
        setStatus("Approved")
    
  }
  const clickedReject = () =>{
    setStatus("Rejected");
  }
  
  


  /* -------------------------------- render --------------------------------- */
  return (
  
    <div className="w-full flex flex-col gap-6">
      {/* table wrapper */}
      <div className="lg:ml-[300px] bg-white text-black flex-grow p-5 mx-5 mt-3 rounded-[10px] shadow-[2px_2px_2px_grey]">
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] ${textColor}`}>
              <th>Student Name</th>
              <th>Current Program</th>
              <th>Target Program</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>


            </tr>
          </thead>

          <tbody>
            {pageData.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td>{s.studName}</td>
                <td>{s.currentProgram}</td>
                <td>{s.targetProgram}</td>
                <td>{s.date}</td>
                <td >
                    <button className="bg-white w-27 py-0.25 border-1 text-sm cursor-pointer border-[#621668] text-[#621668] rounded-xl">{status }</button>
                </td>
                <td className="flex lg:flex-row flex-col gap-2 text-lg justify-center py-3">
                  <i onClick={clickedApprove} className="fa-solid fa-circle-check text-[#70B914]"></i>
                  <i onClick={clickedReject}  className="fa-solid fa-circle-xmark text-[#DE0004]"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* pagination controls */}
        <div className=" relative lg:ml-[270px] mt-[-10px] flex flex-col-reverse justify-center items-center">
            <p className='text-[#8A2791] lg:absolute left-9'>Showing of 600</p>  
        <span className="flex">
             <button
            onClick={goPrev}
            disabled={page === 0}
            className=" mx-1 flex items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>

          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-2 mx-1 rounded-md border
                ${i === page
                  ? "bg-violet-600 text-white"
                  : "bg-white "}`}>
              {i + 1}
            </button>
          ))}

          <button
            onClick={goNext}
            disabled={page === pageCount - 1}
           className=" mx-1 flex items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_right</span>

          </button>
        </span>
        </div>
    </div>
   
  );
}


export default TableShifting;
