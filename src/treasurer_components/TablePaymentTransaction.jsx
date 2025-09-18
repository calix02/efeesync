import { useState, useMemo } from "react";
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  payments   – array of { id, name, yearSection }
 */
function TablePaymentTransaction({ code = "cit",viewProof, payments = [] }) {
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
  const fallback = Array.from({ length: 7 }, (_, i) => ({
    studID: `22-1031`,
    studName: `Jaspher Yummy`,
    eventName : `IT Week`,
    amount : `400`,
    date: `06/05/2025`
    
  }));

  const data = payments.length ? payments : fallback;
  

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
  
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      {/* table wrapper */}
      <div className="lg:ml-70 bg-white font-[family-name:Arial] lg:text-sm text-xs text-black flex-grow lg:p-5 p-2 mt-3 rounded-lg shadow-[2px_2px_2px_grey]">
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] ${textColor}`}>
              <th className="hidden lg:block">Student ID</th>
              <th>Student Name</th>
              <th>Event Name</th>
              <th>Amount</th>
              <th className="hidden lg:block">Date</th>
              <th>Screenshot</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pageData.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td className="hidden lg:block">{s.studID}</td>
                <td>{s.studName}</td>
                <td>{s.eventName}</td>
                <td>{s.amount}</td>
                <td className="hidden lg:block">{s.date}</td>
                <td >
                    <button onClick={() =>viewProof(s)} className="bg-white  gap-1 lg:px-5 md:px-5 px-1 py-1 border-1 lg:text-sm text-xs hover:bg-[#621668] hover:text-white transition duration-200 cursor-pointer border-[#621668] text-[#621668] rounded-lg">
                      <i className="fa-regular fa-eye"></i>View
                    </button>

                </td>
                <td>
                    <span className={`lg:px-5 md:px-5 px-1 border-1 text-black py-1 rounded-sm 
                      ${status === "Approved"? "bg-[#66a810a1]" : 
                      status === "Pending" ? "bg-[#eab20886]" : 
                      status === "Rejected"? "bg-[#de0004ac]" : "" }`}>{status}
                    </span>
                </td>
                <td className="flex lg:flex-row flex-col gap-2 text-lg justify-center py-3">
                  <i onClick={clickedApprove} className="fa-solid fa-circle-check cursor-pointer text-[#70B914]"></i>
                  <i onClick={clickedReject}  className="fa-solid fa-circle-xmark cursor-pointer text-[#DE0004]"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* pagination controls */}
        <div className=" relative lg:ml-70 mt-[-10px] flex flex-col-reverse justify-center items-center">
            <p className='text-[#8A2791] lg:absolute left-9'>Showing of 600</p>  
        <span className="flex">
             <button
            onClick={goPrev}
            disabled={page === 0}
            className=" mx-1  cursor-pointer flex items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>

          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-2 mx-1 cursor-pointer rounded-md border
                ${i === page
                  ? "bg-[#621668] text-white"
                  : "bg-white "}`}>
              {i + 1}
            </button>
          ))}

          <button
            onClick={goNext}
            disabled={page === pageCount - 1}
           className=" mx-1  cursor-pointer flex items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_right</span>

          </button>
        </span>
        </div>
    </div>
   
  );
}
export default TablePaymentTransaction;
