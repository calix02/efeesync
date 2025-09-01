import React, {useState} from "react";
const UpdateCollegeCard = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{
    const [collegeCode, setCollegeCode] = useState(data?.code || "");
        const [collegeName, setCollegeName] = useState(data?.name || "");
    
         React.useEffect(() => {
        if (data) {
            setCollegeCode(data.code);
            setCollegeName(data.name);
        }
    }, [data]);
    
        const updateCollege = () =>{
            
            alert("College Code:" + collegeCode +
                "\nCollege Name:" + collegeName
            );
           
    
        }


    return( 
        <div ref={ref}   className={` ${animate} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-65 px-6 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-50 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-5 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold lg:text-xl text-lg">Update College</span>
            </div>
            <div className="mt-6">
                <label>College Code:</label><br />
                <input type="text" onChange={(e) =>setCollegeCode(e.target.value)} value={collegeCode} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>College Name:</label><br />
                <input type="text" onChange={(e) =>setCollegeName(e.target.value)} value={collegeName} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 
            </div>
                <button onClick={()=> {updateCollege(); onClose();}} className="bg-[#174515] w-[100%] rounded-md text-white h-8">Update College</button>
        </div>
       
    );
});
export default UpdateCollegeCard;