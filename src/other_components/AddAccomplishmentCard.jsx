
import React from "react";
const AddAccomplishmentCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 md:w-100 w-80 lg:h-105 md:h-105 h-115 px-6 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg text-sm font-[family-name:Arial] absolute z-80 inset-0 mx-auto mt-30 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-6 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-3 border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold text-xl">Add Accomplishment Report</span>
            </div>
            <div className="mt-6">
                <label>Event Name :</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-8 rounded-sm w-[100%] mb-4" /> <br />
                <label>Event Description:</label><br />
               <textarea className="border-2 border-[#8A2791] h-8 rounded-sm w-[100%] mb-4" name="" id=""></textarea>
               <div className="bg-[#c3c3c3c2] flex flex-col justify-center items-center  w-[100%] h-35 rounded-sm mb-4">
                    <i className="fa-solid fa-arrow-up-from-bracket text-[25px]"></i>
                    <p className="text-[14px]">Upload image or file.</p>
                    <div className=" relative w-[100%] mt-[10px] flex justify-center">
                        <button className="w-30 h-8 cursor-pointer  border-1 rounded-sm border-[#621668] text-[#621668] absolute">Browse</button>
                        <input type="file" className="bg-amber-200 py-1.5 z-[1] w-30 opacity-0 " />
                    </div>
               </div>
            </div>
            
                <button className="bg-[#561b5a] w-[100%] rounded-sm text-white h-8">Add Report</button>
            
        </div>
       
    );
});
export default AddAccomplishmentCard;