import React from "react";
const AddEventContributionCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-[420px] w-[390px] h-[550px] px-[30px] bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-[10px] absolute z-50 inset-0 mx-auto mt-[120px] `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-[20px] border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold text-[22px]">Add Event Contribution</span>
            </div>
            <div className="mt-[15px]">
                <label>Event Name:</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-[30px] rounded-[5px] w-[100%] mb-3" /> <br />
                 <label>Event Description:</label><br />
                 <textarea name="" id="" className="border-2 border-[#8A2791] h-[30px] rounded-[5px] w-[100%] mb-2"></textarea>
                 <label htmlFor="">Target Year</label>
                 <div className="border-2 border-[#8A2791] h-[30px] rounded-[5px] w-[100%] mb-4 grid grid-cols-[auto_auto_auto_auto] justify-center items-center gap-[15px]">
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
                 <div className="border-2 border-[#8A2791] h-[30px] rounded-[5px] w-[100%] mb-3 grid justify-center items-center">
                    <input type="date" className="w-[330px] " />

                </div>
                <label htmlFor="">Event Category</label>
               <select className="border-2 border-[C] h-[30px] rounded-[5px] w-[100%] mb-3 grid grid-cols-[auto_auto] justify-around items-center">
                    <option value=""></option>
                    <option value="">With Contribution</option>
                    <option value="">With Attendance</option>
                </select>
                <label htmlFor="">Sanction Type</label>
                <select className="border-2 border-[#8A2791] h-[30px] rounded-[5px] w-[100%] mb-3 grid grid-cols-[auto_auto] justify-around items-center">
                    <option value=""></option>
                    <option value="">Monetary</option>
                    <option value="">Communty Service</option>
                </select>
            </div>
            <div className="relative mt-[20px]">
                <button className="bg-[#8A2791] rounded-[5px] text-white w-[110px] py-[5px] absolute right-0">Next</button>
            </div>
        </div>
       
    );
});
export default AddEventContributionCard;