import React from "react";

const ProofPayment = React.forwardRef(
  ({ animate, onAnimationEnd, onClose, data, code, formatDateStr }, ref) => {
    const colors = {
      CITSC: "border-[#621668] text-[#621668]  bg-[#621668]",
      CESC: "border-[#020180] text-[#020180] bg-[#020180]",
      CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
      COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
      SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
      SSC: "border-[#174515] text-[#174515] bg-[#174515]",
    };

    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";
    const fileUrl = `/uploads/payment_proofs/${data.image_proof}`;

    return (
      <div
        ref={ref}
        className={`${animate} lg:w-[420px] w-[390px] h-auto px-8 py-5 bg-white  rounded-lg z-50 inset-0 mx-auto`}
        onAnimationEnd={onAnimationEnd}
      >
        <div className="mt-[10px] relative">
          <span
            onClick={onClose}
            className="material-symbols-outlined absolute right-0.5 cursor-pointer"
          >
            disabled_by_default
          </span>
        </div>

        <div className="text-sm text-[#000] mt-8 flex flex-col">
          <span className={`${color} bg-[#fff0] text-2xl font-bold`}>
            {data?.event_name}
          </span>
          <span className="mt-3">Student Name: {data?.full_name}</span>
          <span>Year & Section: {data?.student_section}</span>
          <span>Amount: ₱ {data?.event_contri_fee}</span>
          <span>Date: {formatDateStr(data?.payment_date?.split(" ")[0])}</span>

          <span className="mt-3 font-medium">Proof of Payment</span>
          <div className="mt-2 flex justify-center items-center border rounded-md bg-gray-50 p-2">
            <img
              src={fileUrl}
              alt="Payment proof"
              className="max-h-[250px] w-auto object-contain rounded-md"
            />
          </div>

          <button
            onClick={() => window.open(fileUrl, "_blank")}
            className={`mt-4 text-sm cursor-pointer font-semibold ${color} text-white  px-4 py-2 rounded-md self-cente`}
          >
            Open in Full Screen
          </button>
        </div>
      </div>
    );
  }
);

export default ProofPayment;