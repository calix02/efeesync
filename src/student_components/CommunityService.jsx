
function CommunityService({communityService, animate, formatDateStr}){
    return(
        <div className={` ${animate} w-[100%] overflow-y-scroll pb-5 h-120 border-2 text-amber-700 shadow-[2px_2px_3px_grey] bg-white rounded-lg border-[#F1A917] px-6`}>
            <div className="border-b-4 border-[#F1A917] text-xl pt-2 py-1  font-semibold">
                <span>Community Service</span>
            </div>
            {communityService.length > 0 ?
            (communityService.map((cs, id)=>(
            <div key={id}  className="w-[100%] hover:scale-103 transition duration-300  min-h-25 py-2 bg-[#fcfcfc] flex items-center border shadow-[2px_2px_2px_gray] px-4 rounded-lg border-[#e0e0e0] mt-3">
                <div className="w-[100%] py-2 border-l-4 border-[#F1A917] px-6 flex flex-col">
                    <span className="text-xl font-semibold">{cs.event_name}</span>
                    <span className="text-sm text-[#252525]">Date: {formatDateStr(cs.event_end_date)}</span>
                </div>
            </div>
            ))):
            (
                <p>No Community Service</p>
            )
            }
        </div>
    );
}
export default CommunityService;