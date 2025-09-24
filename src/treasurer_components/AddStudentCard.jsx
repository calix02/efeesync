import React, {useState} from "react";
import { successAlert, errorAlert } from "../utils/alert";

const AddStudentCard = React.forwardRef(({animate, onAnimationEnd,onClose,currentUser,reloadStudents}, ref) =>{
    const [studentId, setStudentId] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middle, setMiddle] = useState("");
    const [yearSection, setYearSection] = useState("");

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
        "student_current_program": currentUser.program_id
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
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-115 px-6 font-[family-name:Arial] lg:text-sm text-xs bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg  z-80 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold lg:text-xl text-lg">Add Student</span>
            </div>
            <form onSubmit={(e)=>{
                addStudent();
                onClose();
                e.preventDefault();

            }} >
            <div className="mt-4">
                <label>Student ID:</label><br />
                <input type="text" onChange={changeStudentID} required value={studentId} maxLength={7}  className=" px-2 border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Last Name:</label><br />
                <input type="text" onChange={changeLastName} required value={lastName}  className=" px-2 border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>First Name:</label><br />
                <input type="text" onChange={changeFirstName} required value={firstName}  className=" px-2 border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Middle Initial:</label><br />
                <input type="text" onChange={changeMiddle} value={middle}  className=" px-2 border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" maxLength={3}/> <br />
                <label>Year &amp;  Section:</label><br />
                <input type="text" onChange={changeYearSection} required value={yearSection} className=" px-2 border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" maxLength={3}/> <br />
            </div>
            
                <button type="submit"  className="bg-[#561b5a] w-[100%] cursor-pointer rounded-md text-white h-8">Add Student</button>
            </form>
        </div>
       
    );
});
export default AddStudentCard;