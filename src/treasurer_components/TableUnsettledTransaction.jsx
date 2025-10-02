import { useState, useMemo } from "react";
import { successAlert } from "../utils/alert";
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  sanctions   – array of { id, name, yearSection }
 */
function TableUnsettledTransaction({ code = "cit", sanctions = [], view, paginate, fetchSanctions }) {
  const animate = "card-In";
  /* --------------------------------- colors -------------------------------- */
  const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#020180]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
    COT: "border-[#847714] text-[#847714] bg-[#847714]",
    ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
    SSC: "border-[#174515] text-[#174515] bg-[#174515]",
  };
  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [amount, setAmount] = useState("");
  const handleChange = (e) => setAmount(e.target.value);



  /* ---------------------------- sample fallback ---------------------------- */
  const fallback = [];

  const data = sanctions.length ? sanctions : fallback;
  
 const clickedPay = (idx) => {
    setActiveRowIndex(activeRowIndex === idx ? null : idx);
  };
  const handleSubmit = () => {
      successAlert(amount);
      setActiveRowIndex(null);
      setAmount("");
    };


  return (
  
    <div className={`w-full ${animate}  flex flex-col gap-6`}>
      {/* table wrapper */}
      <div className={`lg:ml-70 font-[family-name:Arial] lg:text-sm text-xs  bg-white text-black flex-grow p-5  mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] bg-white ${color}`}>
              <th className="hidden lg:block md:block">Student ID</th>
              <th>Student Name</th>
              <th>Year &amp; Section</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td className="hidden lg:block md:block">{s.student_number_id}</td>
                <td>{s.full_name}</td>
                <td>{s.student_section}</td>
                <td>{s.total_balance}</td>
                <td className="py-3 flex justify-center">
                   <span onClick={ () => view(s)} title="View Unsettled Transaction"
                     
                      className="material-symbols-outlined cursor-pointer shadow-[2px_2px_1px_grey] rounded-[5px] text-[#3a2791] border border-[#3a2791] px-[2px]"
                    >
                      visibility
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* pagination controls */}
        <div className=" relative lg:ml-70 font-[family-name:Arial] lg:text-sm text-xs mt-[-10px] flex flex-col-reverse justify-center items-center">
            <div className="mt-4 flex justify-center gap-2 items-center">
          <button
            onClick={() => fetchSanctions(paginate.page - 1)}
            disabled={paginate.page <= 1}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <span className="px-3">
            Page {paginate.page} of {paginate.total_pages}
          </span>

          <button
            onClick={() => fetchSanctions(paginate.page + 1)}
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


export default TableUnsettledTransaction;
