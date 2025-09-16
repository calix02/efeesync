import { useState, useMemo } from "react";
import "../animate.css";

function TableAttendance({ code = "cit", events = [], scanAttendee,view}) {
  const animate = "card-In";
  const textColor =
    code === "cit" ? "text-[#4F1C51]"
    :code === "coe" ? "text-[#0E2148]"
    : code === "coc" ? "text-[#3A0519]"
    : code === "cot" ? "text-[#FFD95F]"
    : code === "eap" ? "text-[#4B352A]"
    : code === "osas" ? "text-[#27391C]"
    : "text-blue";

  const fallback = Array.from({ length: 5 }, (_, i) => ({
    eventName: `Year-End-Party ${i + 1}`,
    targetYear: `1,2,3,4`,
    eventDate: `7/11/25`,
    eventLog: `View Logs`,
    sanctionType: `Monetary`,
    sanctionFee: `18`,
    attendance: Array.from({ length: 32 }, (_, j) => ({
      name: `Mark Angelo Alvarado jrats`,
      yearSection: `3A`,
      morningIn: `Excuse`,
      morningOut: `Present`,
      afternoonIn: `Absent`,
      afternoonOut: `Present`
    }))
  }));
  


  const data = events.length ? events : fallback;

  const [activeLogIndex, setActiveLogIndex] = useState(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [mIn, setMIN] = useState("");
  const [mOut, setMOut] = useState("");
  const [aIn, setAIn] = useState("");
  const [aOut, setAOut] = useState("");


  const handleMIN = (e) =>{
    setMIN(e.target.value);
  }
    const handleMout = (e) =>{
    setMOut(e.target.value);
  } 
   const handleAIn = (e) =>{
    setAIn(e.target.value);
  }  
  const handleAOut = (e) =>{
    setAOut(e.target.value);
  }



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
  const ATTENDEE_PAGE_SIZE = 8;
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
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      {/* ===================== EVENT TABLE ===================== */}
      {selectedEventIndex === null && (
        <>
        <div className={` ${animate} lg:ml-70 bg-white lg:text-sm text-xs font-[font-family:Arial] text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
          <table className="w-full text-center">
            <thead>
              <tr className={`border-b-2 border-[#000] ${textColor}`}>
                <th><input type="checkbox" /></th>
                <th>Event Name</th>
                <th hidden>Target Year</th>
                <th>Event Date</th>
                <th>Event Logs</th>
                <th>Sanction Type</th>
                <th>Sanction Fee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((s, idx) => (
                <tr key={idx} className="border-b border-[#0505057a]">
                  <td><input type="checkbox" /></td>
                  <td>{s.eventName}</td>
                  <td hidden>{s.targetYear}</td>
                  <td>{s.eventDate}</td>
                  <td onClick={() => toggleLog(idx)} className="relative flex items-center justify-center cursor-pointer">
                    {s.eventLog}
                    <span className="material-symbols-outlined">
                      {activeLogIndex === idx ? "arrow_drop_up" : "arrow_drop_down"}
                    </span>
                    {activeLogIndex === idx && (
                      <div className="absolute top-6 bg-white border shadow w-45 z-[1] rounded-sm p-2">
                        <span className="flex items-center text-xs font-semibold">
                          <span className="material-symbols-outlined">arrow_right</span>Day 1: MI, MO, AI, AO
                        </span>
                        <span className="flex items-center text-xs font-semibold">
                          <span className="material-symbols-outlined">arrow_right</span>Day 2: MI, MO, AI, AO
                        </span>
                      </div>
                    )}
                  </td>
                  <td>{s.sanctionType}</td>
                  <td>{s.sanctionFee}</td>
                  <td className="flex lg:flex-row flex-col gap-2 justify-center py-2">
                    <span
                     onClick={ () => view(s)} 
                      className="material-symbols-outlined cursor-pointer shadow-[2px_2px_1px_grey] rounded-md text-[#3a2791] border border-[#3a2791] px-1"
                    title="View Attendee">
                      visibility
                    </span>
                   
                    <span className="material-symbols-outlined bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-[5px] border border-[#d10707] px-[2px]" title="Delete Event">
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls for main table */}
         
        </div>
      
        <div className={`${animate} relative lg:ml-[270px] mt-[-10px] flex flex-col-reverse justify-center items-center`}>
            <p className="text-[#8A2791] lg:absolute left-9">Showing of 600</p>
            <div className="flex">
              <button onClick={goPrev} disabled={page === 0} className="mx-1 cursor-pointer flex items-center rounded-md border disabled:opacity-40">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`px-2 mx-1 cursor-pointer rounded-md border ${i === page ? "bg-[#621668] text-white" : "bg-white"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={goNext} disabled={page === pageCount - 1} className="mx-1 cursor-pointer flex items-center rounded-md border disabled:opacity-40">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          </>
          )}

    </div>
  );
}

export default TableAttendance;
