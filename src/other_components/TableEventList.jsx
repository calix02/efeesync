import { useState, useMemo } from "react";
import {Link} from 'react-router-dom';
import "../animate.css";
import { confirmAlert, successAlert } from "../utils/alert";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  events   – array of { id, name, yearSection }
 */
function TableEventList({ code, events = [] , addEvent, updateEvent,view, reloadEvents, formatDateStr}) {
  /* --------------------------------- animation -------------------------------- */
  const animate = "card-In";
  /* --------------------------------- colors -------------------------------- */
  const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#621668]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#621668]",
    COT: "border-[#847714] text-[#847714] bg-[#621668]",
    SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#621668]",
    SSC: "border-[#174515] text-[#174515] bg-[#621668]",
  };
  const color = colors[code] || "border-black text-black";

  /* ---------------------------- sample fallback ---------------------------- */
  const fallback = [];

  const data = events.length ? events : fallback;

   const [checkedIds, setCheckedIds] = useState([]);

  
  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setCheckedIds((prev) => [...prev, id]);
    } else {
      setCheckedIds((prev) => prev.filter((item) => item !== id));
    }
  };


  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCheckedIds(data.map((s) => s.event_id));
    } else {
      setCheckedIds([]);
    }
  };

  const allChecked = data.length > 0 && checkedIds.length === data.length;

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
                    await reloadEvents();
                } else {
                    alert("Failed: " + response.message);
                }
            } catch (err) {
                alert("Fetch failed: " + err);
            }
            }
          });
    }
  

  return (
  
    <div className={`w-full ${animate} flex flex-col gap-6 lg:text-sm text-xs font-[family-name:Arial]`}>
      {/* table wrapper */}
      {selectedEventIndex === null && (
        <>
      <div className={`lg:ml-70  bg-white text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        <table className="w-full text-center ">
          <thead>
            <tr className={`border-b-2 rounded-lg bg-white border-[#adadad] ${color}`}>
              <th className="py-2">
                <input type="checkbox" 
                checked={allChecked}
                onChange={handleSelectAll}/>
              </th>
              <th>Event Name</th>
              <th hidden>Event Description</th>
              <th hidden>Target Year</th>
              <th>Event Date</th>
              <th>Event Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td><input type="checkbox"
                  id={s.event_id}
                  checked={checkedIds.includes(s.event_id)}
                  onChange={(e) => handleCheckboxChange(e, s.event_id)}  
                 />
                 </td>
                 <td hidden>{s.event_id}</td>
                <td>{s.event_name}</td>
                <td hidden >{s.event_description}</td>
                <td hidden>{s.eventFee}</td>
                <td hidden>{s.targetYear}</td>
                <td>
                  {s.event_start_date === s.event_end_date
                  ? formatDateStr(s.event_start_date)
                  : `${formatDateStr(s.event_start_date)} - ${formatDateStr(s.event_end_date)}`}
                </td>
                <td>
                  {s.attendance && s.attendance.length > 0 && "With Attendance"}
                  {s.contribution && " With Contribution"}
                  {!s.attendance?.length && !s.contribution && "—"}
                </td>
                
                <td  className="flex lg:flex-row flex-col gap-2 justify-center py-3">
                    <span title="View Event Details" onClick={() => view(s)} className="material-symbols-outlined cursor-pointer  shadow-[2px_2px_1px_grey] rounded-[5px] text-[#3a2791] border border-[#3a2791] px-[2px]">visibility</span>
                  <span title="Update Event" onClick={() => updateEvent(s)} className={`material-symbols-outlined cursor-pointer ${color} border-1 bg-white  shadow-[2px_2px_1px_grey] rounded-sm px-0.5`}>
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
            className=" mx-1 flex items-center rounded-md border disabled:opacity-40"
          >
            <span className="material-symbols-outlined cursor-pointer">chevron_left</span>

          </button>

          
            <button className={`px-2 mx-1 rounded-md border cursor-pointer text-white ${color}`}>
                1
            </button>
       

          <button
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
