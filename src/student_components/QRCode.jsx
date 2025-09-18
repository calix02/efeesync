import React from "react";
const ChangePassword = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-[420px] w-[390px] h-85 px-12 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg  z-50 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className=" text-center mt-6">
                <h2 className="font-bold text-2xl pt-2">Scan QR Code</h2>
                <p className="text-sm font-extralight pt-2">Show this QR code to the student treasurer to record your attendance.</p>
                <p className="py-4"><i class="fa-solid fa-qrcode text-9xl"></i></p>

                    
            </div>
            
           
            
                <button className="bg-[#561b5a] w-[100%] rounded-[5px] text-white py-2 mt-2">Download QR Code</button>
            
        </div>
       
    );
});
export default ChangePassword;