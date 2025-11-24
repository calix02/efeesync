import { useState } from "react";
import "../animate.css";

/**
 * TableStudent
 * @param {string} code       – org code ("cit", "coe", …) to color the header text
 * @param {Array}  payments   – array of { id, name, yearSection }
 */
function TablePaymentTransaction({ viewProof, payments = [], code, paginate, status, fetchOnlineContributions, formatDateStr }) {
  const animate = "card-In";
  /* --------------------------------- colors -------------------------------- */
  const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#020180]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
    COT: "border-[#847714] text-[#847714] bg-[#847714]",
    ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
    SSC: "border-[#174515] text-[#174515] bg[#174515]",
  };

  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";
  const hoverColors = {
    CIT: " hover:bg-[#621668]",
    COE: "hover:bg-[#020180]",
    COC: "hover:bg-[#660A0A]",
    COT: "hover:bg-[#847714]",
    ESAF: "hover:bg-[#6F3306]",
    SSC: "hover:bg-[#174515]",
  };
  const hoverColor = hoverColors[code] || "hover:bg-[#174515]";

  /* ---------------------------- sample fallback ---------------------------- */
  const fallback = [];

  const data = payments.length ? payments : fallback;

  const actionOnlinePayment = async (opId, action) =>{
      try {
          const res = await fetch(`/api/onlinepayments/${opId}/contributions/${action}`, {
              method: "POST",
              credentials: "include"
          });
          const response = await res.json();
          if (response.status === "success") {
              fetchOnlineContributions();
          } else {
              errorAlert("Failed: " + response.message);
          }
      } catch (err) {
          errorAlert("Failed: " + err);
      }
  }

  /* -------------------------------- render --------------------------------- */
  return (
    <div className={`w-full ${animate}  flex flex-col gap-6`}>
      {/* table wrapper */}
      <div className="lg:ml-70 bg-white overflow-x-scroll font-poppins lg:text-sm text-xs text-black flex-grow lg:p-5 p-2 mt-3 rounded-lg shadow-[2px_2px_2px_grey]">
        <table className="lg:w-full w-230  text-center ">
          <thead>
            <tr className={`border-b-2 border-[#adadad] bg-[#fff0] ${color}`}>
              <th className="hidden lg:block">Student ID</th>
              <th>Student Name</th>
              <th>Event Name</th>
              <th>Amount</th>
              <th className="hidden lg:block">Date</th>
              <th>Screenshot</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? 
            (data.map((s, idx) => (
              <tr key={idx} className="border-b border-[#0505057a] ">
                <td className="hidden lg:block">{s.student_number_id}</td>
                <td>{s.full_name}</td>
                <td>{s.event_name}</td>
                <td>{s.event_contri_fee}</td>
                <td className="hidden lg:block py-6">{formatDateStr((s.payment_date).split(" ")[0])}</td>
                <td>
                  <button
                    onClick={() => viewProof(s)}
                    className={`${color} ${hoverColor} bg-white gap-1 lg:px-5 md:px-5 px-1 py-1 hover:scale-107 shadow-[2px_2px_1px_gray] border-1 lg:text-sm text-xs hover:text-white transition duration-200 cursor-pointer rounded-2xl`}
                  >
                    <i className="fa-regular fa-eye"></i>View
                  </button>
                </td>

                <td className="flex lg:flex-row flex-col gap-2 text-lg justify-center py-3">
                  {s.contribution_status === "PENDING" && (
                    <>
                      <i
                        onClick={() => actionOnlinePayment(s.online_payment_id, "approve")}
                        className="fa-solid fa-circle-check cursor-pointer text-[#70B914]"
                      ></i>
                      <i
                        onClick={() => actionOnlinePayment(s.online_payment_id, "reject")}
                        className="fa-solid fa-circle-xmark cursor-pointer text-[#DE0004]"
                      ></i>
                    </>
                  )}

                  {s.contribution_status === "APPROVED" && (
                    <span className="px-2 py-1 text-sm rounded-md text-white bg-[#129834]">
                      Approved
                    </span>
                  )}

                  {s.contribution_status === "REJECTED" && (
                    <span className="px-2 py-1 text-sm rounded-md text-white bg-[#981212]">
                      Rejected
                    </span>
                  )}
                </td>
              </tr>
            ))) : (
              <tr>
                <td colspan="7" className="py-5 text-gray-500 italic text-center"> No Online Payment Transaction</td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>

      {/* pagination controls */}
      <div className="mt-4 lg:ml-60 flex justify-center gap-2 items-center">
          <button
            onClick={() => fetchOnlineContributions(status, paginate.page - 1)}
            disabled={paginate.page <= 1}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <span className="px-3">
            Page {paginate.page} of {paginate.total_pages}
          </span>

          <button
            onClick={() => fetchOnlineContributions(status, paginate.page + 1)}
            disabled={paginate.page >= paginate.total_pages}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
    </div>
  );
}
export default TablePaymentTransaction;
