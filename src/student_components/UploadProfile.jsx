import React from "react";
const UploadProfile = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-[420px] w-[390px] h-85 px-8 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-[10px] absolute z-50 inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-8 border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold text-[22px]">Update Profile</span>
            </div>
            <div className="mt-10">
               
                 <label>Upload Photo:</label><br />
                 <div className="bg-[#c3c3c3c2] flex flex-col justify-center items-center  w-[100%] h-30 rounded-lg mb-4">
                    <i className="fa-solid fa-arrow-up-from-bracket text-xl"></i>
                    <p className="text-sm">Upload image or file.</p>
                    <div className=" relative w-[100%] mt-2 flex justify-center">
                        <button className="w-25 h-8 cursor-pointer  border-1 rounded-md border-[#621668] text-[#621668] absolute">Browse</button>
                        <input type="file" className="bg-amber-200 py-1 z-[1] w-30 opacity-0 " />
                    </div>
               </div>
                
                 
            </div>
            
                <button className="bg-[#561b5a] w-[100%] rounded-[5px] text-white py-[5px]">Update Profile</button>
            
        </div>
       
    );
});
export default UploadProfile;