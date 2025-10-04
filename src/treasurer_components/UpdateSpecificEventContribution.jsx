import React,{useState} from "react";
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";

const UpdateSpecificEventContribution = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{
    const[studentId, setStudentId] = useState(data?.studID);
    const[name, setName] = useState(data?.name);
    const[yearSection, setYearSection] = useState(data?.yearSection);
    const[date,setDate] = useState(data?.contriDate);
    const[totalFees, setTotalFees] = useState(data?.totalFees);
    const[balance, setBalance] = useState(data?.balance);

    React.useEffect(()=>{
        if(data){
            setStudentId(data.studID);
            setName(data.name);
            setYearSection(data.yearSection);
            setDate(data.contriDate);
            setTotalFees(data.totalFees);
            setBalance(data.balance);
        }
    },[data]);

    const handleSubmit = () =>{
        successAlert("Student ID: " + studentId +
            "Name: " + name +
            "Year & Section : " + yearSection +
            "Date: " + date + 
            "Total Fees : " + totalFees + 
            "Balance: " + balance
        )
    }






    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 md:w-100 w-80 h-130 px-6 font-[family-name:Arial] lg:text-sm bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-30 `}
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
                <label>Student ID:</label><br />
                <input type="text" onChange={(e) => setStudentId(e.target.value)} value={studentId}  required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                <label>Student Name:</label><br />
                <input type="text" onChange={(e) => setName(e.target.value)} value={name}  required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                <label>Year & Section:</label><br />
                <input type="text" onChange={(e) => setYearSection(e.target.value)} value={yearSection}  required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                <label>Contribution Date:</label><br />
                <input type="text" onChange={(e) => setDate(e.target.value)} value={date}  required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                 <label>Total Fees:</label><br />
                <input type="text" onChange={(e) => setTotalFees(e.target.value)} value={totalFees}  required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                 <label>Balance:</label><br />
                <input type="text" onChange={(e) => setBalance(e.target.value)} value={balance}  required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />    
            </div>
            <div className="relative mt-3">
                <button type="submit" className="bg-[#8A2791] rounded-md text-white w-[100%] h-8 absolute right-0">Update</button>
            </div>
            </form>
        </div>
       
    );
});
export default UpdateSpecificEventContribution;