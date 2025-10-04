import { useState } from "react";

function MonetarySanction({ code, monetarySanctions, formatDateStr }) {
  const [openLogId, setOpenLogId] = useState(null);

  const toggleLog = (id) => {
    setOpenLogId(openLogId === id ? null : id); // close if same one clicked
  };

  const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#020180]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
    COT: "border-[#847714] text-[#847714] bg-[#847714]",
    ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
    SSC: "border-[#174515] text-[#174515] bg-[#174515]",
  };

  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

  return (
    monetarySanctions.map((ms, index) => {
      const id = ms.id || index; // use real ID if exists
      const isOpen = openLogId === id;

      return (
        <div
          key={id}
          className={`w-[100%] bg-[#fff] py-4 mt-2 px-4 ${color} rounded-md border-2`}
        >
          <div className="border-l-8 w-[100%] items-center grid-cols-[50px_auto] grid px-3">
            <div className="font-bold font-poppins text-2xl">
              {ms.balance}
            </div>
            <div className="text-black">
              <h2 className="font-bold font-poppins text-md ">
                {ms.event_name}
              </h2>

              <p
                onClick={() => toggleLog(id)}
                className="flex cursor-pointer gap-2 text-xs items-center"
              >
                <span>Absence Logs</span>
                {isOpen ? (
                  <i className="fa-solid fa-caret-up"></i>
                ) : (
                  <i className="fa-solid fa-caret-down"></i>
                )}
              </p>

              {isOpen && ms.absence_logs.map((al, i) => (
                <p key={i} className="text-xs">
                  {formatDateStr(al.event_attend_date)} -{" "}
                  {al.event_attend_time.map((t, j) => (
                    <span key={j}>{t}, </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </div>
      );
    })
  );
}

export default MonetarySanction;
