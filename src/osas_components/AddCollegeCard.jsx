import React,{useEffect, useState} from "react";
import { successAlert, errorAlert } from "../utils/alert";

const AddCollegeCard = React.forwardRef(({animate, onAnimationEnd,onClose, reloadColleges}, ref) =>{
    const [collegeCode, setCollegeCode] = useState("");
    const [collegeName, setCollegeName] = useState("");
    const [collegeColor, setCollegeColor] = useState("");

    const changeCollegeCode = (e) => setCollegeCode(e.target.value);
    const changeCollegeName = (e) => setCollegeName(e.target.value);
    const changeCollegeColor = (e) => setCollegeColor(e.target.value);


    const departmentData = {
        "department_code": collegeCode,
        "department_name": collegeName,
        "department_color": collegeColor,
    }
    const addCollege = async () => {
        try {
            const res = await fetch("/api/departments", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(departmentData)
            });

            const response = await res.json();

            // Result
            if (response.status === "success") {
                await reloadColleges();
            } else {
                errorAlert("Failed: " + response.message);
            }
        } catch (err) {
                errorAlert("Failed: " + response.message);
        }
    }
    return( 
        <div ref={ref}   className={` ${animate} font-[family-name:Arial] lg:text-sm text-xs  lg:w-100 w-80 h-80 px-6 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-50 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-4 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold lg:text-xl text-lg">Add College</span>
            </div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                onClose();
                addCollege();

            }} >
                <div className="mt-6">
                    <label>College Code:</label><br />
                    <input type="text" onChange={changeCollegeCode} value={collegeCode} className="border-2 border-[#174515] px-2 h-8 rounded-md w-[100%] mb-4" required/> <br />
                    <label>College Name:</label><br />
                    <input type="text" onChange={changeCollegeName} value={collegeName} className="border-2 border-[#174515] px-2 h-8 rounded-md w-[100%] mb-4" required/> <br />
                     <label>College Color:</label><br />
                    <input type="color" onChange={changeCollegeColor} value={collegeColor} className="border-2 border-[#174515] cursor-pointer px-2 h-8 rounded-md w-[100%] mb-4" required/> <br />
                    
                    
                </div>
                <button type="submit"  className="bg-[#174515] w-[100%] h-8 cursor-pointer rounded-md text-white ">Add College</button>
            </form>
            
        </div>
       
    );
});
export default AddCollegeCard;