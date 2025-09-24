import { useState, useMemo } from "react";
import { successAlert } from "../utils/alert";
import "../animate.css";

function ContributionTable({ code, events = [], selectedEvent }) {
  const animate = "card-In";

  const [amount, setAmount] = useState("");
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  const handleChange = (e) => setAmount(e.target.value);
  

  const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#621668]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#621668]",
    COT: "border-[#847714] text-[#847714] bg-[#621668]",
    SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#621668]",
    SSC: "border-[#174515] text-[#174515] bg-[#621668]",
  };
  const color = colors[code] || "border-black text-black";


  const fallback = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    studentID: `22-102${i}`,
    studentName: `Mark Alvarado ${i + 1}`,
    yearSection: `4A`,
    eventFee: `400`,
    balance: `${i % 2 === 0 ? 0 : 200}`,
  }));

  const data = events.length ? events : fallback;

  const handleSubmit = () => {
    successAlert(amount);
    setActiveRowIndex(null);
    setAmount("");
  };

  const clickedPartial = (idx) => {
    setActiveRowIndex(activeRowIndex === idx ? null : idx);
  };

  return (
    <div className={`w-full ${animate} flex flex-col gap-6 lg:text-sm text-xs font-[family-name:Arial]`}>
      <div className={`lg:ml-70 bg-white text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        <table className="w-full text-center">
          <thead>
            <tr className={`border-b-2 border-[#adadad] bg-white ${color}`}>
              <th><input type="checkbox" /></th>
              <th hidden>Id</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Year &amp; Section</th>
              <th>Event Fee</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s, idx) => {
              

              return (
                <tr key={s.id} className="border-b border-[#0505057a]">
                  <td><input type="checkbox" /></td>
                  <td hidden>{s.id}</td>
                  <td>{s.studentID}</td>
                  <td>{s.studentName}</td>
                  <td>{s.yearSection}</td>
                  <td>{s.eventFee}</td>
                  <td>{s.balance}</td>
                  <td className="flex gap-2 justify-center font-semibold text-xs py-3">
                    {activeRowIndex !== idx ? (
                      <>
                        <button className="cursor-pointer w-15 border-1 py-1 rounded-sm border-[#65A810] text-[#65A810]">
                          Full
                        </button>
                        <button
                          onClick={() => clickedPartial(idx)}
                          className="cursor-pointer w-15 border-1 rounded-sm border-[#EAB308] text-[#EAB308]">
                          Partial
                        </button>
                      </>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                      >
                        <input
                          className="w-30 border-1 py-1 border-[#000] px-1 rounded-sm"
                          type="number"
                          onChange={handleChange}
                          value={amount}
                          placeholder="Enter amount"
                        />
                        <button hidden type="submit">Submit</button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-4 flex justify-center gap-2">
          <button
            className="cursor-pointer flex justify-center items-center border rounded disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

            <button
              className={`px-2 border text-white cursor-pointer rounded flex justify-center items-center ${color}`}
            >1
            </button>
          

          <button
            className="cursor-pointer border flex justify-center  items-center rounded disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContributionTable;
