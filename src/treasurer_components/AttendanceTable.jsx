import { useState, useEffect, useMemo } from "react";
import { errorAlert, confirmAlert } from '../utils/alert.js';
import "../animate.css";

function AttendanceTable({ code, attendees = [], scanAttendee, selectedEvent, selectedEventDate, formatDateStr}) {
  const animate = "card-In";

  const [studentAttendees, setStudentAttendees] = useState([]);
  const [attendanceKeys, setAttendanceKeys] = useState([]);

  const textColor =
    code === "cit" ? "text-[#4F1C51]"
    : code === "coe" ? "text-[#0E2148]"
    : code === "coc" ? "text-[#3A0519]"
    : code === "cot" ? "text-[#FFD95F]"
    : code === "eap" ? "text-[#4B352A]"
    : code === "osas" ? "text-[#27391C]"
    : "text-black";

  const fallback = [];

  const [paginate, setPaginate] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 1
  });


  const fetchStudentAttendees = async (page=1, search="") => {
    try {
      const res = await fetch(`/api/events/${selectedEvent.event_id}/attendance/made/date/${selectedEventDate}?page=${page}&search=${search}`, {
        credentials: "include"
      });
      const response = await res.json();
      if (response.status === "success") {
        setPaginate(response.meta);
        setStudentAttendees(response.data);
        if (response.data.length > 0) {
          setAttendanceKeys(Object.keys(response.data[0].attendance));
        }
      }
    } catch (err) {
      errorAlert("Fetch Failed" + err);
    }
  };

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
        errorAlert(response.message);
      }
    } else if (target === "Absent") {
      const res = await fetch(apiAttendance, {
        method: "DELETE",
        credentials: "include"
      });
      const response = await res.json();
      if (response.status !== "success") {
        errorAlert(response.message);
      }
    } else if (target === "Excuse") {
      const res = await fetch(`/api/events/${selectedEvent.event_id}/attendance/${selectedEventDate}/number/${student_number_id}`, {
        method: "PUT",
        credentials: "include"
      });
      const response = await res.json();
      if (response.status !== "success") {
        errorAlert(response.message);
      }
    }
  };

  useEffect(() => {
    fetchStudentAttendees();
  }, [selectedEvent, selectedEventDate]);

  const data = studentAttendees.length ? studentAttendees : fallback;

  const handleChange = (rowIndex, field, value) => {
    setStatuses((prev) =>
      prev.map((row, i) =>
        i === rowIndex ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <div className={`w-full ${animate} flex flex-col gap-6 lg:text-sm text-xs font-[family-name:Arial]`}>
      <div className={`lg:ml-70 bg-white text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        <table className="w-full text-center">
          <thead>
            <tr className={`border-b-2 border-[#adadad] ${textColor}`}>
              <th><input type="checkbox" /></th>
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
                <td><input type="checkbox" /></td>
                <td hidden>{attendee.student_id}</td>
                <td>{attendee.student_full_name}</td>
                <td className="py-4">{attendee.student_section}</td>

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
                          value === "Excused" ||               // disable if excused
                          new Date(selectedEventDate) < new Date().setHours(0,0,0,0) 
                        // disable if past date
                        }
                        className="disabled:text-[#b0b0b0]"
                        onChange={(e) => {
                          const newData = [...studentAttendees];
                          newData[idx].attendance[key] = e.target.value;
                          setStudentAttendees(newData);
                          changeStudentAttendance(attendee.student_number_id, key, e.target.value);
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
            onClick={() => fetchStudentAttendees(paginate.page - 1)}
            disabled={paginate.page <= 1}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <span className="px-3">
            Page {paginate.page} of {paginate.total_pages}
          </span>

          <button
            onClick={() => fetchStudentAttendees(paginate.page + 1)}
            disabled={paginate.page >= paginate.total_pages}
            className="cursor-pointer border rounded disabled:opacity-40 p-1"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      <button onClick={scanAttendee} 
      disabled={new Date(selectedEventDate) < new Date().setHours(0,0,0,0) } 
      title="Scan QR Code" className="  h-15 cursor-pointer w-15 absolute right-4 bottom-3 flex justify-center items-center bg-[#621668] disabled:bg-[#7a7a7a] rounded-full">
            <i className="fa-solid fa-qrcode text-3xl text-white "></i>
          </button>
    </div>
  );
}

export default AttendanceTable;
