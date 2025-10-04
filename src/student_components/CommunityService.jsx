
function CommunityService({communityService, animate, formatDateStr}){
    return(
        <div className={` ${animate} w-[100%] h-120 border-2 shadow-[2px_2px_3px_grey] bg-white rounded-lg border-[#F1A917] text-[#F1A917] px-6`}>
            <div className="border-b-4 border-[#F1A917] text-xl pt-2 py-1  font-semibold">
                <span>Community Service</span>
            </div>
            {communityService.map((cs)=>(
            <div className="w-[100%] py-2  flex items-center border-2 px-4 rounded-lg border-[#F1A917] mt-3">
                <div className="w-[100%] py-2 border-l-4 border-[#F1A917] px-6 flex flex-col">
                    <span className="text-xl font-semibold">{cs.event_name}</span>
                    <span className="text-sm text-[#252525]">Date: {formatDateStr(cs.event_end_date)}</span>
                </div>
            </div>
            ))}
        </div>
    );
}
export default CommunityService;