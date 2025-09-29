import "../animate.css";
function UnpaidCard({unpaidEvents,total}){
    const animate = "card-In";
    return(
         <div className={` ${animate} overflow-y-scroll hide-scrollbar  w-[100%] h-130 bg-white px-6 border-3 text-[#B3030C] border-[#B3030C] rounded-lg shadow-[2px_2px_3px_grey]`}>
            <div className="border-b-4  border-[#B3030C] p-1.5 mt-2">
                <span className="text-xl font-semibold">Unpaid</span>
                <p className="font-[family-name:Arial] text-sm ">Total Fees Paid: P{total} </p>

            </div>
            <div>
                {unpaidEvents.map((ue) => (
                    <div className="flex gap-2 mt-1 border-b-1 py-3 border-[#7d7b7b]">
                        <div className="w-20 h-15 flex flex-col justify-center items-center">
                            <span className="text-sm">Amount</span>
                            <span className="font-bold text-2xl">{ue.event_contri_fee}</span>
                        </div>
                        <div className="w-50 h-15 border-l-4 flex flex-col pl-4 justify-center">
                            <span className="font-bold text-xl ">{ue.event_name}</span>
                            <span className=" text-sm text-[#625555]">Date: {ue.event_contri_due_date}</span>
                        </div>
                    </div>
                ))}
                {unpaidEvents.length == 0 && (
                    <>
                        No Unpaid Events
                    </>
                )}
            </div>
        </div>

    );

}
export default UnpaidCard;