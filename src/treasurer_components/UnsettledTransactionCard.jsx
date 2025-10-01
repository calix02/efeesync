import React, { useState } from "react";
import { successAlert } from "../utils/alert";

const UnsettledTransactionCard = React.forwardRef(
  ({ animate, onAnimationEnd, onClose, code, data }, ref) => {
    const colors = {
      CIT: "border-[#621668] text-[#621668] bg-[#621668]",
      COE: "border-[#020180] text-[#020180] bg-[#020180]",
      COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
      COT: "border-[#847714] text-[#847714] bg-[#847714]",
      ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
      SSC: "border-[#174515] text-[#174515] bg-[#174515]",
    };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    const [collectStates, setCollectStates] = useState({});
    const [partialStates, setPartialStates] = useState({});
    const [amounts, setAmounts] = useState({});

    const toggleCollect = (id) =>
      setCollectStates((prev) => ({ ...prev, [id]: !prev[id] }));

    const togglePartial = (id) =>
      setPartialStates((prev) => ({ ...prev, [id]: !prev[id] }));

    const handleAmountChange = (id, value) =>
      setAmounts((prev) => ({ ...prev, [id]: value }));

    const collectAmount = (id) => {
      successAlert("Collected Amount: " + (amounts[id] || 0));
      setAmounts((prev) => ({ ...prev, [id]: "" }));
      toggleCollect(id);
    };

    const collectPartial = (id) => {
      successAlert("Partial Amount: " + (amounts[id] || 0));
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

        {/* Sanctions */}
        <div className="mt-6 border-b-4 ">
          <span className="font-semibold lg:text-xl text-lg">
            Unsettled Transactions
          </span>
        </div>
        {data.attendance_sanctions.length > 0 &&(
        <div className="h-50 overflow-y-scroll hide-scrollbar">
          <h3 className="font-bold sticky top-0 font-inter text-lg mt-3">
            Sanctions
          </h3>
          <table className="w-[100%] text-center">
            <thead className={`${color} sticky top-8`}>
              <tr className="text-white">
                <th className="py-1.5">Event Name</th>
                <th>Total Sanctions</th>
                <th>Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.attendance_sanctions.map((as) => (
                <tr
                  key={as.event_name}
                  className="border-b-1 text-black border-[#635C5C30]"
                >
                  <td className="py-4">{as.event_name}</td>
                  <td>{as.amount}</td>
                  <td>{as.balance}</td>
                  <td>
                    {!collectStates[as.event_name] ? (
                      <button
                        type="button"
                        onClick={() => toggleCollect(as.event_name)}
                        className="px-3 cursor-pointer py-0.5 rounded-sm text-[#65A810] border border-[#65A810]"
                      >
                        Collect
                      </button>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          collectAmount(as.event_name);
                        }}
                      >
                        <input
                          value={amounts[as.event_name] || ""}
                          onChange={(e) =>
                            handleAmountChange(as.event_name, e.target.value)
                          }
                          type="number"
                          className="py-0.5 text-center w-20 rounded-sm border border-[#65A810]"
                        />
                        <button hidden type="submit">
                          Submit
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {/* Contributions */}
        {data.contributions_needed.length > 0 &&(
        <div className="h-50 overflow-y-scroll hide-scrollbar mt-8">
          <h3 className="font-bold font-inter bg-white sticky top-0 text-lg mt-3">
            Unsettled Contributions
          </h3>
          <table className="w-[100%] text-center">
            <thead className={`${color} text-white sticky top-8`}>
              <tr>
                <th className="py-1.5">Event Name</th>
                <th>Total Contributions</th>
                <th>Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.contributions_needed.map((cn) => (
                <tr
                  key={cn.event_name}
                  className="border-b-1 text-black border-[#635C5C30]"
                >
                  <td className="py-4">{cn.event_name}</td>
                  <td>{cn.amount}</td>
                  <td>{cn.balance}</td>
                  <td>
                    {!partialStates[cn.event_name] ? (
                      <>
                        <span className="px-3 py-0.5 rounded-sm cursor-pointer text-[#65A810] border border-[#65A810]">
                          Full
                        </span>
                        <span
                          onClick={() => togglePartial(cn.event_name)}
                          className="px-3 py-0.5 ml-2 cursor-pointer rounded-sm text-[#EAB308] border border-[#EAB308]"
                        >
                          Partial
                        </span>
                      </>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          collectPartial(cn.event_name);
                        }}
                      >
                        <input
                          value={amounts[cn.event_name] || ""}
                          onChange={(e) =>
                            handleAmountChange(cn.event_name, e.target.value)
                          }
                          type="number"
                          className="py-0.5 text-center w-20 rounded-sm border border-[#EAB308]"
                        />
                        <button hidden type="submit">
                          Submit
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    );
  }
);

export default UnsettledTransactionCard;