
function ExcuseStatusCard({status,view,edit}){
    const color = 
    status === "Approved" ? 'bg-[#E5FDE4] text-[#15A310]'
    :status === "Pending" ? 'bg-[#FFF8E4E5] text-[#D09D00]'
    :status === "Rejected" ? 'bg-[#F8D1D2] text-[#DE0004]' 
    : 'bg-white'
    return(
        <div className="w-70 h-48 px-6 bg-white shadow-[2px_2px_3px_grey] border-1 border-[#621668] rounded-lg">
            <div className="mt-4 ">
                <div className={ `w-25 h-7 rounded-lg ${color} shadow-[2px_2px_3px_grey] flex justify-center items-center text-sm font-semibold`}>{status}</div>
            </div>
            <div className="mt-2 text-sm flex flex-col">
                <span className="text-lg font-semibold">Tribute To Seniors</span>
                <span className="mt-3">Absence Date: May 22, 2025 </span>
                <span>Submitted: May 22, 2025 </span>
            </div>
            <div className="flex justify-center gap-2 mt-4  text-sm">
                <button onClick={view} className="w-20 h-6 border-1 rounded-lg bg-[#DCF5E0] text-[#2CA74D]">View</button>
                <button onClick={edit} className="w-20 h-6 border-1 rounded-lg bg-[#E6EDFD] text-[#2F6FDD]">Edit</button>
                <button className="w-20 h-6 border-1 rounded-lg bg-[#FEE2DF] text-[#DE0004]">Delete</button>
            </div>
        </div>
    );
}
export default ExcuseStatusCard;