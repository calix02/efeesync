import "../animate.css";
function Unsettled({unsettledEvents,total,formatDateStr}){
    const animate = "right-In";
    return(
         <div className={` ${animate} font-poppins overflow-y-scroll hide-scrollbar w-[100%] h-130  bg-white px-6 border-3 text-amber-600 border-amber-400 rounded-lg shadow-[2px_2px_3px_grey]`}>
            <div className="border-b-4 border-[#F1A917] p-1.5 mt-2">
                <span className="text-2xl font-semibold">Unsettled</span>
                <p className="font-[family-name:Arial] text-sm ">Total Unsettled Fees: ₱ {total} </p>
            </div>
            <div>
                {unsettledEvents.map((ue, id) => (
                <div key={id} className="flex gap-2 mt-1 border-b-1 py-4 border-[#7d7b7b]">
                    <div className="w-20 py-2 flex flex-col justify-center items-center">
                        <span className="text-sm">Amount</span>
                        <span className="font-bold text-2xl">{ue.remaining_balance}</span>
                    </div>
                    <div className="w-50 py-1 border-l-4 flex flex-col pl-4 justify-center">
                        <span className="font-bold text-xl ">{ue.event_name}</span>
                        <span className=" text-sm text-[#625555]">Date: {formatDateStr(ue.event_contri_due_date)}</span>
                    </div>
                </div>
                ))}
                {unsettledEvents.length == 0 && (
                    <>
                        <center>
                            <p className="text-lg text-gray-400 mt-5">No Unsettled Events Fees</p>
                        </center>
                    </>
                )}
            </div>
        </div>

    );

}
export default Unsettled;