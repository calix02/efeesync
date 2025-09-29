import React, { useState, useEffect } from "react";
import { successAlert, errorAlert } from "../utils/alert.js";

const UpdateEventCard = React.forwardRef(
  ({ animate, onAnimationEnd, onClose, data, reloadEvents, currentUserData,code }, ref) => {
    const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
    const logOptions = ["AM IN", "AM OUT", "PM IN", "PM OUT"];

    // Map numeric year_levels → "1st Year", etc.
    const yearMap = {
      1: "1st Year",
      2: "2nd Year",
      3: "3rd Year",
      4: "4th Year",
    };

    // Setup state
    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [selectedYear, setSelectedYear] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [eventFee, setEventFee] = useState("");
    const [sanctionPerSignature, setSanctionPerSignature] = useState("");
    const [selectedSanctionType, setSelectedSanctionType] = useState("");
    const [dates, setDates] = useState([]); // each day’s info

    // Init from props
    useEffect(() => {
      if (data) {
        setEventName(data.event_name || "");
        setEventDesc(data.event_description || "");

        // Target years
        setSelectedYear(data.event_target_year_levels?.map((y) => yearMap[y]) || []);

        // Types
        const typeArr = [];
        if (data.contribution) typeArr.push("With Contribution");
        if ((data.attendance).length >0) typeArr.push("With Attendance");
        setSelectedType(typeArr);

        // Contribution
        if (data.contribution) {
          setEventFee(data.contribution.event_contri_fee || "");
        }

        // Attendance dates
        if (data.attendance) {
          setDates(
            data.attendance.map((att) => ({
              id: att.day_num,
              value: att.event_attend_date,
              times: att.event_attend_time || [],
              sanction: att.event_attend_sanction_fee || "",
            }))
          );
        } else {
          setDates([]);
        }

        // Sanction
        setSelectedSanctionType(data.event_sanction_has_comserv ? "Community Service" : "Monetary");
        if (data.attendance?.length) {
          setSanctionPerSignature(data.attendance[0].event_attend_sanction_fee || "");
        }
      }
    }, [data]);

    // toggle helpers
    const toggleYear = (year) => {
      setSelectedYear((prev) =>
        prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
      );
    };

    const toggleType = (type) => {
      setSelectedType((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
      );
    };

    const handleLogToggle = (id, option) => {
      setDates((prev) =>
        prev.map((d) =>
          d.id === id
            ? {
                ...d,
                times: d.times.includes(option)
                  ? d.times.filter((o) => o !== option)
                  : [...d.times, option],
              }
            : d
        )
      );
    };

    // Submit update
    const handleSubmit = async () => {
      const payload = {
        event_name: eventName,
        event_description: eventDesc,
        event_target_year_levels: selectedYear.map((y) => y[0]), // "1st Year" → "1"
        event_sanction_has_comserv: selectedSanctionType === "Community Service",
        contribution: selectedType.includes("With Contribution")
          ? {
              event_contri_fee: parseFloat(eventFee) || 0,
              event_contri_sanction_fee: 0,
            }
          : null,
        attendance: selectedType.includes("With Attendance")
          ? dates.map((d, idx) => ({
              day_num: idx + 1,
              event_attend_date: d.value,
              event_attend_time: d.times,
              event_attend_sanction_fee: parseFloat(sanctionPerSignature) || 0,
            }))
          : null,
      };

      try {
        const res = await fetch(`/api/organizations/${currentUserData.organization_id}/events/${data.event_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await res.json();

        if (result.status === "success") {
          await reloadEvents();
        } else {
          errorAlert("Error: " + result.message);
        }
      } catch (err) {
        console.error("Update error:", err);
        errorAlert("Failed to update event.");
      }
    };
     const colors = {
            CIT: "border-[#621668] text-[#621668] bg-[#621668]",
            COE: "border-[#020180] text-[#020180] bg-[#020180]",
            COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COT: "border-[#847714] text-[#847714] bg-[#847714]",
            ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]"
        };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    return (
      <div
        ref={ref}
        className={`${animate} ${color} lg:w-100 md:w-100 w-80 max-h-[90vh] hide-scrollbar overflow-y-scroll py-6 text-sm font-[family-name:Arial] px-6 bg-white shadow rounded-lg z-80 inset-0 mx-auto`}
        onAnimationEnd={onAnimationEnd}
      >
        <div className="relative">
          <span
            onClick={onClose}
            className="material-symbols-outlined absolute right-0.5 cursor-pointer"
          >
            disabled_by_default
          </span>
        </div>
        <div className="border-b-4 mb-4">
          <span className=" font-semibold text-xl">Update Event</span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            onClose();
          }}
        >
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="border-2 text-black px-2  h-8 rounded-md w-full mb-3"
          />

          <label>Event Description:</label>
          <textarea
            value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)}
            className="border-2 px-2  text-black h-20 rounded-md w-full mb-3"
          />

          <label>Target Year:</label>
          <div className="flex gap-2 border-2  rounded-md p-2 mb-3">
            {years.map((year) => (
              <label key={year} className="flex text-black items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedYear.includes(year)}
                  onChange={() => toggleYear(year)}
                />
                {year}
              </label>
            ))}
          </div>

          <label>Event Category:</label>
          <div className="flex gap-2 border-2  rounded-md p-2 mb-3">
            {["With Contribution", "With Attendance"].map((type) => (
              <label key={type} className="flex text-black items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedType.includes(type)}
                  onChange={() => toggleType(type)}
                />
                {type}
              </label>
            ))}
          </div>

          {selectedType.includes("With Contribution") && (
            <input
              type="number"
              placeholder="Event Fee"
              value={eventFee}
              onChange={(e) => setEventFee(e.target.value)}
              className="border p-2 w-full mb-3 text-black"
            />
          )}

          {selectedType.includes("With Attendance") && (
            <>
              <div className="border-2  rounded-md p-2 mb-3 text-xs">
                {dates.map((d, i) => (
                  <div key={d.id} className="mb-2">
                    <p className="font-semibold">
                      Day {i + 1}: {new Date(d.value).toLocaleDateString()}
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      {logOptions.map((opt) => (
                        <label key={opt} className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={d.times.includes(opt)}
                            onChange={() => handleLogToggle(d.id, opt)}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <select
                value={selectedSanctionType}
                onChange={(e) => setSelectedSanctionType(e.target.value)}
                className="border p-2 w-full mb-2"
              >
                <option value="">-- Select Sanction Type --</option>
                <option value="Monetary">Monetary</option>
                <option value="Community Service">Community Service</option>
              </select>

              {selectedSanctionType === "Monetary" && (
                <input
                  type="number"
                  placeholder="Sanction per signature"
                  value={sanctionPerSignature}
                  onChange={(e) => setSanctionPerSignature(e.target.value)}
                  className="border p-2 w-full mb-2"
                />
              )}
            </>
          )}

          <button
            type="submit"
            className={` ${color} rounded-md text-white w-full h-8 mt-4`}
          >
            Update Event
          </button>
        </form>
      </div>
    );
  }
);

export default UpdateEventCard;