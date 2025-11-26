import { useState, useMemo } from "react";
import "../animate.css";

function TableEventContribution({ code , events = [], view, formatDateStr }) {
/* ------------------------ animation ------------------------- */
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

  const data = events.length > 0 ? events : fallback;

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


  /* -------------------------------- Render ------------------------------- */
  return (
    <div className={`w-full ${animate} flex flex-col gap-6  font-poppins lg:text-sm text-xs`}>
      {selectedEventIndex === null && (
        <>
        <div className={`lg:ml-70 overflow-x-scroll bg-white border-1  border-[#d8d8d8] text-black flex-grow p-5  mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
          <table className="lg:w-full w-230 text-center">
            <thead>
              <tr className={`border-b-2 border-[#000] bg-white ${color}`}>
                <th hidden>
                  <input type="checkbox"
                  checked={allChecked}
                  onChange={handleSelectAll} />
                </th>
                <th hidden>Id</th>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Event Fee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? 
              (data.map((s, idx) => (
                <tr key={idx} className="border-b border-[#0505057a]">
                  <td hidden>
                    <input type="checkbox"
                     id={s.id}
                    checked={checkedIds.includes(s.id)}
                    onChange={(e) => handleCheckboxChange(e, s.id)} />
                  </td>
                  <td hidden>{s.id}</td>
                  <td>{s.event_name}</td>
                  <td>
                    {s.event_start_date === s.event_end_date
                  ? formatDateStr(s.event_start_date)
                  : `${formatDateStr(s.event_start_date)} - ${formatDateStr(s.event_end_date)}`}
                  </td>
                  <td>{s?.contribution?.event_contri_fee}</td>
                  <td className="flex lg:flex-row flex-col gap-2 justify-center py-6">
                    <span onClick={ () => view(s)} title="View Participants Contribution"
                     
                      className="material-symbols-outlined cursor-pointer shadow-[2px_2px_1px_grey] rounded-[5px] text-[#3a2791] border border-[#3a2791] px-[2px]"
                    >
                      visibility
                    </span>
                  </td>
                </tr>
              ))) :
              (
                <tr>
                  <td colSpan="4" className="py-5 text-gray-500 italic text-center">No Contribution Data</td>
                </tr>
              )
              }
            </tbody>
          </table>

          {/* Pagination controls for main table */}
         
        </div>
      
        <div className=" relative lg:ml-[270px] mt-[-10px] flex flex-col-reverse justify-center items-center">
            <div className="flex">
              <button  className="mx-1 flex items-center rounded-md cursor-pointer border disabled:opacity-40">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              
                <button
                
                  className={`px-2 mx-1 cursor-pointer text-white rounded-md ${color}`}
                >1
                 
                </button>
             
              <button  className="mx-1 flex items-center rounded-md border disabled:opacity-40">
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
