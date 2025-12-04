import React,{useState} from "react";
import { successAlert, errorAlert } from "../utils/alert";
const UpdateStudentCard = React.forwardRef(({animate, onAnimationEnd,onClose,data,reloadStudents,code}, ref) =>{
 const colors = {
            CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
            CESC: "border-[#020180] text-[#020180] bg-[#020180]",
            CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
            SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]"
        };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    const [studentId, setStudentId] = useState(data?.student_id );
    const [studentNumberId, setStudentNumberId] = useState(data?.student_number_id);
    const [lastName, setLastName] = useState(data?.last_name);
    const [firstName, setFirstName] = useState(data?.first_name);
    const [middle, setMiddle] = useState(data?.middle_initial);
    const [yearSection, setYearSection] = useState(data?.student_section);
    const [programId, setProgramId] = useState(data?.student_current_program);

   React.useEffect(() =>{
        if(data){
            setStudentId(data.student_id);
            setStudentNumberId(data.student_number_id);
            setLastName(data.last_name);
            setFirstName(data.first_name);
            setMiddle(data.middle_initial);
            setYearSection(data.student_section);
            setProgramId(data.student_current_program);
        }
   }, [data]);

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
        <div ref={ref}   className={` ${animate} ${color} lg:w-100 w-80 h-117 px-6 lg:text-sm text-xs font-[family-name:Arial] bg-white rounded-lg z-80 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 font-[family-name:Helvetica] border-b-4">
                <span className="font-semibold text-xl">Update Student</span>
            </div>
            <form onSubmit={(e)=>{
                updateStudent();
                onClose();
                e.preventDefault();

            }}>
            <div className="mt-4">
                <label>Student ID:</label><br />
                <input type="text" onChange={(e) => setStudentNumberId(e.target.value)} value={studentNumberId} maxLength={7} required className="border-2 px-2  h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Last Name:</label><br />
                <input type="text" onChange={(e) =>setLastName(e.target.value)} value={lastName} required  className="border-2 px-2 h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>First Name:</label><br />
                <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} required className="border-2 px-2 h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Middle Initial:</label><br />
                <input type="text" onChange={(e) => setMiddle(e.target.value)} value={middle} className="border-2 px-2 h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Year &amp;  Section:</label><br />
                <input type="text" onChange={(e) => setYearSection(e.target.value)} value={yearSection} maxLength={3} required className="border-2 px-2 h-8 rounded-md w-[100%] mb-4" /> <br />
            </div>
            
                <button type="submit"  className={` ${color} w-[100%] cursor-pointer rounded-md text-white h-8`}>Update Student</button>
            </form>
            
        </div>
       
    );
});
export default UpdateStudentCard;