import React,{useState} from "react";
import { successAlert } from "../utils/alert";
const UpdateStudentCard = React.forwardRef(({animate, onAnimationEnd,onClose,data,reloadStudents}, ref) =>{
    const [studentId, setStudentId] = useState(data?.student_id );
    const [studentNumberId, setStudentNumberId] = useState(data?.student_number_id );
    const [lastName, setLastName] = useState(data?.last_name);
    const [firstName, setFirstName] = useState(data?.first_name);
    const [middle, setMiddle] = useState(data?.middle_initial);
    const [yearSection, setYearSection] = useState(data?.student_section);

   React.useEffect(() =>{
        if(data){
            setStudentId(data.student_id);
            setStudentNumberId(data.student_number_id);
            setLastName(data.last_name);
            setFirstName(data.first_name);
            setMiddle(data.middle_initial);
            setYearSection(data.student_section);
        }
   },[data]);

   const studentData = {
        "student_number_id": studentNumberId,
        "student_section": yearSection,
        "first_name": firstName,
        "middle_initial": middle,
        "last_name": lastName
    }

   const updateStudent = async () => {
        try {
            const res = await fetch("/api/students/" + studentId, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify(studentData)
            });

            const response = await res.json();
            // Result
            if (response.status === "success") {
                await reloadStudents();
            } else {
                errorAlert("Failed: " + response.message);
            }
        } catch (err) {
                errorAlert("Failed: " + err);
        }
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
                <input type="text" onChange={(e) =>setStudentId(e.target.value)} value={studentNumberId} required className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
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