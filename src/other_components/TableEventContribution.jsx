import { useState, useMemo } from "react";
import "../animate.css";

function TableEventContribution({ code = "cit", events = [],view }) {
/* ------------------------ animation ------------------------- */
  const animate = "card-In";

  const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#621668]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#621668]",
    COT: "border-[#847714] text-[#847714] bg-[#621668]",
    SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#621668]",
    SSC: "border-[#174515] text-[#174515] bg-[#621668]",
  };
  const color = colors[code] || "border-black text-black";


  const fallback = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    eventName: `Year-End-Party ${i + 1}`,
    dateFrom: `7/11/25`,
    dateTo: ``,
    eventFee: `400`,
  }));

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


  /* -------------------------------- Render ------------------------------- */
  return (
    <div className={`w-full ${animate} flex flex-col gap-6  font-[family-name:Arial] lg:text-sm text-xs`}>
      {selectedEventIndex === null && (
        <>
        <div className={`lg:ml-70 bg-white border-1 font-[family-name:Arial] border-[#d8d8d8] text-black flex-grow p-5  mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
          <table className="w-full text-center">
            <thead>
              <tr className={`border-b-2 border-[#000] bg-white ${color}`}>
                <th>
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
              {data.map((s, idx) => (
                <tr key={idx} className="border-b border-[#0505057a]">
                  <td>
                    <input type="checkbox"
                     id={s.id}
                    checked={checkedIds.includes(s.id)}
                    onChange={(e) => handleCheckboxChange(e, s.id)} />
                  </td>
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
                   
                    <span title="Delete Event"
                    onClick={clickedDelete}
                     className="material-symbols-outlined bg-white cursor-pointer text-[#d10707] shadow-[2px_2px_2px_grey] rounded-[5px] border border-[#d10707] px-[2px]">
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
              <button  className="mx-1 flex items-center rounded-md cursor-pointer border disabled:opacity-40">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              
                <button
                
                  className={`px-2 mx-1 cursor-pointer rounded-md text-white ${color}`}
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
