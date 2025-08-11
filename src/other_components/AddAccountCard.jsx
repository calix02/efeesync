import React from "react";
const AddAccountCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-110 w-[390px] h-105 px-8 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-50 inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold text-2xl">Add Treasurer</span>
            </div>
            <div className="mt-[15px]">
                <label>Organization</label><br />
                <input type="text" className="border-2 border-[#174515] h-[30px] rounded-[5px] w-[100%] mb-4" /> <br />
                <label>Student ID:</label><br />
                <input type="text" className="border-2 border-[#174515] h-[30px] rounded-[5px] w-[100%] mb-4" /> <br />
                 <label>Treasurer's Name:</label><br />
                <input type="text" className="border-2 border-[#174515] h-[30px] rounded-[5px] w-[100%] mb-4" /> <br />
                 <label>College:</label><br />
                <input type="text" className="border-2 border-[#174515] h-[30px] rounded-[5px] w-[100%] mb-4" /> <br />
            </div>
            
                <button className="bg-[#174515] w-[100%] rounded-[5px] text-white py-[5px]">Add Treasurer</button>
            
        </div>
       
    );
});
export default AddAccountCard;