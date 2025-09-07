import React,{useState} from "react";
import {successAlert} from "../utils/alert.js";

const AddEventListCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{
    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("")

    
    const [selectedYear, setSelectedYear] = useState([]);
    const [selectedType, setSelectedType] = useState([]);

    const changeEventName = (e) => setEventName(e.target.value);
    const changeEventDesc = (e) => setEventDesc(e.target.value);
    const changeDateFrom = (e) => setDateFrom(e.target.value);
    const changeDateTo = (e) => setDateTo(e.target.value);




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
        <div ref={ref}   className={` ${animate} lg:w-100 md:w-100 w-80  h-110 text-sm font-[family-name:Arial] px-6 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg  z-80 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#8A2791]">
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
                  <div className="flex gap-2 h-8 rounded-md lg:text-sm text-xs border-[#8A2791] w-100% border-2 justify-center items-center" >
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
                        <input type="date" onChange={changeDateFrom} value={dateFrom} required className="w-[100%] " />
                    </div>
                    <div className="border-2 border-[#8A2791] h-8 px-2 rounded-md w-[50%] mb-3 grid justify-center items-center">
                        <input type="date" onChange={changeDateTo} value={dateTo} className="w-[100%] " />
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

                <button type="submit" className="bg-[#8A2791] rounded-[5px] mt-6 text-white w-[100%] py-[5px]">Next</button> 

            </div>
             </form>
        </div>
       
    );
});
export default AddEventListCard;