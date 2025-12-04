import React, {useState} from "react";
import { successAlert, errorAlert } from "../utils/alert";

const AddStudentCard = React.forwardRef(({animate, onAnimationEnd,onClose,currentUser,reloadStudents, code, programs}, ref) =>{
    const colors = {
            CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
            CESC: "border-[#020180] text-[#020180] bg-[#020180]",
            CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
            SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]"
        };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    const [studentId, setStudentId] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middle, setMiddle] = useState("");
    const [yearSection, setYearSection] = useState("");
    const [program, setProgram] = useState(currentUser.program_id);

    const changeStudentID = (e) => setStudentId(e.target.value);
    const changeLastName = (e) => setLastName(e.target.value);
    const changeFirstName = (e) => setFirstName(e.target.value);
    const changeMiddle = (e) => setMiddle(e.target.value);
    const changeYearSection = (e) => setYearSection(e.target.value);

    const studentData = {
        "student_number_id": studentId,
        "student_section": yearSection,
        "first_name": firstName,
        "last_name": lastName,
        "student_current_program": program
    }

    if (middle !== "") {
        studentData.middle_initial = middle;
    }

    const addStudent = async () =>{
        try {
            const res = await fetch("/api/students", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(studentData)
            });
            const response = await res.json();
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
        <div ref={ref}   className={` ${animate} ${color} lg:w-100 w-80 h-132 px-6 font-[family-name:Arial] lg:text-sm text-xs bg-white  rounded-lg  z-80 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 ">
                <span className="font-semibold lg:text-xl text-lg">Add Student</span>
            </div>
            <form onSubmit={(e)=>{
                addStudent();
                onClose();
                e.preventDefault();

            }} >
            <div className="mt-4">
                <label>Student ID:</label><br />
                <input type="text" onChange={changeStudentID} required value={studentId} maxLength={7}  className=" px-2 border-2  h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Last Name:</label><br />
                <input type="text" onChange={changeLastName} required value={lastName}  className=" px-2 border-2  h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>First Name:</label><br />
                <input type="text" onChange={changeFirstName} required value={firstName}  className=" px-2 border-2 h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Middle Initial:</label><br />
                <input type="text" onChange={changeMiddle} value={middle}  className=" px-2 border-2  h-8 rounded-md w-[100%] mb-4" maxLength={3}/> <br />
                <label>Year &amp;  Section:</label><br />
                <input type="text" onChange={changeYearSection} required value={yearSection} className=" px-2 border-2 h-8 rounded-md w-[100%] mb-4" maxLength={3}/> <br />
                <label>Program:</label><br />
                  <select value={program} onChange={(e) => setProgram(e.target.value) } required className="border-2 px-2 border-[#174515] cursor-pointer h-8 rounded-md w-[100%] mb-4"  name="" id="">
                    { programs.map((s) => (
                        <option key={s.program_id} value={s.program_id}>{s.program_name}</option>
                    )) }
                </select>
            </div>
            
                <button type="submit"  className={`${color} w-[100%] cursor-pointer rounded-md text-white h-8`}>Add Student</button>
            </form>
        </div>
       
    );
});
export default AddStudentCard;