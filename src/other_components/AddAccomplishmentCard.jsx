
import React from "react";
const AddAccomplishmentCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-[420px] w-[390px] h-[440px] px-[30px] bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-[10px] absolute z-50 inset-0 mx-auto mt-[120px] `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-[20px] border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold text-[22px]">Add Accomplishment Report</span>
            </div>
            <div className="mt-[15px]">
                <label>Event Name :</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-[30px] rounded-[5px] w-[100%] mb-4" /> <br />
                <label>Event Description:</label><br />
               <textarea className="border-2 border-[#8A2791] h-[30px] rounded-[5px] w-[100%] mb-4" name="" id=""></textarea>
               <div className="bg-[#c3c3c3c2] flex flex-col justify-center items-center  w-[100%] h-[140px] rounded-[10px] mb-4">
                    <i className="fa-solid fa-arrow-up-from-bracket text-[25px]"></i>
                    <p className="text-[14px]">Upload image or file.</p>
                    <div className=" relative w-[100%] mt-[10px] flex justify-center">
                        <button className="w-[90px] h-[30px] cursor-pointer  border-1 rounded-[5px] border-[#621668] text-[#621668] absolute">Browse</button>
                        <input type="file" className="bg-amber-200 py-1 z-[1] w-[90px] opacity-0 " />
                    </div>
               </div>
            </div>
            
                <button className="bg-[#561b5a] w-[100%] rounded-[5px] text-white py-[5px]">Add Report</button>
            
        </div>
       
    );
});
export default AddAccomplishmentCard;