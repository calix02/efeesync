
function Monetary({monetarySanction, code, animate, formatDateStr}){
    const colors = {
            CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
            CESC: "border-[#020180] text-[#020180] bg-[#020180]",
            CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
            SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]"
        };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";
    return(
        <div className={` ${color} ${animate}  w-[100%] h-120 overflow-y-scroll pb-5 font-poppins font-semibold hide-scrollbar border-2 shadow-[2px_2px_3px_grey] bg-white rounded-lg  px-6`}>
            <div className="border-b-4  text-xl pt-3 py-1  font-semibold">
                <span>Monetary</span>
            </div>
            {monetarySanction.length > 0 ? 
            (monetarySanction.map((ms, id)=>(
                <div key={id} className="w-[100%] bg-[#fcfcfc] hover:scale-103 transition duration-300  min-h-25 py-2 flex items-center border border-[#e0e0e0] shadow-[2px_2px_2px_gray] px-4 rounded-lg  mt-3">
                    <div className="border-l-4 font-bold py-4 px-4 font-poppins text-2xl">100</div>
                    <div className="w-[100%]  py-2   px-3 flex flex-col">
                        <span className="text-xl font-semibold">{ms.event_name}</span>
                        {ms.absence_logs.map((al)=>(
                            <span className="text-xs text-[#252525]">Date: {formatDateStr(al.event_attend_date)}</span>
                        ))}
                    </div>
                </div>
            ))):
            (
                <p>No Monetary Sanction</p>
            )
            }
        </div>
    );
}
export default Monetary;