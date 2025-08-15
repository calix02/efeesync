import React from "react";
const UpdateInfo = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-[420px] w-[390px] h-120 px-8 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-[10px] absolute z-50 inset-0 mx-auto mt-30 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-[20px] border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold text-[22px]">Update Information</span>
            </div>
            <div className="mt-[15px]">
                <label>Last Name:</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" /> <br />
                <label>First Name:</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" /> <br />
                 <label>Event Name:</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" /> <br />
                 <label>Middle Initial:</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" /> <br />

                 <label>Year & Section:</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" /> <br />

                 
            </div>
            
                <button className="bg-[#561b5a] w-[100%] rounded-[5px] text-white py-[5px]">Update Information</button>
            
        </div>
       
    );
});
export default UpdateInfo;