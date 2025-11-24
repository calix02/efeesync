function UpcomingEvents({ month, day, event, desc, target, type, code, pay, excuse, data }) {
  const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#020180]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
    COT: "border-[#847714] text-[#847714] bg-[#847714]",
    ESAF:"border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
    SSC: "border-[#174515] text-[#174515] bg-[#174515]",
  };

  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

  // Safely access nested contributions data
  const contribution = data?.contributions;
  const amount = contribution?.fee || 0;
  const status = contribution?.payment_status || "UNPAID";
  const paid = contribution?.total_paid || 0;

  return (
    <div className="p-2 font-poppins rounded-xl">
      <div className="py-2 flex lg:flex-row flex-col gap-2">
        <div
          className={`border border-[#e0e0e0] shadow-[3px_3px_2px_gray] ${color} py-4 font-poppins lg:w-[20%] w-[30%] hidden rounded-2xl bg-[#fcfcfc] lg:flex flex-col justify-center items-center`}>
          <span className="text-md">{month}</span>
          <span className="text-3xl font-bold">{day}</span>
        </div>

        <div
          className={`lg:w-[80%] w-full ${color} border border-[#e0e0e0] shadow-[3px_3px_2px_gray] py-3 rounded-2xl relative bg-[#fcfcfc] flex items-center px-4`}>
          <div className={`${color} w-full bg-[#fff0] text-black pt-3 pb-1 rounded-2xl border-l-6`}>
            <div className="w-full justify-end font-semibold text-sm lg:hidden flex gap-2">
              <span>{month}</span>
              <span>{day}</span>

            </div>
            <div className="px-4 w-full  leading-3">
              <span className="text-2xl font-poppins font-semibold">{event}</span>
              <br />
              <span className="text-sm ">{desc}</span>
              <br />

              <div className="mt-4 ">
                <span className="text-xs mt-1">Open to: {target}</span>
                <br />
                <span className="text-xs">Type: {type}</span>

                {type === "Contribution" && (
                  <>
                    <div className="mt-2 text-sm">
                      💰 Contribution Fee: ₱{amount}
                      <br />
                      📄 Payment Status:{" "}
                      <span
                        className={`font-semibold ${
                          status === "APPROVED"
                            ? "text-green-600"
                            : status === "PENDING"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {status}
                      </span>
                      {status !== "UNPAID" && (
                        <>
                          <br />
                          ✅ Amount Paid: ₱ {paid}
                        </>
                      )}
                    </div>

                    <div className="flex justify-end mt-3">
                    {(paid<amount && status !== "PENDING") && (
                        <button
                        onClick={() => pay(data)}
                        className={`border-1 ${color} border-[#4b4b4b] hover:scale-110 text-white transition duration-200 cursor-pointer w-30 shadow-[2px_2px_2px_grey] py-2 font-poppins font-semibold text-xs rounded-xl`}
                      >
                        Pay Now
                      </button>
                    )}
                    </div>
                  </>
                )}

                {type === "Attendance" && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => excuse(data)}
                      className={`${color} bg-white border-2 border-[#e0e0e0] hover:scale-110 transition duration-200 cursor-pointer w-30 shadow-[2px_2px_2px_grey] py-2 font-poppins font-semibold text-xs rounded-xl`}
                    >
                      Request Excuse
                    </button>
                  </div>
                )}
                {type === "Attendance and Contribution" && (
                  <>
                  <div className="mt-2 text-sm">
                      💰 Contribution Fee: ₱{amount}
                      <br />
                      📄 Payment Status:{" "}
                      <span
                        className={`font-semibold ${
                          status === "APPROVED"
                            ? "text-green-600"
                            : status === "PENDING"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {status}
                      </span>
                      {status !== "UNPAID" && (
                        <>
                          <br />
                          ✅ Amount Paid: ₱ {paid}
                        </>
                      )}
                    </div>
                     <div className="flex justify-end gap-2 mt-3">
                      <button
                      onClick={() => excuse(data)}
                      className={`${color} bg-white border-2 border-[#e0e0e0] hover:scale-110 transition duration-200 cursor-pointer w-30 shadow-[2px_2px_2px_grey] py-2 font-poppins font-semibold text-xs rounded-xl`}
                    >
                      Request Excuse
                    </button>
                    {(paid<amount && status !== "PENDING") && (
                        <button
                        onClick={() => pay(data)}
                        className={`border-1 ${color} border-[#4b4b4b] hover:scale-110 text-white transition duration-200 cursor-pointer w-30 shadow-[2px_2px_2px_grey] py-2 font-poppins font-semibold text-xs rounded-xl`}
                      >
                        Pay Now
                      </button>
                    )}

                    </div>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpcomingEvents;