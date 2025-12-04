import React, { useEffect, useState } from "react";
import { errorAlert, successAlert } from "../utils/alert.js";

const SendExcuse = React.forwardRef(({ animate, onAnimationEnd, code, onExcuseSent,  onClose, selectedEvent, formatDateStr }, ref) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(selectedEvent?.event_id);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState("");

  // Handle file change
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && !/\.(pdf|jpg|jpeg|png)$/i.test(selected.name)) {
      errorAlert("Only PDF, JPG, JPEG, or PNG files are allowed.");
      e.target.value = "";
    } else if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // Send excuse request
  const clickedSendExcuse = async () => {
    if (!reason.trim()) {
      errorAlert("Reason is required.");
      return;
    }
    if (!selectedDate) {
      errorAlert("Please select a date to excuse.");
      return;
    }
    if (!file) {
      errorAlert("Please upload a proof file.");
      return;
    }

    const formData = new FormData();
    formData.append("reason", reason);
    formData.append("proof_file", file);

    try {
      const token = localStorage.getItem("jwt_token"); // adjust if stored differently
      const response = await fetch(
        `/api/students/current/excuses/event/${selectedEventId}/date/${selectedDate}`, {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok && result.status === "success") {
        successAlert("Excuse successfully submitted!");
        onExcuseSent(selectedEventId);
        onClose();
      } else {
       // errorAlert(result.message || "Failed to submit excuse.");
      }
    } catch (err) {
     // errorAlert("An unexpected error occurred.");
    }
  };

  // Auto-select first attendance date
  useEffect(() => {
    if (selectedEvent?.attendance?.length > 0) {
      setSelectedDate(selectedEvent.attendance[0].event_attend_date);
    }
  }, [selectedEvent]);

  const colors = {
    CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
    CESC: "border-[#020180] text-[#020180] bg-[#020180]",
    CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
    COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
    SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
    SSC: "border-[#174515] text-[#174515] bg-[#174515]",
  };
  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

  return (
    <div
      ref={ref}
      className={`${animate} ${color} lg:w-[420px] w-[390px] py-4 px-8 bg-white rounded-lg z-50 inset-0 mx-auto`}
      onAnimationEnd={onAnimationEnd}
    >
      <div className="mt-[10px] relative">
        <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">
          disabled_by_default
        </span>
      </div>
      <div className="mt-[20px] border-b-4">
        <span className="font-semibold text-[22px]">Excuse Letter Request</span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          clickedSendExcuse();
        }}
      >
        <div className="mt-[15px]">
          <label htmlFor="">Reason:</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="h-8 w-[100%] border-2 rounded-md mb-3 px-2"
          />
          <label htmlFor="">Excuse Date: </label>
          <select
            className="h-8 w-[100%] border-2 rounded-md mb-3 cursor-pointer"
            value={selectedDate || ""}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {selectedEvent.attendance.map((se) => (
              <option key={se.event_attend_date} value={se.event_attend_date}>
                {formatDateStr(se.event_attend_date)}
              </option>
            ))}
          </select>

          <label>Upload Your Excuse Letter:</label>
          <div className="bg-[#c3c3c3c2] flex flex-col justify-center items-center w-[100%] rounded-lg mb-4 py-3">
            <i className="fa-solid fa-arrow-up-from-bracket text-xl"></i>
            <p className="text-sm">Upload image or file.</p>
            <div className="relative w-[100%] mt-2 flex justify-center">
              <button type="button" className="w-25 h-8 cursor-pointer border-1 rounded-md absolute">
                Browse
              </button>
              <input
                type="file"
                accept=".pdf,.jpeg,.jpg,.png"
                onChange={handleFileChange}
                className="bg-amber-200 py-1 z-[1] w-30 opacity-0"
              />
            </div>
            {preview && (
              <div className="mt-3 text-center">
                {/\.(pdf)$/i.test(file.name) ? (
                  <p className="text-xs text-gray-700">{file.name}</p>
                ) : (
                  <img src={preview} alt="Preview" className="w-24 h-24 rounded-md object-cover border mt-2" />
                )}
              </div>
            )}
          </div>
        </div>

        <button type="submit" className={`w-[100%] ${color} rounded-[5px] text-white py-[5px]`}>
          Send Request
        </button>
      </form>
    </div>
  );
});

export default SendExcuse;