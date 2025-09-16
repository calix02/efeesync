import { useState, useMemo } from "react";
import {Link} from 'react-router-dom';
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  events   – array of { id, name, yearSection }
 */
function TableEventList({ code = "cit", events = [] , addEvent, updateEvent,view}) {
  /* --------------------------------- animation -------------------------------- */
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
    event_name: `No Data`,
    event_desciption: `No data`,
    event_target_year_levels: `1,2,3,4`,
    event_start_date: `7/8/25`,
    event_end_date: `7/11/25`
    }
  ];

  const data = events.length ? events : fallback;

  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  const deleteEvent = (s) => {
      confirmAlert("It will delete permanently").then( async (result) =>{
            if(result.isConfirmed){
              try {
                const res = await fetch("/api/events/" + s.event_id, {
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
  

  /* ----------------------------- pagination -------------------------------- */
  const PAGE_SIZE = 7;
  const [page, setPage] = useState(0);          // 0‑based
  const pageCount = Math.ceil(data.length / PAGE_SIZE);

  const pageData = useMemo(
    () => data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page, data]
  );

  const selectedEvent = selectedEventIndex !== null ? pageData[selectedEventIndex] : null;


  const goPrev = () => setPage(Math.max(0, page - 1));
  const goNext = () => setPage(Math.min(pageCount - 1, page + 1));

  /* -------------------------------- render --------------------------------- */
  return (
  
    <div className={`w-full ${animate} flex flex-col gap-6 lg:text-sm text-xs font-[family-name:Arial]`}>
      {/* table wrapper */}
      {selectedEventIndex === null && (
        <>
      <div className={`lg:ml-70  bg-white text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 rounded-lg  border-[#adadad] ${textColor}`}>
              <th className="py-2"><input type="checkbox" /></th>
              <th>Event Name</th>
              <th hidden>Event Description</th>
              <th hidden>Target Year</th>
              <th>Event Date</th>
              <th>Event Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pageData.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td><input type="checkbox" /></td>
                <td>{s.event_name}</td>
                <td hidden >{s.event_desciption}</td>
                <td hidden>{s.eventFee}</td>
                <td hidden>{s.targetYear}</td>
                <td>
                  {s.event_start_date === s.event_end_date
                  ? s.event_start_date
                  : `${s.event_start_date} - ${s.event_end_date}`}
                </td>
                <td>
                  {s.attendance && s.attendance.length > 0 && "With Attendance"}
                  {s.contribution && " With Contribution"}
                  {!s.attendance?.length && !s.contribution && "—"}
                </td>
                
                <td  className="flex lg:flex-row flex-col gap-2 justify-center py-3">
                    <span title="View Event Details" onClick={() => view(s)} className="material-symbols-outlined cursor-pointer  shadow-[2px_2px_1px_grey] rounded-[5px] text-[#3a2791] border border-[#3a2791] px-[2px]">visibility</span>
                  <span title="Update Event" onClick={() => updateEvent(s)} className="material-symbols-outlined cursor-pointer text-[#8A2791] bg-white  shadow-[2px_2px_1px_grey] rounded-[5px] border border-[#8A2791] px-[2px]">
                    edit_square
                  </span>
                  <span onClick={() => deleteEvent(s)} title="Delete Event" className="material-symbols-outlined bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-[5px] border border-[#d10707] px-[2px]">
                    delete
                  </span>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* pagination controls */}
        <div className=" relative lg:ml-70 flex mt-[-10px] flex-col-reverse justify-center items-center">
            <p className='text-[#8A2791] lg:absolute left-9'>Showing of 600</p>  
        <span className="flex">
             <button
            onClick={goPrev}
            disabled={page === 0}
            className=" mx-1 flex items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined cursor-pointer">chevron_left</span>

          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-2 mx-1 rounded-md border cursor-pointer
                ${i === page
                  ? "bg-[#4F1C51] text-white"
                  : "bg-white "}`} >
              {i + 1}
            </button>
          ))}

          <button
            onClick={goNext}
            disabled={page === pageCount - 1}
           className=" mx-1 flex items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined cursor-pointer">chevron_right</span>

          </button>

        </span>
            <i onClick={addEvent}  className="fa-solid fa-circle-plus text-[50px] absolute right-[40px] top-[-40px] cursor-pointer text-[#157112] bg-white rounded-full "></i>
        </div>
        </>
        )};
    </div>
   
  );
}


export default TableEventList;
