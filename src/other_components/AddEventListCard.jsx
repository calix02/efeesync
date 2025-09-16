import React,{useState} from "react";
import {successAlert,errorAlert} from "../utils/alert.js";

const AddEventListCard = React.forwardRef(({animate, onAnimationEnd,onClose,currentUserData,reloadEvents}, ref) =>{

const getToday = () => new Date().toISOString().split("T")[0];

const [addDates, setAddDates] = useState([{ id: Date.now(), value: getToday() }]);

// Add a new date field
const addDateField = () => {
  setAddDates([...addDates, { id: Date.now(), value: getToday() }]);
};

// Remove a date field
const removeDateField = (id) => {
  setAddDates(addDates.filter((date) => date.id !== id));
};

const resetStraightDate = () =>{
  setDateFrom(getToday());
  setDateTo("");
}
const resetSeparateDate = () =>{
    setAddDates([{ id: Date.now(), value: getToday() }]);
}

// Handle input change
const handleDateChange = (id, newValue) => {
  setAddDates(
    addDates.map((date) =>
      date.id === id ? { ...date, value: newValue } : date
    )
  );
};

const getDateRange = (start, end) => {
  if (!start || !end) return [];
  const s = new Date(start);
  const e = new Date(end);
  const dates = [];
  while (s <= e) {
      dates.push(new Date(s));
      s.setDate(s.getDate() + 1);
  }
  return dates;
};

const logOptions = ["AM IN", "AM OUT", "PM IN", "PM OUT"];
const [logs, setLogs] = useState({});

const handleLogToggle = (dateKey, option) => {
  setLogs((prev) => {
      const prevDay = prev[dateKey] || [];
      return {
      ...prev,
      [dateKey]: prevDay.includes(option)
          ? prevDay.filter((o) => o !== option)
          : [...prevDay, option],
      };
  });
};
const years  = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const [eventName, setEventName] = useState("");
const [eventDesc, setEventDesc] = useState("");
const [dateFrom, setDateFrom] = useState("");
const [dateTo, setDateTo] = useState("");
const [selectedYear, setSelectedYear] = useState([...years]);
const [selectedType, setSelectedType] = useState([]);
const [selectedDateType, setSelectedDateType] = useState("Separate Day");
const [eventFee, setEventFee] = useState("");
const [selectedSanctionType, setSelectedSanctionType] = useState("");
const [sanctionPerSignature, setSanctionPerSignature] = useState("");

const handleDateTypeChange = (type) => {
  setSelectedDateType(type);
  if(type === "Separate Day"){
    resetStraightDate();
  }if(type === "Straight Event"){
    resetSeparateDate();
  }
};

const changeEventName = (e) => setEventName(e.target.value);
const changeEventDesc = (e) => setEventDesc(e.target.value);
const changeDateFrom = (e) => setDateFrom(e.target.value);
const changeDateTo = (e) => setDateTo(e.target.value);

const dateType = ["Straight Event","Separate Day"] ;
const types = ["With Contribution", "With Attendance"];
const sanctionTypes = ["Monetary", "Community Service"];

const toggleYear = (year) => {
  setSelectedYear((prev) =>
    prev.includes(year)
      ? prev.filter((y) => y !== year)
      : [...prev, year]
  );
};

const toggleType = (type) => {
  setSelectedType((prev) =>
    prev.includes(type)
        ? prev.filter((y) => y !== type)
        : [...prev, type]
  );
};

const handleSubmit = async () => {
   const firstDate =
    selectedDateType === "Straight Event"
      ? dateFrom
      : addDates.find(d => d.value)?.value || "";

  const lastDate =
    selectedDateType === "Straight Event"
      ? dateTo
      : addDates.length > 0
        ? addDates[addDates.length - 1].value
        : "";
  const eventData = {
    event_name: eventName,
    event_description: eventDesc,
    event_target_year_levels: selectedYear.map(y => y[0]), // "1st Year" → "1"
    event_start_date: firstDate,
    event_end_date: lastDate,
    event_sanction_has_comserv: selectedSanctionType === "Community Service",
    contribution: selectedType.includes("With Contribution")
      ? {
          event_contri_due_date: dateTo, // or another input
          event_contri_fee: parseFloat(eventFee),
          event_contri_sanction_fee: 200, // example, could be input
        }
      : null,
    attendance: selectedType.includes("With Attendance")
      ? Object.entries(logs).map(([date, times]) => ({
          event_attend_date: date,
          event_attend_time: times,
          event_attend_sanction_fee: sanctionPerSignature
        }))
      : null,
  };
  
  try {
    const res = await fetch(`/api/organizations/${currentUserData.organization_id}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    const result = await res.json();
    console.log("Server Response:", result);

    if (result.status === "success") {
      reloadEvents();
      successAlert("Event saved successfully!");
    } else {
      errorAlert("Error: " + result.message);
    }
  } catch (err) {
    console.error("Error submitting:", err);
  }
};

return( 
    <div ref={ref} className={` ${animate} lg:w-100 md:w-100 w-80 max-h-[90vh] hide-scrollbar overflow-y-scroll py-6 text-sm font-[family-name:Arial] px-6 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg  z-80 inset-0 mx-auto  `}
    onAnimationEnd={onAnimationEnd}>
        <div className=" relative">
            <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
        </div>
        <div className=" border-b-4 border-[#8A2791]">
            <span className="text-[#8A2791] font-semibold font-[family-name:Helvetica] text-xl">Add Event</span>
        </div>
        <form onSubmit={(e) =>{
            e.preventDefault();
            handleSubmit();
            onClose();
        }}>
        <div className="mt-4">
            <label>Event Name:</label><br />
            <input type="text" onChange={changeEventName} value={eventName} required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
             <label>Event Description:</label><br />
             <textarea onChange={changeEventDesc} value={eventDesc} className="border-2 px-2 border-[#8A2791] h-15 rounded-md w-[100%] mb-2"></textarea>
             <label htmlFor="">Target Year</label>
              <div className="flex gap-2 h-8 rounded-md lg:text-sm text-xs border-[#8A2791] mb-3 w-100% border-2 justify-center items-center" >
                {years.map((year) => (
                <span key={year} className="flex items-center lg:gap-1">
                    <input
                    type="checkbox"
                    checked={selectedYear.includes(year)}
                    onChange={() => toggleYear(year)} className="cursor-pointer"
                />
                <label>{year}</label>
                </span>
                ))}
            </div>

            <label htmlFor="">Event Date Type</label>
             <div className="flex gap-2 h-8 rounded-md lg:text-sm text-xs border-[#8A2791] mb-3 w-100% border-2 justify-around items-center" >
                {dateType.map((type) => (
                <span  key={type} className="flex items-center lg:gap-1">
                    <input
                    name="dateType"
                    type="checkbox" 
                    checked={selectedDateType === type}
                   onChange={() => handleDateTypeChange(type)} className="cursor-pointer"
                />
                <label>{type}</label>
                </span>
                ))}
            </div>
            
            {selectedDateType === "Straight Event" && (
                <>
                 <label htmlFor="">Date Range</label>
                <div className="w-[100%] flex lg:gap-3 md:gap-3 gap-1">
                    <div className="border-2 border-[#8A2791] h-8 px-2 rounded-md w-[50%] mb-3 grid justify-center items-center">
                        <input type="date" required onChange={changeDateFrom} value={dateFrom}  className="w-[100%] " />
                    </div>
                    <div className="border-2 border-[#8A2791] h-8 px-2 rounded-md w-[50%] mb-1 grid justify-center items-center">
                        <input type="date" required onChange={changeDateTo} value={dateTo} className="w-[100%] " min={dateFrom}/>
                    </div>
                </div>
             </>
            )}
            { selectedDateType === "Separate Day" && (
                <>
                {resetStraightDate}
                <div className="w-[100%] flex justify-between">
                 <label htmlFor="">Event Date</label>
                    <button type="button" onClick={addDateField} className="text-xs border-1 flex justify-center gap-1 items-center text-[#621668] border-[#621668] rounded-sm px-3 py-0.5 cursor-pointer"><i className="fa-solid fa-circle-plus"></i>Add Date</button>
                </div>

                <div className="mt-1 flex flex-col gap-2">
    {addDates.map((date) => (
      <div
        key={date.id}
      className="flex justify-between mb-1 items-center border-2 border-[#8A2791] rounded-md px-3 py-2"
      >
        <input
        required
          type="date"
          value={date.value}
          onChange={(e) => handleDateChange(date.id, e.target.value)}
          className="outline-none flex-1"
        />
        <button type="button" onClick={() => removeDateField(date.id)}
          className="ml-2 cursor-pointer text-[#621668]"
        >
          <i className="fa-solid fa-circle-minus"></i>
        </button>
      </div>
    ))}
  </div>
                </>
            )}

            <label htmlFor="">Event Category</label>
             <div className="flex gap-2 h-8 rounded-md lg:text-sm text-xs border-[#8A2791] mb-3 w-100% border-2 justify-around items-center" >
                {types.map((type) => (
                <span key={type} className="flex items-center lg:gap-1">
                    <input
                    type="checkbox" 
                    checked={selectedType.includes(type)}
                    onChange={() => toggleType(type)} className="cursor-pointer"
                />
                <label>{type}</label>
                </span>
                ))}
            </div>

            {selectedType.includes("With Contribution") &&(
                <input
                  type="number"
                  placeholder="Event Fee"
                  value={eventFee}
                  onChange={(e) => setEventFee(e.target.value)}
                  className="border p-2 w-full mb-3"
                />
            )}

            {selectedType.includes("With Attendance") && (
            <>
                <div className="border-2 border-[#8A2791] rounded-md p-2 mb-3 text-xs">
                {/* Straight or Separate Day Logs */}
                {(selectedDateType === "Straight Event"
                  ? getDateRange(dateFrom, dateTo)
                  : addDates.map(d => new Date(d.value))
                ).map((d, i) => {
                    const dateKey = d.toISOString().split("T")[0];
                    return (
                    <div key={dateKey} className="mb-2 text-xs ">
                        <p className="font-semibold">
                        Day {i + 1}: {d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                        <div className="flex gap-5  justify-center flex-wrap">
                        {logOptions.map((opt) => (
                            <label key={opt} className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={logs[dateKey]?.includes(opt) || false}
                                onChange={() => handleLogToggle(dateKey, opt)}
                            />
                            {opt}
                            </label>
                        ))}
                        </div>
                    </div>
                    );
                })}
                </div>

                <select
                  value={selectedSanctionType}
                  required
                  onChange={(e) => setSelectedSanctionType(e.target.value)}
                  className="border p-2 w-full mb-2"
                >
                  <option value="">-- Select Sanction Type --</option>
                  <option value="Monetary">Monetary</option>
                  <option value="Community Service">Community Service</option>
                </select>

                {selectedSanctionType === "Monetary" && (
                   <input
                  type="text"
                  required
                  placeholder="Sanction per signature"
                  value={sanctionPerSignature}
                  onChange={(e) => setSanctionPerSignature(e.target.value)}
                  className="border p-2 w-full mb-2"
                />

                )}
               
            </>
            )}

            <button type="submit" className="bg-[#8A2791] rounded-[5px] text-white w-[100%] h-8">Add Event</button> 

        </div>
         </form>
    </div>
   
);
});
export default AddEventListCard;
