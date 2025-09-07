import React,{useState} from "react";
import { successAlert } from "../utils/alert";
const AddEventContributionCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{
    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("")
    const [eventFee, setEventFee] = useState("");
    

    const [selectedYear, setSelectedYear] = useState([]);
    const years  = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

    const changeEventName = (e) => setEventName(e.target.value);
    const changeEventDesc = (e) => setEventDesc(e.target.value);
    const changeEventFee = (e) => setEventFee(e.target.value);
    const changeDateFrom = (e) => setDateFrom(e.target.value);
    const changeDateTo = (e) => setDateTo(e.target.value);

    const toggleYear = (year)=>{
        setSelectedYear((prev) =>
            prev.includes(year)
            ? prev.filter((y) => y !== year)
            :[...prev, year]
        );
    };
     const handleSubmit = () =>{
        successAlert( "Event Name" + eventName +
            "Event Desc: " + eventDesc +
             "Target Years :" + selectedYear +
            "From: " + dateFrom + 
            "To: " + dateTo +
            "Event Fee" + eventFee
        );
    
      }



    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 md:w-100 w-80 h-115 px-6 font-[family-name:Arial] lg:text-sm bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-30 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold text-xl font-[family-name:Helvetica]">Add Event Contribution</span>
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                handleSubmit();
                onClose();
            }}>
            <div className="mt-4">
                <label>Event Name:</label><br />
                <input type="text" onChange={changeEventName} value={eventName} required  className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                 <label>Event Description:</label><br />
                 <textarea name="" id="" onChange={changeEventDesc} value={eventDesc} required  className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-2"></textarea>
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
                        <input type="date" onChange={changeDateTo} value={dateTo}  className="w-[100%] " />
                    </div>

                 </div>
                <label htmlFor="">Event Fee</label><br />
                <input type="text" onChange={changeEventFee} value={eventFee} required className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
            </div>
            <div className="relative mt-3">
                <button type="submit" className="bg-[#8A2791] rounded-md text-white w-[100%] h-8 absolute right-0">Add Event</button>
            </div>
            </form>
        </div>
       
    );
});
export default AddEventContributionCard;