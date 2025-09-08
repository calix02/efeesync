import React,{useState} from "react";
import { successAlert, errorAlert } from "../utils/alert";

const UpdateStudentOsasCard = React.forwardRef(({animate, onAnimationEnd,onClose,data,colleges,reloadStudents}, ref) =>{
    const [studId, setStudId] = useState(data?.student_number_id || "");
    const [firstName, setFirstName] = useState(data?.first_name || "");
    const [mi, setMI] = useState(data?.middle_initial || "");
    const [section,setSection] = useState(data?.student_section || "");
    const [lastName, setLastName] = useState(data?.last_name || "");
    const [college, setCollege] = useState(data?.department_code || "");
    const [program, setProgram] = useState(data?.program_code || "");
    const [programs, setPrograms] = useState([]);

    const fetchPrograms = async (department_code) => {
        try {
            const res = await fetch("/api/departments/code/" + department_code + "/programs", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setPrograms(response.data);
                if (response.data.length > 0) {
                    setProgram(response.data[0].program_id);
                } else {
                    setProgram("");
                }
            }
        } catch (err) {
            // alert("Fetch failed");
        }
    }

    React.useEffect(() => {
        if(data){
            setStudId(data.student_number_id);
            setFirstName(data.first_name);
            setMI(data.middle_initial);
            setLastName(data.last_name);
            setSection(data.student_section);
            setCollege(data.department_code);
            setProgram(data.program_code);
            fetchPrograms(college);
        }
    },[data]);

    const studentData = {
        "student_number_id": studId,
        "student_section": section,
        "first_name": firstName,
        "middle_initial": mi,
        "last_name": lastName,
        "student_current_program": program
    }

    const updateStudent = async () => {
        try {
            const res = await fetch("/api/students/" + data.student_id, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify(studentData)
            });

            const response = await res.json();
            // Result
            if (response.status === "success") {
                reloadStudents();
                successAlert("Succesfully updated student");
            } else {
                errorAlert("Failed: " + response.message);
            }
        } catch (err) {
                errorAlert("Failed: " + err);
        }
        // alert("Stud ID: " + studId + "\nName: " + name + "\nCollege: " + college + "\nProgram: " + program);
    }

    const changeStudNumId = (value) => {

    }

    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-153 font-[family-name:Arial] lg:text-sm text-xs px-6 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-15 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold lg:text-xl text-lg">Update Student</span>
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                updateStudent();
                onClose();
            }}>
            <div className="mt-6">
                <label>Student ID:</label><br />
                <input type="text" onChange={(e) => setStudId(e.target.value)  } required value={studId} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" maxLength={7}/> <br />
                <label>Last Name:</label><br />
                <input type="text" onChange={(e) =>setLastName(e.target.value)} required value={lastName} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>First Name:</label><br />
                <input type="text" onChange={(e) =>setFirstName(e.target.value)} required value={firstName} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Middle Initial:</label><br />
                <input type="text" onChange={(e) =>setMI(e.target.value)} value={mi} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" maxLength={3}/> <br />
                 <label>Section:</label><br />
                <input type="text" onChange={(e) =>setSection(e.target.value)} value={section} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" maxLength={3}/> <br />
                
                <label>College:</label><br />
                <select value={college} onChange={(e) => {setCollege(e.target.value); fetchPrograms(e.target.value) }} required className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4"  name="" id="">
                    { colleges.map((s) => (
                        <option key={s.department_id} value={s.department_code}>{s.department_name}</option>
                    ))}
                </select>
                 <label>Program:</label><br />
                  <select value={program} onChange={(e) =>setProgram(e.target.value)} required className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4"  name="" id="">
                    { programs.map((s) => (
                        <option key={s.program_id} value={s.program_id}>{s.program_name}</option>
                    )) }
                </select>
            </div>
                <button type="submit" className="bg-[#174515] w-[100%] rounded-md text-white h-8 cursor-pointer">Update Student</button>
            </form>
        </div>
       
    );
});
export default UpdateStudentOsasCard;