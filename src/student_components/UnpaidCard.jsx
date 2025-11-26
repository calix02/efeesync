import "../animate.css";

function UnpaidCard({unpaidEvents,total,formatDateStr, pay}){
    const animate = "card-In";
    return(
         <div className={` font-poppins ${animate} overflow-y-scroll hide-scrollbar w-[100%] h-130 bg-white px-6 border-3 text-[#B3030C] border-[#B3030C] rounded-lg shadow-[2px_2px_3px_grey]`}>
            <div className="border-b-4  border-[#B3030C] p-1.5 mt-2">
                <span className="text-2xl font-semibold">Unpaid</span>
                <p className="font-[family-name:Arial] text-sm ">Total Unpaid Fees: ₱ {total} </p>

            </div>
            <div>
                {unpaidEvents.map((ue) => (
                    <div className="flex gap-2 mt-1 items-center border-b-1 py-4  border-[#7d7b7b]">
                        <div className="w-20 py-2 flex flex-col justify-center items-center">
                            <span className="text-sm">Amount</span>
                            <span className="font-bold text-2xl">{ue.remaining_balance}</span>
                        </div>
                        <div className="w-50 py-1 border-l-4 flex flex-col pl-4 justify-center">
                            <span className="font-bold text-xl ">{ue.event_name}</span>
                            <span className=" text-sm text-[#625555]">Date: {formatDateStr(ue.event_contri_due_date)}</span>
                            <div className="flex justify-start">
                                <button onClick={()=> pay(ue)} className="border font-bold border-black cursor-pointer hover:bg-[#07a81f] hover:text-white hover:scale-105 transition duration-300 rounded-md px-3 text-xs py-0.75 my-2 text-[#07a81f]">Pay Now</button>
                            </div>
                        </div>
                    </div>
                ))}
                {unpaidEvents.length == 0 && (
                    <>
                        <center>
                            <p className="text-lg text-gray-400 mt-5">No Paid Events</p>
                        </center>
                    </>
                )}
            </div>
        </div>

    );

}
export default UnpaidCard;