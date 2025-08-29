import React,{useState} from "react";
const AddCollegeCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{
    const [collegeCode, setCollegeCode] = useState("");
    const [collegeName, setCollegeName] = useState("");

    const changeCollegeCode = (e) => setCollegeCode(e.target.value);
    const changeCollegeName = (e) => setCollegeName(e.target.value);





    return( 
        <div ref={ref}   className={` ${animate} font-[family-name:Arial] lg:w-100 w-80 h-65 px-6 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-50 inset-0 mx-auto mt-50 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-5 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold text-xl">Add College</span>
            </div>
            <div className="mt-[15px]">
                <label>College Code:</label><br />
                <input type="text" onChange={changeCollegeCode} value={collegeCode} className="border-2 border-[#174515] h-[30px] rounded-[5px] w-[100%] mb-4" /> <br />
                <label>College Name:</label><br />
                <input type="text" onChange={changeCollegeName} value={collegeName} className="border-2 border-[#174515] h-[30px] rounded-[5px] w-[100%] mb-4" /> <br />
                 
            </div>
            
                <button className="bg-[#174515] w-[100%] cursor-pointer rounded-[5px] text-white py-[5px]">Add College</button>
            
        </div>
       
    );
});
export default AddCollegeCard;