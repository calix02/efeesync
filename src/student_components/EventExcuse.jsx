import "../animate.css";

function EventExcuse({attendanceExcuse}){
    const animate = "right-In";
    return(
        <div className={` ${animate} w-[100%] h-135 border-2 shadow-[2px_2px_3px_grey] bg-white rounded-lg border-[#F1A917] text-[#F1A917] px-6`}>
            <div className="border-b-4 border-[#F1A917] text-xl pt-2 py-1  font-semibold">
                <span>Event Excuse</span>
            </div>
            {attendanceExcuse.map((d) => (
            <div className="w-[100%] h-15 flex items-center border-2 px-4 rounded-lg border-[#F1A917] mt-3">
                <div className="w-[100%] h-12 border-l-4 border-[#F1A917] px-6 flex flex-col">
                    <span className="text-xl font-semibold">{d.event_name}</span>
                    <span className="text-sm text-[#252525]">Date: {d.event_attend_date}</span>
                </div>

            </div>
            ))}
            {attendanceExcuse.length == 0 &&(
                <>
                No excuses found
                </>
            )}
            

        </div>
    );
}
export default EventExcuse;