
function Monetary({monetarySanction}){
    return(
        <div className="w-[100%] h-120 border-2 shadow-[2px_2px_3px_grey] bg-white rounded-lg border-[#621668] text-[#621668] px-6">
            <div className="border-b-4 border-[#621668] text-xl pt-2 py-1  font-semibold">
                <span>Monetary</span>
            </div>
            {monetarySanction.map((ms)=>(
                <div className="w-[100%] h-15 flex items-center border-2 px-4 rounded-lg border-[#621668] mt-3">
                    <div className="w-[100%] h-12 border-l-4 border-[#621668] px-6 flex flex-col">
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