import "../animate.css";
import { useState } from "react";

function EventAttended({ eventAttended }) {
  const animate = "left-In";

  const [showLogs, setShowLogs] = useState(null);

  const clickedLog = (index) => {
    setShowLogs(showLogs === index ? null : index);
  };

  return (
    <div
      className={`${animate} w-[100%]   font-poppins h-135 border-2 shadow-[2px_2px_3px_grey] bg-white rounded-lg border-[#174515] text-[#174515] px-6`}
    >
      <div className="border-b-4 border-[#174515] text-xl pt-3 py-1 font-semibold">
        <span>Event Attended</span>
      </div>

      {eventAttended.map((d, id) => (
        <div
          key={id}
          className="w-[100%] min-h-25 py-4 flex hover:scale-103 transition duration-300  items-center border px-4 rounded-2xl shadow-[2px_2px_2px_gray] border-[#e0e0e0] bg-[#fcfcfc] mt-3"
        >
          <div className="w-[100%] py-3 border-l-4 border-[#174515] px-6 flex flex-col">
            <span className="text-xl font-semibold">{d.event_name}</span>

            <span className="flex flex-col text-black gap-2 cursor-pointer">
              <p
                onClick={() => clickedLog(id)}
                className="font-semibold text-xs flex items-center gap-2"
              >
                Attendance Logs:{" "}
                {showLogs === id ? (
                  <i className="fa-solid fa-caret-up"></i>
                ) : (
                  <i className="fa-solid fa-caret-down"></i>
                )}
              </p>

              {showLogs === id && (
                <div className="flex flex-col text-xs font-poppins gap-1">
                  {d.attendance_logs.map((a, logIndex) => (
                    <div key={logIndex} className="flex flex-col">
                      <span className="font-semibold">
                        📅 {a.event_attend_date}
                      </span>
                      {a.event_attend_time.map((t, tIndex) => (
                        <span key={tIndex}>⏰ {t}</span>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </span>
          </div>
        </div>
      ))}

      {eventAttended.length == 0 && (
        <center>
          <p className="text-lg text-gray-400 mt-5">No Events Attended</p>
        </center>
      )}
    </div>
  );
}

export default EventAttended;
