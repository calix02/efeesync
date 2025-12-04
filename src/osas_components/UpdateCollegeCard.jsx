import React, {useState} from "react";
import { errorAlert } from "../utils/alert";
const UpdateCollegeCard = React.forwardRef(({animate, onAnimationEnd,onClose,data,reloadColleges}, ref) =>{
    const [collegeCode, setCollegeCode] = useState(data?.department_code || "");
    const [collegeName, setCollegeName] = useState(data?.department_name || "");
    const [collegeId, setCollegeId] = useState(data?.department_id || "");
    const [collegeColor, setCollegeColor] = useState(data?.department_color || "");
    
    React.useEffect(() => {
        if (data) {
            setCollegeCode(data.department_code);
            setCollegeName(data.department_name);
            setCollegeId(data.department_id);
            setCollegeColor(data.department_color);
        }
    }, [data]);

    const departmentData = {
        "new_department_code": collegeCode,
        "new_department_name": collegeName,
        "new_department_color": collegeColor
    }

    const updateCollege = async () =>{
        try {
            const res = await fetch("/api/departments/" + collegeId, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(departmentData)
            });

            const response = await res.json();
            if (response.status === "success") {
                await reloadColleges();
            } else {
               // errorAlert("Failed: " + response.message);
            }
        } catch (err) {
           // errorAlert("Fetch failed: " + er);
        }
    }



    return( 
        <div ref={ref}   className={` ${animate} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-83 px-6 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-50 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-5 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold lg:text-xl text-lg">Update College</span>
            </div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                updateCollege();
                onClose();
            }}>
                <div className="mt-6">
                    <label>College Code:</label><br />
                    <input type="text" onChange={(e) =>setCollegeCode(e.target.value)} value={collegeCode} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                    <label>College Name:</label><br />
                    <input type="text" onChange={(e) =>setCollegeName(e.target.value)} value={collegeName} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                    <label>College Color:</label><br />
                    <input type="color" onChange={(e) =>setCollegeColor(e.target.value)} value={collegeColor} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                    
                </div>
                <button type="submit"  className="bg-[#174515] w-[100%] rounded-md text-white h-8">Update College</button>
            </form>
        </div>
       
    );
});
export default UpdateCollegeCard;