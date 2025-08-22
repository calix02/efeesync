import React from "react";
const AddEventListCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 md:w-100 w-80  h-115 text-sm font-[family-name:Arial] px-6 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-30 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold font-[family-name:Helvetica] text-xl">Add Event</span>
            </div>
            <div className="mt-4">
                <label>Event Name:</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-3" /> <br />
                 <label>Event Description:</label><br />
                 <textarea name="" id="" className="border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-2"></textarea>
                 <label htmlFor="">Target Year</label>
                 <div className="border-2 border-[#8A2791] h-8 rounded-md text-xs w-[100%] mb-4 grid grid-cols-[auto_auto_auto_auto] justify-center items-center lg:gap-3 md:gap-3 gap-2">
                    <span>
                        <input type="checkbox" />
                        <label htmlFor="">1st Year</label>
                    </span>

                    <span>
                        <input type="checkbox" />
                        <label htmlFor="">2nd Year</label>
                    </span>

                    <span>
                        <input type="checkbox" />
                        <label htmlFor="">3rd Year</label>
                    </span>
                    
                    <span >
                        <input type="checkbox" />
                        <label htmlFor="">4th Year</label>
                    </span> 
                 </div>
                 <label htmlFor="">Date Range</label>
                 <div className="w-[100%] flex lg:gap-3 md:gap-3 gap-1">
                    <div className="border-2 border-[#8A2791] h-8 px-2 rounded-md w-[50%] mb-3 grid justify-center items-center">
                        <input type="date" className="w-[100%] " />
                    </div>
                    <div className="border-2 border-[#8A2791] h-8 px-2 rounded-md w-[50%] mb-3 grid justify-center items-center">
                        <input type="date" className="w-[100%] " />
                    </div>

                 </div>
                 
                <label htmlFor="">Event Category</label>
                <div className="border-2 border-[#8A2791] flex justify-between px-8 items-center h-8  rounded-md w-[100%] mb-3">
                    <span className="flex items-center">
                        <input type="checkbox" />
                        <p>With Attendance</p>
                    </span>
                    <span className="flex items-center">
                        <input type="checkbox" />
                        <p>With Contribution</p>
                    </span>

                </div>

                <button className="bg-[#8A2791] rounded-[5px] mt-[5px] text-white w-[100%] py-[5px]">Next</button> 
            </div>
        </div>
       
    );
});
export default AddEventListCard;