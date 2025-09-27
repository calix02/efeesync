import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

const EventsCalendarView = React.forwardRef(({ animate, onAnimationEnd, events, code,onClose }, ref ) => {
 const [currentUserData, setCurrentUserData] = useState(null);
    
      const fetchCurrentUser = async () => {
         try {
             const res = await fetch("/api/users/current", {
                 credentials: "include"
             });
             const response = await res.json();
             if (response.status === "success") {
                 setCurrentUserData(response.data);
             }
         } catch (err) {
             errorAlert("Fetch Failed");
         }
      }
      useEffect(() => {
        fetchCurrentUser();
      }, []);
    
    const color = {
    CIT: "#621668",
    COE: "#020180",
    COC: "#660A0A",
    COT: "#847714",
    ESAF: "#6F3306",
    SSC: "#174515",
    };
    const textColors = {
        CIT: "border-[#621668] text-[#621668]",
        COE: "border-[#020180] text-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A]",
        COT: "border-[#847714] text-[#847714]",
        ESAF: "border-[#6F3306] text-[#6F3306]",
        SSC: "border-[#174515] text-[#174515]"
    };
    const textColor = textColors[code] || "border-[#174515] text-[#174515]";

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Normalize date (ignore time)
  const normalizeDate = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  const filteredEvents = events.filter(
    (ev) => normalizeDate(new Date(ev.date)) === normalizeDate(selectedDate)
  );

  return (
    <div ref={ref}
        onAnimationEnd ={onAnimationEnd}
     className={` ${animate} ${textColor} bg-white rounded-2xl`}>
        <div className="text-end py-2 px-4"><span onClick={onClose} className="material-symbols-outlined cursor-pointer ">
            disabled_by_default
          </span></div>
        <h1 className="font-[family-name:Helvetica] border-b-4  mx-10  font-bold text-xl text-center">Events Calendar</h1>
        
      <div className="flex lg:flex-row flex-col gap-8 lg:px-10 md:px-10 px-5 py-6">
        <Calendar
        
            value={selectedDate}
            onChange={setSelectedDate}
            tileClassName={({ date, view }) => {
            if (view === "month") {
            // Check if this date has an event
            const hasEvent = events.some(
            (ev) =>
            new Date(ev.date).toDateString() === date.toDateString()
            );
            if (hasEvent) {
                const deptCode = currentUserData?.department_code || "SSC";
                return `has-event ${deptCode}`;
            }
            }
            }}
        />
        <div>
             <h2 className="text-lg font-semibold  font-poppins mb-3">
          Events on {selectedDate.toDateString()}
        </h2>

        {filteredEvents.length > 0 ? (
          <ul className="space-y-3 font-[family-name:Arial]">
            {filteredEvents.map((ev, idx) => (
              <li key={idx}
                className="px-3 py-2 border-l-7 shadow-[2px_2px_2px_grey] rounded bg-gray-50">
                <p className="text-xs text-end text-black">{ev.date}</p>
                <p className="font-semibold text-black text-lg text-center">{ev.name}</p>
                <p className="mt-5 text-black text-sm font-semibold">Attendee: <br /> <span className="font-extralight border-l-5 px-2 ml-5 border-gray-600 ">{ev.attendee}</span></p>
                <p className="mt-5 text-black text-sm font-semibold">Event Type: <br /> <span className="font-extralight border-l-5 px-2 ml-5 border-gray-600 ">{ev.eventType}</span></p>

              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No events for this day.</p>
        )}
            
        </div>
      </div>
    </div>
    );
    }
  );


export default EventsCalendarView;
