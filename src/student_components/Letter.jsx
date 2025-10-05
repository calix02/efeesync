
import React from "react";
const Letter = React.forwardRef(({animate, onAnimationEnd,onClose,code,data, formatDateStr}, ref) =>{
    const colors = {
        CIT: "border-[#621668] text-[#621668] bg-[#621668]",
        COE: "border-[#020180] text-[#020180] bg-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COT: "border-[#847714] text-[#847714] bg-[#847714]",
        ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg-[#174515]"
    };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    const fileUrl = `/uploads/excuse_proofs/${data.attendance_excuse_proof_file}`;
    const ext = data.attendance_excuse_proof_file.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png"].includes(ext);

    return( 
        <div ref={ref}  className={` ${animate} ${color} lg:w-[420px] w-[390px] h-125 px-8 bg-white  rounded-[10px]  z-50 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className=" text-sm text-[#000] mt-8  flex flex-col">
                <span className={`text-2xl font-bold ${color} bg-[#fff0] `}>{data?.event_name}</span>
                <span>Reason: {data?.attendance_excuse_reason}</span>
                <span>Absence Date: {formatDateStr(data?.event_attend_date)}</span>
                <span>Submitted Date: {formatDateStr(data?.attendance_excuse_submitted_at)}</span>
                <span className="mt-3">Attachment</span>
                <div className="w-[100%] overflow-y-scroll hide-scrollbar p-2 h-70 bg-[#D9D9D9] rounded-md flex justify-center items-center">
                    {isImage ? (
                        <img
                        src={fileUrl}
                        alt="Excuse proof"
                        className="max-h-[250px] max-w-full rounded-md border"
                        />
                    ) : (
                        <iframe
                        src={fileUrl}
                        className="w-full h-[250px] rounded-md border"
                        title="Excuse Attachment"
                        ></iframe>
                    )}
                </div>
                <button
                    onClick={() => window.open(fileUrl, "_blank")}
                    className={` ${color} cursor-pointer hover:scale-105 duration-300 mt-3 text-white py-1.5 px-3 rounded-md text-sm font-medium transition`}
                    >
                    Open in Full Screen
                </button>
            </div>
        </div>
    );
});
export default Letter;