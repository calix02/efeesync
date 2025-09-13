import React,{useState} from "react";
import {successAlert} from "../utils/alert.js";

const AddEventListCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{

const [addDates, setAddDates] = useState([{ id: Date.now(), value: "" }]);

  // Add a new date field
  const addDateField = () => {
    setAddDates([...addDates, { id: Date.now(), value: "" }]);
  };

  // Remove a date field
  const removeDateField = (id) => {
    setAddDates(addDates.filter((date) => date.id !== id));
  };

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

    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("")

    
    const [selectedYear, setSelectedYear] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [selectedSanctionType, setSelectedSanctionType]= useState([]);
    const [selectedDateType, setSelectedDateType] = useState("");

    const handleDateTypeChange = (type) => {
    setSelectedDateType(type); // only one at a time
    };


    const changeEventName = (e) => setEventName(e.target.value);
    const changeEventDesc = (e) => setEventDesc(e.target.value);
    const changeDateFrom = (e) => setDateFrom(e.target.value);
    const changeDateTo = (e) => setDateTo(e.target.value);



    const dateType = ["Straight Event","Separate Day"] ;
    const types = ["With Contribution", "With Attendance"];
    const years  = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
    const sanctionTypes = ["Monetary", "Community Service"];

    const toggleYear = (year) => {
    setSelectedYear((prev) =>
      prev.includes(year)
        ? prev.filter((y) => y !== year) // remove if already selected
        : [...prev, year] // add if not selected
    );
  };
   

    const toggleType = (type) => {
        setSelectedType((prev) =>
        prev.includes(type)
            ? prev.filter((y) => y !== type) // remove if already selected
            : [...prev, type] // add if not selected
        );
    };

    const toggleSanctionType = (type) => {
        setSelectedSanctionType((prev) =>
        prev.includes(type)
            ? prev.filter((y) => y !== type) // remove if already selected
            : [...prev, type] // add if not selected
        );
    };
   
  const handleSubmit = () =>{
    successAlert( "Event Name" + eventName +
        "Event Desc: " + eventDesc +
         "Target Years :" + selectedYear 
        + "\nType: " + selectedType +
        "From: " + dateFrom + 
        "To: " + dateTo 
    );

  }

    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 md:w-100 w-80 max-h-[90vh] hide-scrollbar overflow-y-scroll py-6 text-sm font-[family-name:Arial] px-6 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg  z-80 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className=" relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className=" border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold font-[family-name:Helvetica] text-xl">Add Event</span>
            </div>
            <form onSubmit={(e) =>{
                handleSubmit();
                onClose();
                e.preventDefault();
            }}>
            <div className="mt-4">
                <label>Event Name:</label><br />
                <input type="text" onChange={changeEventName} value={eventName} required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                 <label>Event Description:</label><br />
                 <textarea onChange={changeEventDesc} value={eventDesc} className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-2"></textarea>
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
                            <input type="date" required onChange={changeDateTo} value={dateTo} className="w-[100%] " />
                        </div>
                    </div>
                 </>
                 
                )}
                { selectedDateType === "Separate Day" && (
                    <>
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
              type="date"
              value={addDates.value}
              onChange={(e) => handleDateChange(addDates.id, e.target.value)}
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
                    <>
                    <h3 className="text-md font-bold">Contribution Details</h3>
                        <label>Event Fee:</label><br />
                        <input type="text"  required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                    </>   
                )}
                {selectedType.includes("With Attendance") && (
                <>
                    <h3 className="text-md font-bold">Attendance Details</h3>
                    <label htmlFor="">Event Logs</label>
                    <div className="border-2 border-[#8A2791] rounded-md p-2 mb-3 text-xs">
                    {getDateRange(dateFrom, dateTo).map((d, i) => {
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

                    <label htmlFor="">Sanction type</label>
                 <div className="flex gap-2 h-8 rounded-md lg:text-sm text-xs border-[#8A2791] mb-3 w-100% border-2 justify-around items-center" >
                    {sanctionTypes.map((type) => (
                    <span key={type} className="flex items-center lg:gap-1">
                        <input
                        type="checkbox" 
                        checked={selectedSanctionType.includes(type)}
                        onChange={() => toggleSanctionType(type)} className="cursor-pointer"
                    />
                    <label>{type}</label>
                    </span>
                    ))}
                </div>
                <label>Event Sanction per Signature:</label><br />
                <input type="text"  required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />




                </>
                )}

                <button type="submit" className="bg-[#8A2791] rounded-[5px] text-white w-[100%] h-8">Add Event</button> 

            </div>
             </form>
        </div>
       
    );
});
export default AddEventListCard;