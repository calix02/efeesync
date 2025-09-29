import "../animate.css";
import { useState } from "react";

function EventAttended({ eventAttended }) {
  const animate = "left-In";
  const [showLogs, setShowLogs] = useState(false);
  const clickedLog = () => {
    setShowLogs(!showLogs);
  };

  return (
    <div
      className={`${animate} w-[100%] h-135 border-2 shadow-[2px_2px_3px_grey] bg-white rounded-lg border-[#15A310] text-[#15A310] px-6`}
    >
      <div className="border-b-4 border-[#15A310] text-xl pt-2 py-1 font-semibold">
        <span>Event Attended</span>
      </div>

      {eventAttended.map((d, id) => (
        <div
          key={id}
          className="w-[100%] py-2 flex items-center border-2 px-4 rounded-lg border-[#15A310] mt-3"
        >
          <div className="w-[100%] py-3 border-l-4 border-[#15A310] px-6 flex flex-col">
            <span className="text-xl font-semibold">{d.event_name}</span>
            <span className="flex flex-col text-black gap-2 cursor-pointer">
              <p
                onClick={clickedLog}
                className="font-semibold text-sm flex items-center gap-2"
              >
                Attendance Logs:{" "}
                {showLogs ? (
                  <i className="fa-solid fa-caret-up"></i>
                ) : (
                  <i className="fa-solid fa-caret-down"></i>
                )}
              </p>

              {showLogs && (
                <div className="flex flex-col text-xs font-[family-name:Arial] gap-1">
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
      {eventAttended.length == 0 &&(
            <>
            No events attended
            </>
        )}
    </div>
  );
}

export default EventAttended;