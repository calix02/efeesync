import React, {useState} from "react";

const AddStudentCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{
   


    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-115 px-6 font-[family-name:Arial] lg:text-sm text-xs bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-30 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold lg:text-xl text-lg">Add Student</span>
            </div>
            <div className="mt-4">
                <label>Student ID:</label><br />
                <input type="text"  className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Last Name:</label><br />
                <input type="text"  className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>First Name:</label><br />
                <input type="text"  className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Middle Initial:</label><br />
                <input type="text"  className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Year &amp;  Section:</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
            </div>
            
                <button  className="bg-[#561b5a] w-[100%] cursor-pointer rounded-md text-white h-8">Add Student</button>
        </div>
       
    );
});
export default AddStudentCard;