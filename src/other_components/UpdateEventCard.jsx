import React,{useState} from "react";
import {successAlert} from "../utils/alert.js";

const UpdateEventCard = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{
    const [eventName, setEventName] = useState(data?.eventName);
    const [eventDesc, setEventDesc] = useState(data?.eventDesc);
    const [dateFrom, setDateFrom] = useState(data?.dateFrom );
    const [dateTo, setDateTo] = useState(data?.dateTo );

    const [selectedYear, setSelectedYear] = useState(data?.targetYear || []);
    const [selectedType, setSelectedType] = useState(data?.eventType || []);

        // helper to normalize dates
    const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    // Ensure valid date
    if (isNaN(d)) return "";
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
    };

    React.useEffect(() => {
    if (data) {
        setEventName(data.eventName || "");
        setEventDesc(data.eventDesc || "");
        setDateFrom(formatDate(data.dateFrom));
        setDateTo(formatDate(data.dateTo));

        // convert "1,2,3,4" -> ["1st Year", "2nd Year", "3rd Year", "4th Year"]
        const yearMap = {
        "1": "1st Year",
        "2": "2nd Year",
        "3": "3rd Year",
        "4": "4th Year",
        };
        const years = data.targetYear
        ? data.targetYear.split(",").map((y) => yearMap[y.trim()])
        : [];
        setSelectedYear(years);

        // convert "Attendance" -> ["With Attendance"]
        // or "Contribution" -> ["With Contribution"]
        const typeMap = {
        Attendance: "With Attendance",
        Contribution: "With Contribution",
        };
        const types = data.eventType
        ? data.eventType.split(",").map((t) => typeMap[t.trim()])
        : [];
        setSelectedType(types);
    }
    }, [data]);


    const types = ["With Contribution", "With Attendance"];
    const years  = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

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
        <div ref={ref}   className={` ${animate} lg:w-100 md:w-100 w-80  h-115 text-sm font-[family-name:Arial] px-6 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg  z-80 inset-0 mx-auto`}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold font-[family-name:Helvetica] text-xl">Update Event</span>
            </div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                handleSubmit();
                onClose();
               
            }}>
            <div className="mt-4">
                <label>Event Name:</label><br />
                <input type="text" onChange={(e) =>setEventName(e.target.value)} value={eventName} className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                 <label>Event Description:</label><br />
                 <textarea onChange={(e) =>setEventDesc(e.target.value)} value={eventDesc} className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-2"></textarea>
                 <label htmlFor="">Target Year</label>
                  <div className="flex gap-2 h-8 rounded-md lg:text-sm text-xs border-[#8A2791] w-100% mb-4 border-2 justify-center items-center" >
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
                
                 <label htmlFor="">Date Range</label>
                 <div className="w-[100%] flex lg:gap-3 md:gap-3 gap-1">
                    <div className="border-2 border-[#8A2791] h-8 px-2 rounded-md w-[50%] mb-3 grid justify-center items-center">
                        <input type="date" onChange={(e) => setDateFrom(e.target.value)} value={dateFrom} className="w-[100%] " />
                    </div>
                    <div className="border-2 border-[#8A2791] h-8 px-2 rounded-md w-[50%] mb-3 grid justify-center items-center">
                        <input type="date" onChange={(e) => setDateTo(e.target.value)} value={dateTo} className="w-[100%] " />
                    </div>

                 </div>
                 
                <label htmlFor="">Event Category</label>
                 <div className="flex gap-2 h-8 rounded-md lg:text-sm text-xs border-[#8A2791] w-100% border-2 justify-around items-center" >
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

                <button type="submit" className="bg-[#8A2791] rounded-[5px] mt-6 text-white w-[100%] h-8">Next</button> 

            </div>
             </form>
        </div>
       
    );
});
export default UpdateEventCard;