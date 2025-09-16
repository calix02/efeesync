import { useState, useMemo } from "react";
import "../animate.css";

function TableEventContribution({ code = "cit", events = [],view }) {
/* ------------------------ animation ------------------------- */
  const animate = "card-In";

  const textColor =
    code === "cit" ? "text-[#4F1C51]"
    : code === "coe" ? "text-[#0E2148]"
    : code === "coc" ? "text-[#3A0519]"
    : code === "cot" ? "text-[#FFD95F]"
    : code === "eap" ? "text-[#4B352A]"
    : code === "osas" ? "text-[#27391C]"
    : "text-black";

  const fallback = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    eventName: `Year-End-Party ${i + 1}`,
    dateFrom: `7/11/25`,
    dateTo: ``,
    eventFee: `400`,
  }));

  const data = events.length ? events : fallback;

  const [activeLogIndex, setActiveLogIndex] = useState(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  const toggleLog = (index) => {
    setActiveLogIndex(activeLogIndex === index ? null : index);
  };

  /* ------------------------ Main Table Pagination ------------------------- */
  const PAGE_SIZE = 8;
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(data.length / PAGE_SIZE);
  const pageData = useMemo(() => data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE), [page, data]);
  const goPrev = () => setPage(Math.max(0, page - 1));
  const goNext = () => setPage(Math.min(pageCount - 1, page + 1));

  /* -------------------------------- Render ------------------------------- */
  return (
    <div className={`w-full ${animate} flex flex-col gap-6  font-[family-name:Arial] lg:text-sm text-xs`}>
      {selectedEventIndex === null && (
        <>
        <div className={`lg:ml-70 bg-white border-1 font-[family-name:Arial] border-[#d8d8d8] text-black flex-grow p-5  mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
          <table className="w-full text-center">
            <thead>
              <tr className={`border-b-2 border-[#000] ${textColor}`}>
                <th><input type="checkbox" /></th>
                <th hidden>Id</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Event Fee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((s, idx) => (
                <tr key={idx} className="border-b border-[#0505057a]">
                  <td><input type="checkbox" /></td>
                  <td hidden>{s.id}</td>
                  <td>{s.eventName}</td>
                  <td>{s.dateFrom + " " + s.dateTo}</td>
                  <td>{s.eventFee}</td>
                  <td className="flex lg:flex-row flex-col gap-2 justify-center py-3">
                    <span onClick={ () => view(s)} title="View Participants Contribution"
                     
                      className="material-symbols-outlined cursor-pointer shadow-[2px_2px_1px_grey] rounded-[5px] text-[#3a2791] border border-[#3a2791] px-[2px]"
                    >
                      visibility
                    </span>
                   
                    <span title="Delete Event" className="material-symbols-outlined bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-[5px] border border-[#d10707] px-[2px]">
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls for main table */}
         
        </div>
      
        <div className=" relative lg:ml-[270px] mt-[-10px] flex flex-col-reverse justify-center items-center">
            <p className="text-[#8A2791] lg:absolute left-9">Showing of 600</p>
            <div className="flex">
              <button onClick={goPrev} disabled={page === 0} className="mx-1 flex items-center rounded-md cursor-pointer border disabled:opacity-40">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`px-2 mx-1 cursor-pointer rounded-md border ${i === page ? "bg-[#4F1C51] text-white" : "bg-white"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={goNext} disabled={page === pageCount - 1} className="mx-1 flex items-center rounded-md border disabled:opacity-40">
                <span className="material-symbols-outlined cursor-pointer">chevron_right</span>
              </button>
            </div>
          </div>
          </>
          )}

    </div>
  );
}

export default TableEventContribution;
