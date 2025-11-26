import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EventsCalendarView = React.forwardRef(
  ({ animate, onAnimationEnd, events, code, onClose }, ref) => {
    const [currentUserData, setCurrentUserData] = useState(null);
    const [parsedEvents, setParsedEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // --- Fetch current user (still useful for department coloring) ---
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("/api/users/current", {
          credentials: "include",
        });
        const response = await res.json();
        if (response.status === "success") {
          setCurrentUserData(response.data);
        }
      } catch (err) {
        console.error("Fetch Failed", err);
      }
    };

    useEffect(() => {
      fetchCurrentUser();
    }, []);

    // --- Helper: normalize date (ignore time) ---
    const normalizeDate = (date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

    // --- Helper: expand multi-day events ---
    const expandMultiDayEvents = (ev) => {
      const start = new Date(ev.event_start_date);
      const end = new Date(ev.event_end_date);
      const days = [];

      for (
        let d = new Date(start);
        d <= end;
        d.setDate(d.getDate() + 1)
      ) {
        let eventType = "General";
        if (ev.contribution) {
          eventType = "Contribution";
        } else if (ev.attendance && ev.attendance.length > 0) {
          eventType = "Attendance";
        }

        days.push({
          ...ev,
          date: new Date(d), // normalized date for calendar
          attendee: ev.event_target_year_levels.join(", "), // 👈 use year levels
          eventType,
        });
      }

      return days;
    };

    // --- Transform events whenever events change ---
    useEffect(() => {
      if (events) {
        const mapped = events.flatMap((ev) => expandMultiDayEvents(ev));
        setParsedEvents(mapped);
      }
    }, [events]);

    // --- Filter events by selected date ---
    const filteredEvents = parsedEvents.filter(
      (ev) => normalizeDate(new Date(ev.date)) === normalizeDate(selectedDate)
    );

    // --- Department colors ---
    const textColors = {
      CITSC: "border-[#621668] text-[#621668]",
      CESC: "border-[#020180] text-[#020180]",
      CCSC: "border-[#660A0A] text-[#660A0A]",
      COTSC: "border-[#847714] text-[#847714]",
      SCEAP: "border-[#6F3306] text-[#6F3306]",
      SSC: "border-[#174515] text-[#174515]",
    };
    const textColor = textColors[code] || "border-[#174515] text-[#174515]";

    return (
      <div
        ref={ref}
        onAnimationEnd={onAnimationEnd}
        className={`${animate} ${textColor} bg-white rounded-2xl`}
      >
        {/* Close button */}
        <div className="text-end py-2 px-4">
          <span
            onClick={onClose}
            className="material-symbols-outlined cursor-pointer"
          >
            disabled_by_default
          </span>
        </div>

        <h1 className="font-[family-name:Helvetica] border-b-4 mx-10 font-bold text-xl text-center">
          Events Calendar
        </h1>

        <div className="flex lg:flex-row flex-col gap-8 lg:px-10 md:px-10 px-5 py-6 h-90 overflow-y-scroll hide-scrollbar">
          {/* Calendar */}
          <Calendar className="lg:sticky lg:top-0"
            value={selectedDate}
            onChange={setSelectedDate}
            tileClassName={({ date, view }) => {
              if (view === "month") {
                const hasEvent = parsedEvents.some(
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

          {/* Event List */}
          <div >
            <h2 className="text-lg font-semibold font-poppins mb-3">
              Events on {selectedDate.toDateString()}
            </h2>

            {filteredEvents.length > 0 ? (
              <ul className="space-y-3 font-[family-name:Arial]">
                {filteredEvents.map((ev, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 border-l-7 shadow-[2px_2px_2px_grey] rounded bg-gray-50 mb-2"
                  >
                    <p className="text-xs text-end text-black">
                      {new Date(ev.date).toLocaleDateString()}
                    </p>
                    <p className="font-semibold text-black text-lg text-center">
                      {ev.event_name}
                    </p>
                    <p className="mt-5 text-black text-sm font-semibold">
                      Target Year Levels: <br />
                      <span className="font-extralight border-l-5 px-2 ml-5 border-gray-600 ">
                        {ev.attendee}
                      </span>
                    </p>
                    <p className="mt-5 text-black text-sm font-semibold">
                      Event Type: <br />
                      <span className="font-extralight border-l-5 px-2 ml-5 border-gray-600 ">
                        {ev.eventType}
                      </span>
                    </p>
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
