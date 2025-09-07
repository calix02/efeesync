import React,{useState} from "react";
import { successAlert } from "../utils/alert";
const UpdateEventContributionCard = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{

    const [eventName, setEventName] = useState(data?.eventName);
    const [dateFrom, setDateFrom] = useState(data?.dateFrom);
    const [dateTo, setDateTo] = useState(data?.dateTo)
    const [eventFee, setEventFee] = useState(data?.eventFee);
    const [selectedYear, setSelectedYear] = useState(data?.targetYear || []);

         // helper to normalize dates
    const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    // Ensure valid date
    if (isNaN(d)) return "";
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
    };

    React.useEffect(() =>{
        if(data){
            setEventName(data.eventName);
            setDateFrom(formatDate(data.dateFrom));
            setDateTo(formatDate(data.dateTo));
            setEventFee(data.eventFee);

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
        }
    },[data]);

     const years  = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

    const toggleYear = (year) => {
    setSelectedYear((prev) =>
      prev.includes(year)
        ? prev.filter((y) => y !== year) // remove if already selected
        : [...prev, year] // add if not selected
    );
  };
    const handleSubmit = () =>{
            successAlert( "Event Name" + eventName +
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
                <span className="text-[#8A2791] font-semibold text-xl font-[family-name:Helvetica]">Update Event Contribution</span>
            </div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                handleSubmit();
                onClose();
            }}>
            <div className="mt-4">
                <label>Event Name:</label><br />
                <input type="text" onChange={(e) =>setEventName(e.target.value)} value={eventName} required className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                 <label>Event Description:</label><br />
                 <textarea name="" id="" className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-2"></textarea>
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
                        <input type="date" onChange={(e) => setDateFrom(e.target.value)} value={dateFrom} required className="w-[100%] " />
                    </div>
                    <div className="border-2 border-[#8A2791] h-8 px-2 rounded-md w-[50%] mb-3 grid justify-center items-center">
                        <input type="date" onChange={(e) => setDateTo(e.target.value)} value={dateTo}  className="w-[100%] " />
                    </div>

                 </div>
                <label htmlFor="">Event Fee</label><br />
                <input type="text" onChange={(e) => setEventFee(e.target.value)} value={eventFee} required  className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
            </div>
            <div className="relative mt-3">
                <button type="submit" className="bg-[#8A2791] rounded-md text-white w-[100%] h-8 absolute right-0">Update Event</button>
            </div>
            </form>
        </div>
       
    );
});
export default UpdateEventContributionCard;