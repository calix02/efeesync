import React, {useEffect, useState} from "react";
import { successAlert, errorAlert } from "../utils/alert";

const AddProgramCard = React.forwardRef(({animate, onAnimationEnd,onClose,reloadPrograms}, ref) =>{
    const [programCode, setProgramCode] = useState("");
    const [programName, setProgramName] = useState("");
    const [collegeCode, setCollegeCode] = useState("");
    const [colleges, setColleges] = useState([]);

    const changeProgramCode = (e) => setProgramCode(e.target.value);
    const changeProgramName = (e) => setProgramName(e.target.value);
    const changeCollegeCode = (e) => setCollegeCode(e.target.value);
    
    const fetchColleges = async () => {
        try {
            const res = await fetch("/api/departments", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setColleges(response.data);
            }
        } catch (err) {
            //alert("Fetch failed");
        }
    }

    useEffect(()=>{
        fetchColleges();
    }, []);

    const programData = {
        "program_code": programCode,
        "program_name": programName,
        "department_code": collegeCode
    }

    const addProgram = async () => {
        try {
            const res = await fetch("/api/programs", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(programData)
            });
            const response = await res.json();
            // Result
            if (response.status === "success") {
                reloadColleges();
                successAlert("Succesfully added program");
            } else {
                errorAlert("Failed: " + response.message);
            }
        } catch (err) {
                errorAlert("Failed: " + err);
        }
    }

    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-85 px-6 font-[family-name:Arial] lg:text-sm text-xs bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold lg:text-xl text-lg">Add Program</span>
            </div>
            <div className="mt-6">
                <form onSubmit={(e) =>{
                    e.preventDefault();
                    onClose();
                    addProgram();
                    reloadPrograms();
                }}>
                    <label>Program Code:</label><br />
                    <input type="text" onChange={changeProgramCode} value={programCode} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4"  required/> <br />
                    <label>Program Name:</label><br />
                    <input type="text" onChange={changeProgramName} value={programName} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" required/> <br />
                    <label>College Code:</label><br />
                    <select className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" value={collegeCode} onChange={(e) =>setCollegeCode(e.target.value)} required>
                        <option value="" hidden>
                            Select a college
                        </option>
                        { colleges.map((s) => (
                            <option key={s.department_id} value={s.department_code}>{s.department_name}</option>
                        ))}
                    </select>
                    
                    <button type="submit"  className="bg-[#174515] w-[100%] rounded-md cursor-pointer text-white h-8">Add Program</button>
                </form>
            </div>
        </div>
    );
});
export default AddProgramCard;