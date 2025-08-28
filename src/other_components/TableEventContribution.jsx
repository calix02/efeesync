import { useState, useMemo } from "react";
import "../animate.css";

function TableEventContribution({ code = "cit", events = [], addEvent, updateEvent }) {
/* ------------------------ animation ------------------------- */
  const animate = "card-In";

  const textColor =
    code === "cit" ? "text-[#4F1C51]"
      : code === "coe" ? "text-[#0E2148]"
        : code === "coc" ? "text-[#3A0519]"
          : code === "cot" ? "text-[#FFD95F]"
            : code === "eap" ? "text-[#4B352A]"
              : code === "osas" ? "text-[#27391C]"
                : "text-blue";

  const fallback = Array.from({ length: 5 }, (_, i) => ({
    eventName: `Year-End-Party`,
    targetYear: `1,2,3,4`,
    eventDate: `7/11/25`,
    eventFee: `400`,
    attendance: Array.from({ length: 8 }, (_, j) => ({
      studID: `22-1029`,
      name: `Mark Alvarado`,
      yearSection: `3A`,
      contriDate: `12-23-24`,
      totalFees: `400`,
      balance: `50`,
    }))
  }));

  const data = events.length ? events : fallback;

  const [activeLogIndex, setActiveLogIndex] = useState(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  const toggleLog = (index) => {
    setActiveLogIndex(activeLogIndex === index ? null : index);
  };

  /* ------------------------ Main Table Pagination ------------------------- */
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(data.length / PAGE_SIZE);
  const pageData = useMemo(() => data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE), [page, data]);
  const goPrev = () => setPage(Math.max(0, page - 1));
  const goNext = () => setPage(Math.min(pageCount - 1, page + 1));

  /* ----------------------- Attendance Pagination ------------------------- */
  const ATTENDEE_PAGE_SIZE = 10;
  const [attendeePage, setAttendeePage] = useState(0);

  const selectedEvent = selectedEventIndex !== null ? pageData[selectedEventIndex] : null;
  const selectedAttendance = selectedEvent?.attendance || [];
  const attendeePageCount = Math.ceil(selectedAttendance.length / ATTENDEE_PAGE_SIZE);

  const attendeePageData = useMemo(
    () => selectedAttendance.slice(attendeePage * ATTENDEE_PAGE_SIZE, (attendeePage + 1) * ATTENDEE_PAGE_SIZE),
    [attendeePage, selectedAttendance]
  );

  const goAttendeePrev = () => setAttendeePage(Math.max(0, attendeePage - 1));
  const goAttendeeNext = () => setAttendeePage(Math.min(attendeePageCount - 1, attendeePage + 1));

  /* -------------------------------- Render ------------------------------- */
  return (
    <div className={`w-full ${animate} flex flex-col gap-6  font-[family-name:Arial] lg:text-sm text-xs`}>
      {/* ===================== EVENT TABLE ===================== */}
      {selectedEventIndex === null && (
        <>
        <div className={`lg:ml-70 bg-white   border-1 font-[family-name:Arial] border-[#d8d8d8] text-black flex-grow p-5  mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
          <table className="w-full text-center">
            <thead>
              <tr className={`border-b-2 border-[#000] ${textColor}`}>
                <th><input type="checkbox" /></th>
                <th>Event Name</th>
                <th>Target Year</th>
                <th>Event Date</th>
                <th>Event Fee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((s, idx) => (
                <tr key={idx} className="border-b border-[#0505057a]">
                  <td><input type="checkbox" /></td>
                  <td>{s.eventName}</td>
                  <td>{s.targetYear}</td>
                  <td>{s.eventDate}</td>
                  <td>{s.eventFee}</td>
                  <td className="flex lg:flex-row flex-col gap-2 justify-center py-2">
                    <span
                      onClick={() => {
                        setSelectedEventIndex(idx);
                        setAttendeePage(0); // reset attendee pagination
                      }}
                      className="material-symbols-outlined cursor-pointer shadow-[2px_2px_1px_grey] rounded-[5px] text-[#3a2791] border border-[#3a2791] px-[2px]"
                    >
                      visibility
                    </span>
                    <span
                      onClick={updateEvent}
                      className="material-symbols-outlined cursor-pointer text-[#8A2791] bg-white shadow-[2px_2px_1px_grey] rounded-[5px] border border-[#8A2791] px-[2px]"
                    >
                      edit_square
                    </span>
                    <span className="material-symbols-outlined bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-[5px] border border-[#d10707] px-[2px]">
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
              <button onClick={goPrev} disabled={page === 0} className="mx-1 flex items-center rounded-md border disabled:opacity-40">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`px-2 mx-1 rounded-md border ${i === page ? "bg-violet-600 text-white" : "bg-white"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={goNext} disabled={page === pageCount - 1} className="mx-1 flex items-center rounded-md border disabled:opacity-40">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <i onClick={addEvent} className="fa-solid fa-circle-plus text-[50px] absolute right-[40px] top-[-40px] cursor-pointer text-[#157112] bg-white rounded-full"></i>
          </div>
          </>
          )}

      {/* ===================== CONTRIBUTION TABLE ===================== */}
      {selectedEvent && (
        <div className="lg:ml-70 bg-white text-black flex-grow lg:p-5 md:p-5 py-5 px-2 mt-3 lg:text-sm md:text-sm text-xs rounded-lg shadow-[2px_2px_2px_grey]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="lg:text-xl md:text-xl text-lg font-bold text-[#621668]">
              Contribution – {selectedEvent.eventName}
            </h2>
            <button
              onClick={() => setSelectedEventIndex(null)}
              className="bg-[#621668] text-white lg:px-4 md:px-4 px-2 py-1 rounded-md"
            >
              Back to Events
            </button>
          </div>

          <table className="w-full text-center ">
            <thead>
              <tr className="border-b-2 font-semibold">
                <th><input type="checkbox" /></th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Year & Section</th>
                <th>Contribution Date</th>
                <th>Total Fees</th>
                <th>Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendeePageData.map((attendee, i) => (
                <tr key={i} className="border-b border-[#adadad]">
                  <td>
                    <input type="checkbox" />
                </td>
                  <td>{attendee.studID}</td>
                  <td>{attendee.name}</td>
                  <td>{attendee.yearSection}</td>
                  <td className="text-[#119e3e]">{attendee.contriDate}</td>
                  <td className="text-[#119e3e]">{attendee.totalFees}</td>
                  <td className="text-[#119e3e]">{attendee.balance}</td>
                  <td className="flex justify-center gap-1 py-1">
                    <span className="material-symbols-outlined cursor-pointer text-[#8A2791] bg-white shadow-[2px_2px_1px_grey] rounded-sm border border-[#8A2791] px-1">
                      edit_square
                    </span>
                     <span className="material-symbols-outlined bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-[5px] border border-[#d10707] px-[2px]">
                      delete
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination for attendance */}
          <div className="mt-4 flex justify-center gap-2">
            <button onClick={goAttendeePrev} disabled={attendeePage === 0} className=" border rounded disabled:opacity-40">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {Array.from({ length: attendeePageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => setAttendeePage(i)}
                className={`px-2 border rounded ${i === attendeePage ? "bg-[#621668] text-white" : "bg-white"}`}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={goAttendeeNext} disabled={attendeePage === attendeePageCount - 1} className=" border rounded disabled:opacity-40">
              <span className="material-symbols-outlined">chevron_right</span>

            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableEventContribution;
