import React from "react";
const UpdateEventCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 md:w-100 w-80 h-128 px-6 bg-white text-sm font-[family-name:Arial] shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-30 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 font-[family-name:Helvetica] border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-[family-name:Helvetica] font-semibold text-xl">Update Event Contribution</span>
            </div>
            <div className="mt-4">
                <label>Event Name:</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                 <label>Event Description:</label><br />
                 <textarea name="" id="" className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-2"></textarea>
                 <label htmlFor="">Target Year</label>
                 <div className="border-2 border-[#8A2791]  text-xs h-8 rounded-md w-[100%] mb-4 grid grid-cols-[auto_auto_auto_auto] justify-center items-center lg:gap-3 md:gap-3 gap-2">
                    <span className="flex items-center ">
                        <input type="checkbox" className="cursor-pointer" />
                        <label htmlFor="">1st Year</label>
                    </span>

                    <span className="flex items-center">
                        <input type="checkbox" className="cursor-pointer" />
                        <label htmlFor="">2nd Year</label>
                    </span>

                   <span className="flex items-center">
                        <input type="checkbox" className="cursor-pointer" />
                        <label htmlFor="">3rd Year</label>
                    </span>
                    
                    <span className="flex items-center">
                        <input type="checkbox" className="cursor-pointer" />
                        <label htmlFor="">4th Year</label>
                    </span>
                 </div>
                 <label htmlFor="">Date Range</label>
                 <div className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3 grid justify-center items-center">
                    <input type="date" className="lg:w-80 md:w-80 w-60 cursor-pointer" />
                </div>
                <label htmlFor="">Event Category</label>
               <select className="border-2 border-[#8A2791] h-8 cursor-pointer rounded-md w-[100%] mb-3 grid grid-cols-[auto_auto] justify-around items-center">
                    <option value=""></option>
                    <option value="">With Contribution</option>
                    <option value="">With Attendance</option>
                </select>
                <label htmlFor="">Sanction Type</label>
                <select className="border-2 border-[#8A2791] h-8 cursor-pointer rounded-md w-[100%] mb-3 grid grid-cols-[auto_auto] justify-around items-center">
                    <option value=""></option>
                    <option value="">Monetary</option>
                    <option value="">Communty Service</option>
                </select>
            </div>
            <div className="relative mt-4">
                <button className="bg-[#8A2791] rounded-md text-white w-30 h-8 absolute right-0">Next</button>
            </div>
        </div>
       
    );
});
export default UpdateEventCard;