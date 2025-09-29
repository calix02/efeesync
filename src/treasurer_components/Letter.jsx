import React from "react";
const Letter = React.forwardRef(({animate, onAnimationEnd,onClose,code}, ref) =>{

    const colors = {
    CIT: "border-[#621668] text-[#621668] ",
    COE: "border-[#020180] text-[#020180] ",
    COC: "border-[#660A0A] text-[#660A0A] ",
    COT: "border-[#847714] text-[#847714] ",
    SCEAP: "border-[#6F3306] text-[#6F3306] ",
    SSC: "border-[#174515] text-[#174515] ",
  };

  const color = colors[code] || "border-[#174515] text-[#174515] ";

    return( 
        <div ref={ref}   className={` ${animate} lg:w-[420px] w-[390px] h-125 px-8 bg-white  rounded-[10px]  z-50 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className=" text-sm text-[#000] mt-8  flex flex-col">
                <span className={`text-2xl font-bold ${color}`}>Tech Night 2025</span>
                <span className="mt-3">Student Name: Jerick Gamboa</span>
                <span>Year & Section: 3A</span>
                <span>Absence Date: May 22, 2025</span>
                <span>Submitted Date: May 22, 2025</span>
                <span className="mt-3">Attachment</span>
                <div className="w-[100%] overflow-y-scroll hide-scrollbar sc p-4 h-70 bg-[#D9D9D9] rounded-md">
                    <p>Dear Charo,</p>
                </div>
            </div>
            
        </div>
       
    );
});
export default Letter;