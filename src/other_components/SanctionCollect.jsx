import React,{useState} from "react";
import { successAlert } from "../utils/alert";
const SanctionCollect = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{
    const[studentId, setStudentId] = useState(data?.studID);
    const[studentName, setStudentName] = useState(data?.studName);
    const[yearSection,setYearSection] = useState(data?.yearSection);
    const[eventName, setEventName] = useState(data?.eventName);
    const[totalSanction, setTotalSanction] = useState(data?.totalSanction);
    const [balance, setBalance] = useState(data?.balance);
    const [collectedAmount, setCollectedAmount] = useState("");


    React.useEffect(() =>{
        if(data){
            setStudentId(data.studID);
            setStudentName(data.studName);
            setYearSection(data.yearSection);
            setEventName(data.eventName);
            setTotalSanction(data.totalSanction);
            setBalance(data.balance);
        }
    },[data]);

    const handleSubmit = () =>{
        successAlert("Student Id: " + studentId + 
            "Student Name: " + studentName + 
            "Year " + yearSection + 
            "Event Name: " + eventName +
            "Total Sanction: " + totalSanction +
            "Balance: " + balance +
            "Collected Amount " + collectedAmount
        )

    }

    


    return( 
        <div ref={ref}   className={` ${animate} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80  h-148 px-6 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg  z-80 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-[20px] border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold text-[22px]">Collect Sanctions Fees</span>
            </div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                handleSubmit();
                onClose();
            }}>
            <div className="mt-[15px]">
                <label>Student ID:</label><br />
                <input type="text" onChange={(e) =>setStudentId(e.target.value)} value={studentId} required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Student Name:</label><br />
                <input type="text" onChange={(e) => setStudentName(e.target.value)} value={studentName} required  className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Year & Section:</label><br />
                <input type="text" onChange={(e) => setYearSection(e.target.value)} value={yearSection} required  className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Event Name:</label><br />
                <input type="text" onChange={(e) => setEventName(e.target.value)} value={eventName} required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Total Sanctions:</label><br />
                <input type="text" onChange={(e) => setTotalSanction(e.target.value)} value={totalSanction} required  className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Balance:</label><br />
                <input type="text" onChange={(e) => setBalance(e.target.value)} value={balance} required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Collected Amount:</label><br />
                <input type="text" onChange={(e) => setCollectedAmount(e.target.value)} value={collectedAmount} required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br/>
            </div>
            
                <button type="submit" className="bg-[#561b5a] w-[100%] rounded-md text-white h-8">Collect Sanctions</button>
            </form>
            
        </div>
       
    );
});
export default SanctionCollect;