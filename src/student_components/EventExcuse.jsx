import "../animate.css";

function EventExcuse({attendanceExcuse}){
    const animate = "right-In";
    return(
        <div className={` ${animate} font-poppins w-[100%] h-135 border-2 shadow-[2px_2px_3px_grey] bg-white rounded-lg border-[#F1A917] text-[#F1A917] px-6`}>
            <div className="border-b-4 border-[#F1A917] text-amber-700 text-xl pt-3 py-1  font-semibold">
                <span>Event Excuse</span>
            </div>
            {attendanceExcuse.map((d) => (
            <div className="w-[100%] min-h-25 bg-[#fcfcfc] hover:scale-103 transition duration-300  text-amber-700 flex items-center border shadow-[2px_2px_2px_gray] px-4 rounded-2xl border-[#e0e0e0] mt-3">
                <div className="w-[100%] h-12 border-l-4 border-[#F1A917] px-6 flex flex-col">
                    <span className="text-xl font-semibold">{d.event_name}</span>
                    <span className="text-xs font-semibold text-[#252525]">Date: {d.event_attend_date}</span>
                </div>

            </div>
            ))}
            {attendanceExcuse.length == 0 &&(
                <>
                <center>
                    <p className="text-lg text-gray-400 mt-5">No Excuses Found</p>
                </center>
                </>
            )}
        </div>
    );
}
export default EventExcuse;