import { useState, useEffect } from "react";
import { successAlert, errorAlert } from "../utils/alert";
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

  const fallback = [];

  const [studentsToContribute, setStudentsToContribute] = useState([]);

  const data = studentsToContribute.length ? studentsToContribute : fallback;

  const [activeStudentId, setActiveStudentId] = useState(null);

  const [paginate, setPaginate] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 1
  });

  const fetchStudentToContribute = async (page=1, search="") => {
      try {
        const res = await fetch(`/api/events/${selectedEvent.event_id}/contributions/made?page=${page}&search=${search}`, {
          credentials: "include"
        });
        const response = await res.json();
        if (response.status === "success") {
          setPaginate(response.meta);
          setStudentsToContribute(response.data);
        } else {
          errorAlert(response.message);
        }
      } catch (err) {
        errorAlert(err);
      }
    };
  
    useEffect(() => {
      fetchStudentToContribute();
    }, [selectedEvent]);

  const contributionPayment = async (student_id, paymentAmount) => {
      try {
        const res = await fetch(`/api/events/${selectedEvent.event_id}/contributions/${student_id}`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            "amount_paid": paymentAmount
          })
        });
        const response = await res.json();
        if (response.status === "success") {
          fetchStudentToContribute();
        }
      } catch (err) {
        errorAlert(err);
      }
    };

  const handleSubmit = () => {
    contributionPayment(activeStudentId, amount);
    setActiveRowIndex(null);
    setActiveStudentId(null);
    setAmount("");
  };

  const clickedPartial = (idx, studentID) => {
    setActiveStudentId(studentID);
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
                  <td hidden>{s.student_id}</td>
                  <td>{s.student_number_id}</td>
                  <td>{s.full_name}</td>
                  <td>{s.student_section}</td>
                  <td>P {s.event_contri_fee}</td>
                  <td>P {s.remaining_balance}</td>
                  <td className="flex gap-2 justify-center font-semibold text-xs py-3">
                    {s.remaining_balance == 0 ? (
                      <>
                        <button disabled className="w-15 border-1 py-1 rounded-sm border-[#65A810] text-[#65A810]">
                          None
                        </button>
                      </>
                    ) : activeRowIndex !== idx ? (
                      <>
                        <button onClick={()=>{contributionPayment(s.student_id, s.remaining_balance)}} className="cursor-pointer w-15 border-1 py-1 rounded-sm border-[#709fcb] text-[#709fcb]">
                          Full
                        </button>
                        <button
                          onClick={() => clickedPartial(idx, s.student_id)}
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
