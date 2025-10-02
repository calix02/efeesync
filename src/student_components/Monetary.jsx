
function Monetary({monetarySanction, code, animate}){
    const colors = {
            CIT: "border-[#621668] text-[#621668] bg-[#621668]",
            COE: "border-[#020180] text-[#020180] bg-[#020180]",
            COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COT: "border-[#847714] text-[#847714] bg-[#847714]",
            ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]"
        };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";
    return(
        <div className={` ${color} ${animate} w-[100%] h-120 overflow-y-scroll hide-scrollbar border-2 shadow-[2px_2px_3px_grey] bg-white rounded-lg  px-6`}>
            <div className="border-b-4  text-xl pt-2 py-1  font-semibold">
                <span>Monetary</span>
            </div>
            {monetarySanction.map((ms)=>(
                <div className="w-[100%] py-2  flex items-center border-2 px-4 rounded-lg  mt-3">
                    <div className="w-[100%]  py-2 border-l-4  px-6 flex flex-col">
                        <span className="text-xl font-semibold">{ms.event_name}</span>
                        {ms.absence_logs.map((al)=>(
                            <span className="text-sm text-[#252525]">Date: {al.event_attend_date}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Monetary;