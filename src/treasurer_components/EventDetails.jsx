import React,{useState} from "react";
import { successAlert } from "../utils/alert";
const EventDetails = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{
    const [eventName, setEventName] = useState(data?.event_name);
    const [eventDesc, setEventDesc] = useState(data?.event_description);
    const[eventFee, setEventFee] = useState(data?.eventFee);  
    const [dateFrom, setDateFrom] = useState(data?.event_start_date);
    const [dateTo, setDateTo] = useState(data?.event_end_date);
    const [selectedYear, setSelectedYear] = useState(data?.event_target_year_levels || []);
    const [selectedType, setSelectedType] = useState(data?.eventType || []);

    // helper to normalize dates
    const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    // Ensure valid date
    if (isNaN(d)) return "";
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
    };


    React.useEffect(()=>{
        if(data){
            setEventName(data.event_name);
            setEventDesc(data.event_description);
            setEventFee(data.eventFee);
            setSelectedType(data.eventType);
            setDateFrom(formatDate(data.dateFrom));
            setDateTo(formatDate(data.dateTo));
            const yearMap = {
                "1": "1st Year, ",
                "2": "2nd Year, ",
                "3": "3rd Year, ",
                "4": "4th Year",
            };

            let levels = data.event_target_year_levels || [];

            const years = Array.isArray(levels)
            ? levels.map((y) => yearMap[y])
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
    },[data])



    
    return( 
        <div ref={ref}   className={` ${animate} lg:w-150 w-80 py-6 px-6 lg:text-sm text-xs font-[family-name:Arial] bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg z-80 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className=" relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <h1 className="text-xl mt-6 font-bold font-poppins">{eventName}</h1>
            <h3 className="flex justify-end">Date : {dateFrom} - {dateTo}</h3>
            <h3 className="font-poppins font-semibold text-md mt-3"> Event Description: </h3>
            <p className="text-justify mt-3 indent-6">{eventDesc}</p>
            <h3 className="font-poppins font-semibold text-md mt-3"> 
                Attendee: <span className="text-justify mt-3 font-normal font-[family-name:Arial] indent-6">{selectedYear}</span>
            </h3>
            <h3 className="font-poppins font-semibold text-md mt-3"> 
                Event Type: <span className="text-justify mt-3 font-normal font-[family-name:Arial] indent-6">{selectedType}</span>
            </h3>
            {selectedType.includes("With Contribution") &&(
                <h3 className="font-poppins font-semibold text-md mt-3">
                    Event Fee: <span className="text-justify mt-3 font-normal font-[family-name:Arial] indent-6">{eventFee}</span>
                </h3>
            )}
           
            {selectedType.includes("With Attendance") &&(
                <>
                 <h3 className="font-poppins font-semibold text-md mt-3">
                    Event Log/s: 
                </h3>
                <div className="font-poppins font-semibold  indent-6 text-md mt-1 text-xs">
                    <h3>Day 1: <span className="text-justify mt-3 font-normal font-[family-name:Arial] indent-6">MI,MO,AI,AO</span></h3>

                    <h3> Day 2: <span className="text-justify mt-3 font-normal font-[family-name:Arial] indent-6">MI,MO,AI,AO</span></h3>
                </div>
                </>

            )}
        </div>
       
    );
});
export default EventDetails;