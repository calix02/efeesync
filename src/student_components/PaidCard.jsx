import "../animate.css";
function PaidCard({paidEvents, total}){
    const animate = "left-In";
    return(
         <div className={` ${animate} w-[100%] h-130 overflow-y-scroll hide-scrollbar bg-white px-6 border-3 text-[#174515] border-[#174515] rounded-lg shadow-[2px_2px_3px_grey]`}>
            <div className="border-b-4 border-[#174515] p-1.5 mt-2">
                <span className="text-xl font-semibold">Paid</span>
                <p className="font-[family-name:Arial] text-sm ">Total Fees Paid: P{total} </p>
            </div>
            <div>
                {paidEvents.map((pe) => (
                    <div className="flex gap-2 mt-1 border-b-1 py-3 border-[#7d7b7b]">
                        <div className="w-20 h-15 flex flex-col justify-center items-center">
                            <span className="text-sm">Amount</span>
                            <span className="font-bold text-2xl">{pe.event_contri_fee}</span>
                        </div>
                        <div className="w-50 h-15 border-l-4 flex flex-col pl-4 justify-center">
                            <span className="font-bold text-xl ">{pe.event_contri_fee}</span>
                            <span className=" text-sm text-[#625555]">Date: {pe.event_contri_due_date}</span>
                        </div>
                    </div>
                ))}
                {paidEvents.length == 0 && (
                    <>
                        No Paid Events
                    </>
                )}
            </div>
        </div>

    );

}
export default PaidCard;