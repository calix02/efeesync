import { useState, useMemo } from "react";
import "../animate.css";

function TableAttendance({ code , events = [], scanAttendee, view, formatDateStr, searchValueEvents}) {
  const animate = "card-In";

    const colors = {
    CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
    CESC: "border-[#020180] text-[#020180] bg-[#020180]",
    CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
    COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
    SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
    SSC: "border-[#174515] text-[#174515] bg-[#174515]",
  };
  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

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
      setCheckedIds(data.map((s) => s.id));
    } else {
      setCheckedIds([]);
    }
  };

  const allChecked = data.length > 0 && checkedIds.length === data.length;

  const clickedDelete = () => {
    alert("Selected IDs: " + checkedIds.join(", "));
  };
  
  const [activeLogIndex, setActiveLogIndex] = useState(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  const toggleLog = (index) => {
    setActiveLogIndex(activeLogIndex === index ? null : index);
  };

  
  return (
    <div className={`w-full ${animate} flex flex-col gap-6`}>
      {/* ===================== EVENT TABLE ===================== */}
      {selectedEventIndex === null && (
        <>
        <div className={` ${color} ${animate} lg:ml-70 overflow-x-scroll  bg-white lg:text-sm text-xs font-poppins text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
          <table className="lg:w-full w-230 text-center">
            <thead>
              <tr className={`border-b-2 border-[#000] bg-white ${color}`}>
                <th hidden>
                  <input type="checkbox"
                  checked={allChecked}
                  onChange={handleSelectAll} />
                </th>
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
              {data.length > 0 ?
              (data.map((s, idx) => (
                <tr key={idx} className="border-b border-[#0505057a]">
                  <td hidden>
                    <input type="checkbox"
                    id={s.event_id}
                    checked={checkedIds.includes(s.event_id)}
                    onChange={(e) => handleCheckboxChange(e, s.event_id)} />
                  </td>
                  <td hidden>{s.event_id}</td>
                  <td>{s.event_name}</td>
                  <td hidden>{s.event_taret_year_levels}</td>
                  <td>
                    {s.event_start_date === s.event_end_date
                  ? formatDateStr(s.event_start_date)
                  : `${formatDateStr(s.event_start_date)} - ${formatDateStr(s.event_end_date)}`}
                  </td>
                  <td onClick={() => toggleLog(idx)} className="relative py-6 flex items-center justify-center cursor-pointer">
                    {s.eventLog}
                    <span className="material-symbols-outlined">
                      {activeLogIndex === idx ? "arrow_drop_up" : "arrow_drop_down"}
                    </span>
                    {activeLogIndex === idx && (
                      <div className="absolute top-6 bg-white border shadow w-45 z-30 rounded-sm p-2">
                        {(s.attendance).map((a, idx) => (
                          <span className="flex items-center text-xs font-semibold">
                            <span className="material-symbols-outlined">arrow_right</span>Day {a.day_num}: {(a.event_attend_time).map((b, idx) => (
                              <>{b}, </>
                            ))}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td>{s.event_sanction_has_comserv ? "Community Service" : "Monetary"}</td>
                  <td>{s.attendance?.[0]?.event_attend_sanction_fee ?? "-"}</td>
                  <td className="flex lg:flex-row flex-col gap-2 justify-center py-2">
                    <span
                     onClick={ () => {
                      view(s);
                     }  
                    } 
                      className="material-symbols-outlined cursor-pointer shadow-[2px_2px_1px_grey] rounded-md text-[#3a2791] border border-[#3a2791] px-1"
                    title="View Attendee">
                      visibility
                    </span>
                   
                    {/*<span   className="material-symbols-outlined bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-[5px] border border-[#d10707] px-[2px]" title="Delete Event" onClick={clickedDelete}>
                      delete
                    </span>*/}
                  </td>
                </tr>
              ))) :
              (
                <tr>
                  <td colSpan="6" className="py-5 text-gray-500 italic text-center">No Data</td>
                </tr>
              )
              }
            </tbody>
          </table>

          {/* Pagination controls for main table */}
         
        </div>
      
        <div className={`${animate} relative lg:ml-[270px] mt-[-10px] z-[-1] flex flex-col-reverse justify-center items-center`}>
          </div>
          </>
          )}

    </div>
  );
}

export default TableAttendance;
