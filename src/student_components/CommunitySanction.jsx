import { useState } from "react";

function CommunitySanction({code, communityService}){
    
    const colors = {
            CIT: "border-[#621668] text-[#621668] bg-[#621668]",
            COE: "border-[#020180] text-[#020180] bg-[#020180]",
            COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COT: "border-[#847714] text-[#847714] bg-[#847714]",
            ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]",
        };

    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";
    return(
        (communityService.map((cs)=>(
            <div className={`w-[100%] bg-[#fff] py-4 mt-2 px-4 ${color} rounded-md border-2`}>
                <div className={`border-l-8 w-[100%] items-center px-3`}>
                    <div className="text-black ">
                        <h2 className="font-bold font-poppins text-md ">{cs.event_name}</h2>
                        <p  className="flex cursor-pointer gap-2 text-xs items-center"><span>{cs.event_end_date}</span></p>
                        
                    </div>
                </div>
            </div>
        )))
    );
}
export default CommunitySanction;