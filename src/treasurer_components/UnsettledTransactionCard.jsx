import React, { useState, useEffect } from "react";
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";


const UnsettledTransactionCard = React.forwardRef(
  ({ animate, onAnimationEnd, onClose, code, data, fetchSanctionData }, ref) => {
    const colors = {
      CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
      CESC: "border-[#020180] text-[#020180] bg-[#020180]",
      CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
      COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
      SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
      SSC: "border-[#174515] text-[#174515] bg-[#174515]",
    };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    const [collectStates, setCollectStates] = useState({});
    const [partialStates, setPartialStates] = useState({});
    const [amounts, setAmounts] = useState({});

    // Toggle collect mode for sanctions
    const toggleCollect = (id) =>
      setCollectStates((prev) => ({ ...prev, [id]: !prev[id] }));

    // Toggle partial mode for contributions
    const togglePartial = (id) =>
      setPartialStates((prev) => ({ ...prev, [id]: !prev[id] }));

    const handleAmountChange = (id, value) =>
      setAmounts((prev) => ({ ...prev, [id]: value }));

    // === API Calls ===
    const contributionPayment = async (eventId, paymentAmount) => {
      try {
        const res = await fetch(
          `/api/events/${eventId}/contributions/${data?.student_id}`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount_paid: paymentAmount }),
          }
        );
        const response = await res.json();
        if (response.status === "success") {
          fetchSanctionData();
        }
      } catch (err) {
        //errorAlert("Contribution payment failed");
      }
    };

    const sanctionPayment = async (eventId) => {
      try {
        const res = await fetch(
          `/api/events/${eventId}/attendance/sanctions/collect/${data?.student_id}`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const response = await res.json();
        if (response.status === "success") {
          fetchSanctionData();
        }
      } catch (err) {
        //errorAlert("Sanction payment failed");
      }
    };

    // === Handlers ===
    const collectAmount = (id, type) => {
      const amountPaid = amounts[id] || 0;

      if (type === "sanction") {
        const sanction = data.attendance_sanctions.find((as) => as.event_id === id);
        // successAlert(`Collected for ${sanction?.event_name} (Sanction)`);
        sanctionPayment(id);
      }

      setAmounts((prev) => ({ ...prev, [id]: "" }));
      toggleCollect(id);
    };

    const collectPartial = (id, type) => {
      const amountPaid = amounts[id] || 0;

      if (type === "contribution") {
        const contribution = data.contributions_needed.find((cn) => cn.event_id === id);
        // successAlert(`Partial payment ₱${amountPaid} for ${contribution?.event_name} (Contribution)`);
        contributionPayment(id, amountPaid);
      }

      setAmounts((prev) => ({ ...prev, [id]: "" }));
      togglePartial(id);
    };

    return (
      <div
        ref={ref}
        className={`${animate} ${color} lg:w-200 w-80 pt-3 pb-8 px-6 font-[family-name:Arial] lg:text-sm text-xs bg-white rounded-lg z-80 inset-0 mx-auto`}
        onAnimationEnd={onAnimationEnd}
      >
        <div className="mt-2 relative">
          <span
            onClick={onClose}
            className="material-symbols-outlined absolute right-0.5 cursor-pointer"
          >
            disabled_by_default
          </span>
        </div>

        {/* Title */}
        <div className="mt-6 border-b-4">
          <span className="font-semibold lg:text-xl text-lg">
            Unsettled Transactions ({data?.full_name})
          </span>
        </div>

        {/* === Sanctions Table === */}
        {data?.attendance_sanctions.length > 0 ? (
          <>
          <h3 className="font-bold sticky top-0 font-inter text-lg mt-3">
              Sanctions
            </h3>
          <div className="h-50 overflow-y-scroll hide-scrollbar">
            <table className="lg:w-[100%] w-100 text-center">
              <thead className={`${color} sticky top-0`}>
                <tr className="text-white">
                  <th className="py-1.5">Event Name</th>
                  <th>Total Sanctions</th>
                  <th>Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.attendance_sanctions.map((as) => (
                  <tr key={as.event_id} className="border-b-1 text-black border-[#635C5C30]">
                    <td className="py-4">{as.event_name}</td>
                    <td>{as.amount}</td>
                    <td>{as.balance}</td>
                    <td>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          collectAmount(as.event_id, "sanction");
                        }}>
                        <button type="submit" 
                        className="px-3 cursor-pointer py-0.5 rounded-sm text-[#65A810] border border-[#65A810]">
                          Collect
                          </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
        ):(
          <p className="pt-5">No Unsettled Sanction Found</p>
        )}

        {/* === Contributions Table === */}
        {data?.contributions_needed.length > 0 ? (
          <>
           <h3 className="font-bold font-inter  text-lg ">
              Unsettled Contributions
            </h3>
          <div className="h-50  overflow-y-scroll hide-scrollbar">
            <table className="lg:w-[100%] w-100 text-center">
              <thead className={`${color} text-white sticky top-0`}>
                <tr>
                  <th className="py-1.5">Event Name</th>
                  <th>Total Contributions</th>
                  <th>Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.contributions_needed.map((cn) => (
                  <tr key={cn.event_id} className="border-b-1 text-black border-[#635C5C30]">
                    <td className="py-4">{cn.event_name}</td>
                    <td>{cn.amount}</td>
                    <td>{cn.balance}</td>
                    <td>
                      {!partialStates[cn.event_id] ? (
                        <>
                          <span
                            onClick={() => contributionPayment(cn.event_id, cn.balance)}
                            className="px-3 py-0.5 rounded-sm cursor-pointer text-[#65A810] border border-[#65A810]"
                          >
                            Full
                          </span>
                          <span
                            onClick={() => togglePartial(cn.event_id)}
                            className="px-3 py-0.5 ml-2 cursor-pointer rounded-sm text-[#EAB308] border border-[#EAB308]"
                          >
                            Partial
                          </span>
                        </>
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            collectPartial(cn.event_id, "contribution");
                          }}
                        >
                          <input
                            value={amounts[cn.event_id] || ""}
                            onChange={(e) => handleAmountChange(cn.event_id, e.target.value)}
                            type="number"
                            className="py-0.5 text-center w-20 rounded-sm border border-[#EAB308]"
                          />
                          <button hidden type="submit">Submit</button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
        ):(
          <p className="pt-5">No Unsettled Contribution Found</p>
        )}
      </div>
    );
  }
);

export default UnsettledTransactionCard;