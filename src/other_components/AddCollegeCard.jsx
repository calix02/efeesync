import React from "react";
const AddCollegeCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-[420px] w-[390px] h-65 px-[30px] bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-[10px] absolute z-50 inset-0 mx-auto mt-[120px] `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-[20px] border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold text-[22px]">Add College</span>
            </div>
            <div className="mt-[15px]">
                <label>College Code:</label><br />
                <input type="text" className="border-2 border-[#174515] h-[30px] rounded-[5px] w-[100%] mb-4" /> <br />
                <label>College Name:</label><br />
                <input type="text" className="border-2 border-[#174515] h-[30px] rounded-[5px] w-[100%] mb-4" /> <br />
                 
            </div>
            
                <button className="bg-[#174515] w-[100%] rounded-[5px] text-white py-[5px]">Add Student</button>
            
        </div>
       
    );
});
export default AddCollegeCard;