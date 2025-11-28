import { useState } from "react";

function CommunitySanction({code, communityService, formatDateStr}){
    
    const colors = {
            CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
            CESC: "border-[#020180] text-[#020180] bg-[#020180]",
            CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
            SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]",
        };

    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";
    return(
        (communityService.map((cs)=>(
            <div className={`w-[100%] bg-[#fcfcfc] hover:scale-103 transition duration-300  min-h-25 py-2 flex items-center font-poppins  mt-2 px-4 ${color} rounded-2xl border border-[#e0e0e0] shadow-[2px_2px_2px_gray]`}>
                <div className={`border-l-6 w-[100%] py-2 items-center px-3`}>
                    <div className="text-black ">
                        <h2 className="font-semibold font-poppins text-xl ">{cs.event_name}</h2>
                        <p  className="flex gap-2 text-xs items-center"><span>{formatDateStr(cs.event_end_date)}</span></p>
                        
                    </div>
                </div>
            </div>
        )))
    );
}
export default CommunitySanction;