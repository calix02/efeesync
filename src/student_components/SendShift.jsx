import React from "react";
const SendShift = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-[420px] w-[390px] h-105 px-8 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-[10px] absolute z-50 inset-0 mx-auto mt-35 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-[20px] border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold text-[22px]">Shifting Request</span>
            </div>
            <div className="mt-[15px]">
                <label>Student Name:</label><br />
                <input type="text" className="border-2 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" /> <br />
                <label>Current College</label><br />
                <select className="border-2 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" name="" id="">
                    <option value=""></option>
                    <option value="">College of Education</option>
                    <option value="">College of Criminology</option>
                    <option value="">College of Industrial Technology</option>
                    <option value="">College of Information Technology</option>
                </select>
                 <label>Desired College:</label><br />
                 <select className="border-2 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" name="" id="">
                    <option value=""></option>
                    <option value="">College of Education</option>
                    <option value="">College of Criminology</option>
                    <option value="">College of Industrial Technology</option>
                    <option value="">College of Information Technology</option>
                </select>
                 <label>Date Requested:</label><br />
                 <input className="border-2 px-3 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" type="date" />
            </div>
            
                <button className="bg-[#561b5a] w-[100%] rounded-[5px] text-white py-[5px]">Send Request</button>
            
        </div>
       
    );
});
export default SendShift;