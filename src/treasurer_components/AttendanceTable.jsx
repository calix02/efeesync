import { useState, useEffect, useMemo } from "react";
import { errorAlert, confirmAlert } from '../utils/alert.js';
import "../animate.css";

function 
AttendanceTable({ code, attendees = [], scanAttendee, attendanceKeys, studentAttendees, setStudentAttendees, fetchStudentAttendees, paginate, selectedEvent, searchValueStudents, selectedEventDate}) {
  const animate = "card-In";

  const colors = {
      CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
      CESC: "border-[#020180] text-[#020180] bg-[#020180]",
      CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
      COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
      SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
      SSC: "border-[#174515] text-[#174515] bg-[#174515]"
    };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

  const fallback = [];

  const changeStudentAttendance = async (student_number_id, timeinout, target) => {
    const time = timeinout.split(" ")[0];
    const inout = timeinout.split(" ")[1];
    const apiAttendance = `/api/events/${selectedEvent.event_id}/attendance/${selectedEventDate}/${time}/${inout}/number/${student_number_id}`;
    if (target === "Present") {
      const res = await fetch(apiAttendance, {
        method: "POST",
        credentials: "include"
      });
      const response = await res.json();
      if (response.status !== "success") {
       // errorAlert(response.message);
      }
    } else if (target === "Absent") {
      const res = await fetch(apiAttendance, {
        method: "DELETE",
        credentials: "include"
      });
      const response = await res.json();
      if (response.status !== "success") {
        //errorAlert(response.message);
      }
    } /* else if (target === "Excused") {
      confirmAlert("This student will be excused for the whole day.").then( async (result) =>{
        if(result.isConfirmed){
          const res = await fetch(`/api/events/${selectedEvent.event_id}/attendance/${selectedEventDate}/number/${student_number_id}`, {
            method: "PUT",
            credentials: "include"
          });
          const response = await res.json();
          if (response.status !== "success") {
            errorAlert(response.message);
          }
        }
      });
    } */
  };

  useEffect(() => {
    fetchStudentAttendees().then((res) => {
      // after loading data, check if any row is fully excused
      const updated = res.map((att) => {
        if (Object.values(att.attendance).every(v => v === "Excused")) {
          att.attendanceConfirmedExcuse = true;
        }
        return att;
      });
      setStudentAttendees(updated);
    });
  }, [selectedEvent, selectedEventDate]);

  const data = studentAttendees.length ? studentAttendees : fallback;

  return (
    <div className={`w-full ${animate} flex flex-col gap-6 lg:text-sm text-xs font-[family-name:Arial]`}>
      <div className={`lg:ml-70 overflow-x-scroll bg-white text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        <table className="lg:w-full w-230 text-center">
          <thead>
            <tr className={`border-b-2 bg-[#fff0] border-[#adadad] ${color}`}>
              <th hidden><input type="checkbox" /></th>
              <th hidden>Id</th>
              <th>Student Name</th>
              <th>Year & Section</th>
              {attendanceKeys.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((attendee, idx) => (
              <tr key={attendee.student_id} className="border-b border-[#0505057a]">
                <td hidden><input type="checkbox" /></td>
                <td hidden>{attendee.student_id}</td>
                <td>{attendee.student_full_name}</td>
                <td className="py-6">{attendee.student_section}</td>

                {attendanceKeys.map((key) => {
                  const value = attendee.attendance[key]; // "Absent", "Present", etc.
                  return (
                    <td key={key} className={
                      value === "Present" ? "text-[#099620]" :
                      value === "Absent" ? "text-[#c91010]" :
                      value === "Excused" ? "text-[#b1760a]" : ""
                    }>
                      <select
                        value={value}
                        disabled={
                          value === "Excused" ||
                          attendee.attendanceConfirmedExcuse || // disable whole row if excused
                          new Date(selectedEventDate) < new Date().setHours(0, 0, 0, 0)
                        }
                        className="disabled:text-[#b0b0b0]"
                        onChange={async (e) => {
                          const prevValue = value;
                          const newValue = e.target.value;

                          if (newValue === "Excused") {
                            confirmAlert(`This student will be excused for the whole day. (Irreversible Action)`).then(async (result) => {
                              if (result.isConfirmed) {
                                const res = await fetch(
                                  `/api/events/${selectedEvent.event_id}/attendance/${selectedEventDate}/number/${attendee.student_number_id}`,
                                  {
                                    method: "PUT",
                                    credentials: "include"
                                  }
                                );
                                const response = await res.json();
                                if (response.status === "success") {
                                  // ✅ Mark all keys for this student as Excused
                                  const newData = [...studentAttendees];
                                  attendanceKeys.forEach((k) => {
                                    newData[idx].attendance[k] = "Excused";
                                  });
                                  newData[idx].attendanceConfirmedExcuse = true; // disable row
                                  setStudentAttendees(newData);
                                } else {
                                  errorAlert(response.message);
                                }
                              } else {
                                // ❌ Cancel → revert back to old value
                                const newData = [...studentAttendees];
                                newData[idx].attendance[key] = prevValue;
                                setStudentAttendees(newData);
                              }
                            });
                          } else {
                            // Normal Present / Absent
                            const newData = [...studentAttendees];
                            newData[idx].attendance[key] = newValue;
                            setStudentAttendees(newData);
                            changeStudentAttendance(attendee.student_number_id, key, newValue);
                          }
                        }}
                      >
                        <option value="" hidden>Status</option>
                        <option value="Absent">Absent</option>
                        <option value="Present">Present</option>
                        <option value="Excused">Excused</option>
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center gap-2 items-center">
          <button
            onClick={() => fetchStudentAttendees(paginate.page - 1, searchValueStudents)}
            disabled={paginate.page <= 1}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <span className="px-3">
            Page {paginate.page} of {paginate.total_pages}
          </span>

          <button
            onClick={() => fetchStudentAttendees(paginate.page + 1, searchValueStudents)}
            disabled={paginate.page >= paginate.total_pages}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      <button onClick={scanAttendee} 
      disabled={new Date(selectedEventDate) < new Date().setHours(0,0,0,0) } 
      title="Scan QR Code" className={`h-15 ${color} cursor-pointer w-15 absolute right-4 bottom-3 flex justify-center items-center  disabled:bg-[#7a7a7a] rounded-full`}>
            <i className="fa-solid fa-qrcode text-3xl text-white "></i>
          </button>
    </div>
  );
}

export default AttendanceTable;
