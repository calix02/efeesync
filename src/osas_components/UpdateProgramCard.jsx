import React, {useState} from "react";
import {  errorAlert } from "../utils/alert";

const UpdateProgramCard = React.forwardRef(({animate, onAnimationEnd,onClose,data,reloadPrograms}, ref) =>{
    const [programCode, setProgramCode] = useState(data?.program_code || "");
    const [programName, setProgramName] = useState(data?.program_name || "");
    const [collegeCode, setCollegeCode] = useState(data?.department_code || "");
    const [programId, setProgramId] = useState(data?.program_id || "");
    
    const [colleges, setColleges] = useState([]);

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

        React.useEffect(() => {
        if (data) {
            setProgramCode(data.program_code);
            setProgramName(data.program_name);
            setCollegeCode(data.department_code);
            fetchColleges();
        }
        }, [data]);

        const programData = {
            "new_program_code": programCode,
            "new_program_name": programName,
            "new_department_code": collegeCode
        }

        const updateProgram = async () => {
            try {
                const res = await fetch("/api/programs/" + programId, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(programData)
                });
    
                const response = await res.json();
                if (response.status === "success") {
                    await reloadPrograms();
                } else {
                   // errorAlert("Failed: " + response.message);
                }
            } catch (err) {
               // errorAlert("Fetch failed: " + err);
            }
        }

    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-85 px-8 font-[family-name:Arial] lg:text-sm text-xs bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold lg:text-xl text-lg">Update Program</span>
            </div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                updateProgram();
                onClose();
            }}>
                <div className="mt-6">
                    <label>Program Code:</label><br />
                    <input type="text" onChange={(e) =>setProgramCode(e.target.value)} value={programCode} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                    <label>Program Name:</label><br />
                    <input type="text" onChange={(e) =>setProgramName(e.target.value)} value={programName} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                    <label>College Name:</label><br />
                    <select className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" value={collegeCode} onChange={(e) =>setCollegeCode(e.target.value)} required>
                        { colleges.map((s) => (
                            <option key={s.department_id} value={s.department_code}>{s.department_name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-[#174515] w-[100%] rounded-md text-white h-8 cursor-pointer">Update Program</button>
            </form>
        </div>
       
    );
});
export default UpdateProgramCard;