import React,{useState} from "react";
import { successAlert } from "../utils/alert";
const UpdateStudentCard = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{
    const [studentId, setStudentId] = useState(data?.id );
    const [lastName, setLastName] = useState(data?.lastName);
    const [firstName, setFirstName] = useState(data?.firstName);
    const [middle, setMiddle] = useState(data?.middleName);
    const [yearSection, setYearSection] = useState(data?.yearSection);

   React.useEffect(() =>{
        if(data){
            setStudentId(data.id);
            setLastName(data.lastName);
            setFirstName(data.firstName);
            setMiddle(data.middleName);
            setYearSection(data.yearSection);
        }
   },[data]);

   const updateStudent = () =>{
         successAlert("Student Id: " + studentId +
                    "\nLastName: " + lastName +
                    "\nFirstName: " + firstName +
                    "\nMiddle: " + middle + 
                    "\nYear & Section: " + yearSection
                );
   }

    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-117 px-6 lg:text-sm text-xs font-[family-name:Arial] bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg z-80 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 font-[family-name:Helvetica] border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold text-xl">Update Student</span>
            </div>
            <form onSubmit={(e)=>{
                updateStudent();
                onClose();
                e.preventDefault();

            }}>
            <div className="mt-4">
                <label>Student ID:</label><br />
                <input type="text" onChange={(e) =>setStudentId(e.target.value)} value={studentId} required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Last Name:</label><br />
                <input type="text" onChange={(e) =>setLastName(e.target.value)} value={lastName} required  className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>First Name:</label><br />
                <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Middle Initial:</label><br />
                <input type="text" onChange={(e) => setMiddle(e.target.value)} value={middle} className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Year &amp;  Section:</label><br />
                <input type="text" onChange={(e) => setYearSection(e.target.value)} value={yearSection} required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
            </div>
            
                <button type="submit"  className="bg-[#561b5a] w-[100%] cursor-pointer rounded-md text-white h-8">Update Student</button>
            </form>
            
        </div>
       
    );
});
export default UpdateStudentCard;