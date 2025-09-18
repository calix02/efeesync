import { useState, useMemo } from "react";
import "../animate.css";

function AttendanceTable({ code, attendees = [],scanAttendee }) {
  const animate = "card-In";

  const textColor =
    code === "cit" ? "text-[#4F1C51]"
    : code === "coe" ? "text-[#0E2148]"
    : code === "coc" ? "text-[#3A0519]"
    : code === "cot" ? "text-[#FFD95F]"
    : code === "eap" ? "text-[#4B352A]"
    : code === "osas" ? "text-[#27391C]"
    : "text-black";

  const fallback = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: `Mark Angelo Alvarado ${i + 1}`,
    yearSection: `3A`,
  }));

  const data = attendees.length ? attendees : fallback;

  const [statuses, setStatuses] = useState(
    data.map(() => ({
      mIn: "",
      mOut: "",
      aIn: "",
      aOut: "",
    }))
  );

  const handleChange = (rowIndex, field, value) => {
    setStatuses((prev) =>
      prev.map((row, i) =>
        i === rowIndex ? { ...row, [field]: value } : row
      )
    );
  };

  const PAGE_SIZE = 8;
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(data.length / PAGE_SIZE);

  const pageData = useMemo(
    () => data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page, data]
  );

  const goPrev = () => setPage(Math.max(0, page - 1));
  const goNext = () => setPage(Math.min(pageCount - 1, page + 1));

  return (
    <div className={`w-full ${animate} flex flex-col gap-6 lg:text-sm text-xs font-[family-name:Arial]`}>
      <div className={`lg:ml-70 bg-white text-black flex-grow p-5 mt-3 rounded-lg shadow-[2px_2px_2px_grey]`}>
        <table className="w-full text-center">
          <thead>
            <tr className={`border-b-2 border-[#adadad] ${textColor}`}>
              <th><input type="checkbox" /></th>
              <th hidden>Id</th>
              <th>Student Name</th>
              <th>Year &amp; Section</th>
              <th>AM In</th>
              <th>AM Out</th>
              <th>PM In</th>
              <th>PM Out</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((attendee, idx) => {
              const globalIndex = page * PAGE_SIZE + idx; // absolute index
              const rowStatus = statuses[globalIndex];

              return (
                <tr key={attendee.id} className="border-b border-[#0505057a]">
                  <td><input type="checkbox" /></td>
                  <td hidden>{attendee.id}</td>
                  <td>{attendee.name}</td>
                  <td className="py-4">{attendee.yearSection}</td>

                  <td className={
                    rowStatus.mIn === "Present" ? "text-[#099620]" :
                    rowStatus.mIn === "Absent" ? "text-[#c91010]" :
                    rowStatus.mIn === "Excuse" ? "text-[#b1760a]" : ""
                  }>
                    <select
                      value={rowStatus.mIn}
                      onChange={(e) => handleChange(globalIndex, "mIn", e.target.value)}
                    >
                      <option value="">Status</option>
                      <option value="Absent">Absent</option>
                      <option value="Present">Present</option>
                      <option value="Excuse">Excuse</option>
                    </select>
                  </td>

                  <td className={
                    rowStatus.mOut === "Present" ? "text-[#099620]" :
                    rowStatus.mOut === "Absent" ? "text-[#c91010]" :
                    rowStatus.mOut === "Excuse" ? "text-[#b1760a]" : ""
                  }>
                    <select
                      value={rowStatus.mOut}
                      onChange={(e) => handleChange(globalIndex, "mOut", e.target.value)}
                    >
                      <option value="">Status</option>
                      <option value="Absent">Absent</option>
                      <option value="Present">Present</option>
                      <option value="Excuse">Excuse</option>
                    </select>
                  </td>

                  <td className={
                    rowStatus.aIn === "Present" ? "text-[#099620]" :
                    rowStatus.aIn === "Absent" ? "text-[#c91010]" :
                    rowStatus.aIn === "Excuse" ? "text-[#b1760a]" : ""
                  }>
                    <select 
                      value={rowStatus.aIn}
                      onChange={(e) => handleChange(globalIndex, "aIn", e.target.value)}
                    >
                      <option value="">Status</option>
                      <option value="Absent">Absent</option>
                      <option value="Present">Present</option>
                      <option value="Excuse">Excuse</option>
                    </select>
                  </td>

                  <td className={
                    rowStatus.aOut === "Present" ? "text-[#099620]" :
                    rowStatus.aOut === "Absent" ? "text-[#c91010]" :
                    rowStatus.aOut === "Excuse" ? "text-[#b1760a]" : ""
                  }>
                    <select
                      value={rowStatus.aOut}
                      onChange={(e) => handleChange(globalIndex, "aOut", e.target.value)}
                    >
                      <option value="">Status</option>
                      <option value="Absent">Absent</option>
                      <option value="Present">Present</option>
                      <option value="Excuse">Excuse</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center gap-2">
          <button onClick={goPrev} disabled={page === 0} className="cursor-pointer border rounded disabled:opacity-40">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-2 border cursor-pointer rounded ${i === page ? "bg-[#621668] text-white" : "bg-white"}`}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={goNext} disabled={page === pageCount - 1} className="cursor-pointer border rounded disabled:opacity-40">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      <div onClick={scanAttendee} title="Scan QR Code"className="h-15 cursor-pointer w-15 absolute right-4 bottom-3 flex justify-center items-center bg-[#621668] rounded-full">
            <i className="fa-solid fa-qrcode text-3xl text-white "></i>
          </div>
    </div>
  );
}

export default AttendanceTable;
