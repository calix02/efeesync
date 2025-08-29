import React, {useState} from "react";
const UpdateProgramCard = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{
     const [programCode, setProgramCode] = useState(data?.programCode || "");
        const [programName, setProgramName] = useState(data?.name || "");
        const [collegeCode, setCollegeCode] = useState(data?.collegeCode || "");

        React.useEffect(() => {
        if (data) {
            setProgramCode(data.programCode);
            setProgramName(data.name);
            setCollegeCode(data.collegeCode);

        }
        }, [data]);
    
        const updateProgram = () =>{
            alert("Program Code: "+ programCode + "\nProgram Name:" +programName + "\nCollege Code:" +collegeCode);
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
            <div className="mt-6">
                <label>Program Code:</label><br />
                <input type="text" onChange={(e) =>setProgramCode(e.target.value)} value={programCode} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Program Name:</label><br />
                <input type="text" onChange={(e) =>setProgramName(e.target.value)} value={programName} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>College Code:</label><br />
                <input type="text" onChange={(e) =>setCollegeCode(e.target.value)}  value={collegeCode} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 
            </div>
            
                <button onClick={()=>{updateProgram(); onClose();}} className="bg-[#174515] w-[100%] rounded-md text-white h-8">Add Program</button>
            
        </div>
       
    );
});
export default UpdateProgramCard;