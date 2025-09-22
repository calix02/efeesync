import React from "react";
const QrCode = React.forwardRef(({animate, onAnimationEnd,onClose,code}, ref) =>{
    const colors = {
       CIT: "border-[#621668] text-[#621668] bg-[#621668]",
       COE: "border-[#020180] text-[#020180] bg-[#020180]",
       COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
       COT: "border-[#847714] text-[#847714] bg-[#847714]",
       SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
       SSC: "border-[#174515] text-[#174515] bg-[#174515]"
     };
     const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";


    return( 
        <div ref={ref}   className={` ${animate} ${color} lg:w-[420px] w-[390px] h-85 px-12 bg-white shadow-[2px_2px_2px_black] rounded-lg  z-80 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute  text-black right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className=" text-center mt-6">
                <h2 className="font-bold text-2xl pt-2 text-black">Scan QR Code</h2>
                <p className="text-sm font-extralight text-black pt-2">Show this QR code to the student treasurer to record your attendance.</p>
                <p className="py-4"><i class="fa-solid fa-qrcode text-9xl text-black"></i></p>       
            </div>
            <button className={` ${color} w-[100%] rounded-[5px] cursor-pointer text-white py-2 mt-2`}>Download QR Code</button>
        </div>
       
    );
});
export default QrCode;