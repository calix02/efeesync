import "../animate.css";
function Unsettled(){
    const animate = "right-In";
    return(
         <div className={` ${animate} w-[100%] h-118  bg-white px-6 border-3 text-[#F1A917] border-[#F1A917] rounded-lg shadow-[2px_2px_3px_grey]`}>
            <div className="border-b-4 border-[#F1A917] p-1.5 mt-2">
                <span className="text-xl font-semibold">Unsettled</span>
            </div>
            <div>
                <div className="flex gap-2 mt-1 border-b-1 py-3 border-[#7d7b7b]">
                    <div className="w-20 h-15 flex flex-col justify-center items-center">
                        <span className="text-sm">Amount</span>
                        <span className="font-bold text-2xl">250</span>
                    </div>
                    <div className="w-50 h-15 border-l-4 flex flex-col pl-4 justify-center">
                        <span className="font-bold text-xl ">Year-End Party</span>
                        <span className=" text-sm text-[#625555]">Date: April 20, 2025</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-1 border-b-1 py-3 border-[#7d7b7b]">
                    <div className="w-20 h-15 flex flex-col justify-center items-center">
                        <span className="text-sm">Amount</span>
                        <span className="font-bold text-2xl">400</span>
                    </div>
                    <div className="w-50 h-15 border-l-4 flex flex-col pl-4 justify-center">
                        <span className="font-bold text-xl ">Tribute To Seniors</span>
                        <span className=" text-sm text-[#625555]">Date: May 18, 2025</span>
                    </div>
                </div>
            </div>
        </div>

    );

}
export default Unsettled;