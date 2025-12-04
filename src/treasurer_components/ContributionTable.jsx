import { useState, useEffect } from "react";
import { successAlert, errorAlert } from "../utils/alert";
import "../animate.css";

function ContributionTable({ code, selectedEvent, paginate, fetchStudentsToContribute, studentsToContribute, searchValueStudents }) {
  const animate = "card-In";

  const [amount, setAmount] = useState("");
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  const handleChange = (e) => setAmount(e.target.value);
  

  const colors = {
    CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
    CESC: "border-[#020180] text-[#020180] bg-[#621668]",
    CCSC: "border-[#660A0A] text-[#660A0A] bg-[#621668]",
    COTSC: "border-[#847714] text-[#847714] bg-[#621668]",
    SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#621668]",
    SSC: "border-[#174515] text-[#174515] bg-[#621668]",
  };
  const color = colors[code] || "border-black text-black";

  const fallback = [];

  const [activeStudentId, setActiveStudentId] = useState(null);
  
  useEffect(() => {
    fetchStudentsToContribute();
  }, [selectedEvent]);

  const revokeContribution = async (student_id) => {
      try {
        const res = await fetch(`/api/events/${selectedEvent.event_id}/contributions/${student_id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const response = await res.json();
        if (response.status === "success") {
          fetchStudentsToContribute();
        }
      } catch (err) {
        //errorAlert(err);
      }
    };

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
          fetchStudentsToContribute();
        }
      } catch (err) {
       // errorAlert(err);
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

  const data = studentsToContribute.length ? studentsToContribute : fallback;

  return (
    <div className={`w-full ${animate} flex flex-col gap-6 lg:text-sm text-xs font-poppins`}>
      <div className={`lg:ml-70 overflow-x-scroll bg-white text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        <table className="lg:w-full w-230 text-center">
          <thead>
            <tr className={`border-b-2 border-[#adadad] bg-white ${color}`}>
              <th hidden><input type="checkbox" /></th>
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
                  <td  hidden ><input type="checkbox" /></td>
                  <td hidden>{s.student_id}</td>
                  <td>{s.student_number_id}</td>
                  <td>{s.full_name}</td>
                  <td>{s.student_section}</td>
                  <td>P {s.event_contri_fee}</td>
                  <td>P {s.remaining_balance}</td>
                  <td className="flex gap-2 justify-center font-semibold text-xs py-6">
                    {s.remaining_balance == 0 ? (
                      <>
                        <button
                          onClick={() => revokeContribution(s.student_id)}
                          className="cursor-pointer w-15 py-1 border-1 rounded-sm border-[#ff5656] text-[#ff5656]">
                          Revoke
                        </button>
                      </>
                    ) : s.remaining_balance < s.event_contri_fee ? (
                      <>
                        <button onClick={()=>{contributionPayment(s.student_id, s.remaining_balance)}} className="cursor-pointer w-15 border-1 py-1 rounded-sm border-[#709fcb] text-[#709fcb]">
                          Full
                        </button>
                        <button
                          onClick={() => clickedPartial(idx, s.student_id)}
                          className="cursor-pointer w-15 border-1 rounded-sm border-[#EAB308] text-[#EAB308]">
                          Partial
                        </button>
                        <button
                          onClick={() => revokeContribution(s.student_id)}
                          className="cursor-pointer w-15 border-1 rounded-sm border-[#ff5656] text-[#ff5656]">
                          Revoke
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
        
        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center gap-2 items-center">
          <button
            onClick={() => fetchStudentsToContribute(paginate.page - 1, searchValueStudents)}
            disabled={paginate.page <= 1}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <span className="px-3">
            Page {paginate.page} of {paginate.total_pages}
          </span>

          <button
            onClick={() => fetchStudentsToContribute(paginate.page + 1, searchValueStudents)}
            disabled={paginate.page >= paginate.total_pages}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContributionTable;
