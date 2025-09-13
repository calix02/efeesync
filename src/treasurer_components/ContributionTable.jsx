import { useState, useMemo } from "react";
import { successAlert } from "../utils/alert";
import "../animate.css";

function ContributionTable({ code, events = [] }) {
  const animate = "card-In";

  const[amount, setAmount] = useState("");

  const handleChange = (e) => setAmount(e.target.value);

  const textColor =
    code === "cit" ? "text-[#4F1C51]"
    : code === "coe" ? "text-[#0E2148]"
    : code === "coc" ? "text-[#3A0519]"
    : code === "cot" ? "text-[#FFD95F]"
    : code === "eap" ? "text-[#4B352A]"
    : code === "osas" ? "text-[#27391C]"
    : "text-black";

  const fallback = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    studentID: `22-1029`,
    studentName: `Mark Alvarado`,
    yearSection: `4A`,
    eventFee: `400`,
    balance: `0`,
  }));

  const data = events.length ? events : fallback;
  const handleSubmit = () =>{
    
    successAlert(amount)
    setActiveRowIndex();
    setAmount(0);
  }

  /* ------------------------ Track only the clicked row ------------------------- */
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  const clickedPartial = (idx) => {
    setActiveRowIndex(activeRowIndex === idx ? null : idx);
  };

  /* ------------------------ Pagination ------------------------- */
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(data.length / PAGE_SIZE);
  const pageData = useMemo(
    () => data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page, data]
  );
  const goPrev = () => setPage(Math.max(0, page - 1));
  const goNext = () => setPage(Math.min(pageCount - 1, page + 1));

  return (
    <div className={`w-full ${animate} flex flex-col gap-6 lg:text-sm text-xs font-[family-name:Arial]`}>
      <div className={`lg:ml-70 bg-white text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        <table className="w-full text-center">
          <thead>
            <tr className={`border-b-2 border-[#adadad] ${textColor}`}>
              <th><input type="checkbox" /></th>
              <th hidden>Id</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Year &amp; Section</th>
              <th>Event Fee</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a]">
                <td><input type="checkbox" /></td>
                <td hidden>{s.id}</td>
                <td>{s.studentID}</td>
                <td>{s.studentName}</td>
                <td>{s.yearSection}</td>
                <td>{s.eventFee}</td>
                <td>{s.balance}</td>
                <td className="flex gap-2 justify-center font-semibold text-xs py-3">
                  {activeRowIndex !== idx ? (
                    <>
                      <button className="cursor-pointer w-15 border-1 py-1 rounded-sm border-[#65A810] text-[#65A810]">
                        Full
                      </button>
                      <button
                        onClick={() => clickedPartial(idx)}
                        className="cursor-pointer w-15 border-1 rounded-sm border-[#EAB308] text-[#EAB308]"
                      >
                        Partial
                      </button>
                    </>
                  ) : (
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        handleSubmit();
                        }} action="">
                        <input className="w-30 border-1 py-1 border-[#000] px-1 rounded-sm"
                      type="text" onChange={handleChange} value={amount}
                      placeholder="Enter amt"
                    />
                    <button hidden type="submit">Submit</button>

                    </form>
                    
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContributionTable;
