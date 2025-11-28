
function ExcuseStatusCard({data, view,edit, formatDateStr, del}){
    const color = 
    data.attendance_excuse_status === "APPROVED" ? 'bg-[#E5FDE4] text-[#15A310]'
    :data.attendance_excuse_status === "PENDING" ? 'bg-[#FFF8E4E5] text-[#D09D00]'
    :data.attendance_excuse_status === "REJECTED" ? 'bg-[#F8D1D2] text-[#DE0004]' 
    : 'bg-white'
    return(
             <div className="w-[100%] py-4 px-6 bg-white shadow-[3px_3px_2px_grey] hover:scale-105 transition duration-300 font-poppins border border-[#e0e0e0] rounded-xl">
            <div>
                <div className={ `w-25 h-7 rounded-2xl ${color} shadow-[2px_2px_1px_grey] flex justify-center items-center text-sm font-semibold`}>{data?.attendance_excuse_status}</div>
            </div>
            <div className="mt-2 text-sm font-roboto flex flex-col">
                <span className="text-lg font-semibold">{data?.event_name}</span>
                <span className="mt-3 ">Reason: {data?.attendance_excuse_reason}  </span>
                <span className="mt-3 text-xs text-gray-700">Absence Date: {formatDateStr(data?.event_attend_date)}  </span>
                <span className="text-xs text-gray-700">Submitted: {formatDateStr(data.attendance_excuse_submitted_at)} </span>
            </div>
            <div className="flex justify-center gap-2 mt-4  text-sm">
                <button onClick={() =>view(data)} className="w-20 h-6 border-1 shadow-[1px_1px_1px_black] border-[#f0f0f0] hover:scale-105 transition duration-300 hover:bg-[#346132] hover:text-white   cursor-pointer rounded-3xl bg-[#DCF5E0] text-[#2CA74D]">View</button>
                <button onClick={() =>edit(data)}
                    disabled={data.attendance_excuse_status !== "PENDING"}
                    className="w-20 h-6 disabled:bg-[#d6d6d6] disabled:cursor-not-allowed  disabled:scale-100 disabled:text-[#7d7d7d] shadow-[1px_1px_1px_black] border-[#f0f0f0] transition duration-300 hover:scale-105 hover:text-white hover:bg-[#2d345b] border-1 cursor-pointer rounded-3xl bg-[#E6EDFD] text-[#2F6FDD]">
                    Edit
                 </button>
                <button onClick={() => del(data)} className="w-20 h-6  rounded-3xl shadow-[1px_1px_1px_black] transition duration-300 hover:text-white hover:scale-105 hover:bg-[#811d1d] border-[#f0f0f0] border-1 cursor-pointer bg-[#FEE2DF] text-[#DE0004]">Delete</button>
            </div>
        </div>
    );
}
export default ExcuseStatusCard;