import React, { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import Quagga from "quagga";

const ScanAttendance = React.forwardRef(
  ({ animate, onAnimationEnd, onClose, code, selectedEvent, selectedEventDate, fetchStudentAttendees }, ref) => {
    const colors = {
      CIT: "border-[#621668] text-[#621668] bg-[#621668] ",
      COE: "border-[#020180] text-[#020180] bg-[#020180]",
      COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
      COT: "border-[#847714] text-[#847714] bg-[847714]",
      SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
      SSC: "border-[#174515] text-[#174515] bg-[#174515]"
    };
    const color = colors[code] || "border-black text-black";

    const [studentId, setStudentId] = useState("");
    const [studentName, setStudentName] = useState("");
    const [attendanceMessage, setAttendanceMessage] = useState("");
    const [usingQuagga, setUsingQuagga] = useState(false);

    const [autoMark, setAutoMark] = useState(false);
    const [timeInout, setTimeInout] = useState("");
    const [isErrorAttendance, setIsErrorAttendance] = useState(false);

    const attendanceForDate = selectedEvent?.attendance?.find(
      (att) => att.event_attend_date === selectedEventDate
    )

    // --- Detect if mobile or desktop ---
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const cameraFacingMode = isMobile ? "environment" : "user";

    // --- Parse decoded text into form fields ---
    const handleDecodedText = (decodedText) => {
      try {
        const parts = decodedText.split(/\r?\n/);
        setStudentId(parts[0] || "");
        setStudentName(parts[1] || "");
        if (autoMark) {
          markAttendance(parts[0]);
        }
      } catch (err) {
        console.error("An error occured: " + err);
      }
    };

    // --- ZXing Handler (QR codes) ---
    const handleZXingScan = (results) => {
      if (results && results.length > 0) {
        const decodedText = results[0].rawValue;
        handleDecodedText(decodedText);
      }
    };

    const markAttendance = async (student_number_id) => {
      if (!timeInout) {
        setAttendanceMessage("Please select a time slot before marking attendance.");
        return;
      }
      fetchStudentAttendees();
      const splittedTimeInout = timeInout.split(' ');
      const time = splittedTimeInout[0];
      const inout = splittedTimeInout[1];
      const apiAttendance = `/api/events/${selectedEvent.event_id}/attendance/${selectedEventDate}/${time}/${inout}/number/${student_number_id}`;
      console.log(apiAttendance);
      const res = await fetch(apiAttendance, {
        method: "POST",
        credentials: "include"
      });
      const response = await res.json();
      if (response.status !== "success") {
        setIsErrorAttendance(true);
      }
      setAttendanceMessage(response.message);
    }

    useEffect(() => {
      if (!timeInout && attendanceForDate?.event_attend_time?.length) {
        setTimeInout(attendanceForDate.event_attend_time[0]);
      }
    }, [attendanceForDate]);

    // Clear attendance message after 3 seconds
    useEffect(() => {
      if (attendanceMessage) {
        const timer = setTimeout(() => {
          setAttendanceMessage("");
          setIsErrorAttendance(false); // also reset error state
        }, 3000);

        return () => clearTimeout(timer); // cleanup
      }
    }, [attendanceMessage]);

    // Auto-mark whenever studentId updates AND autoMark is enabled
    useEffect(() => {
      if (autoMark && studentId) {
        markAttendance(studentId);
      }
    }, [studentId, autoMark]);

    // --- Quagga Handler (Barcodes, Code39 only) ---
    useEffect(() => {
      if (!usingQuagga) return;

      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            target: document.querySelector("#quagga-reader"),
            constraints: {
              facingMode: cameraFacingMode, // ✅ Auto webcam or back camera
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
          },
          decoder: {
            readers: ["code_39_reader"], // ✅ Code39 only
          },
          locate: true,
        },
        (err) => {
          if (err) {
            console.error("Quagga init error:", err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((data) => {
        if (data?.codeResult?.code) {
          const code = data.codeResult.code;
          console.log("Quagga detected (Code39):", code);
          handleDecodedText(code);
        }
      });

      return () => {
        Quagga.stop();
        Quagga.offDetected();
      };
    }, [usingQuagga]);

    return (
      <div
        ref={ref}
        className={`${animate} ${color} lg:w-200 lg:max-h-140 max-h-130 hide-scrollbar overflow-y-scroll w-80 py-3 px-6 lg:text-sm text-xs font-[family-name:Arial] bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg z-80 inset-0 mx-auto`}
        onAnimationEnd={onAnimationEnd}
      >
        <div className="flex justify-end">
          <span
            onClick={onClose}
            className="material-symbols-outlined cursor-pointer "
          >
            disabled_by_default
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-2 mt-6">
          <div className="w-full text-center text-xs px-3">
            <h3 className="font-bold text-black text-xl font-poppins mb-6">
              Show Your QR / Barcode Here
            </h3>
            <p className="mx-4 text-black">
              To record your attendance, show your QR Code or Barcode in front
              of the camera and wait for the system to confirm.
            </p>

            <div className="w-full bg-[#D9D9D9] lg:h-80 h-60 flex items-center justify-center relative overflow-hidden rounded-md">
              {!usingQuagga ? (
                <Scanner
                  onScan={handleZXingScan}
                  onError={(err) => console.error("ZXing error:", err)}
                  components={{ audio: true }}
                  constraints={{
                    facingMode: cameraFacingMode, // ✅ Auto webcam or back camera
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  id="quagga-reader"

                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>

            <button
              onClick={() => setUsingQuagga((prev) => !prev)}
              className={`mt-3 cursor-pointer ${color} text-white  px-4 py-1 rounded-md`}
            >
              {usingQuagga ? "Scan Qr codes" : "Scan Barcodes"}
            </button>
          </div>

          <div className="w-full font-[family-name:Arial] lg:px-6 px-3">
            <h3 className="font-bold text-center mb-5 mt-15 font-poppins text-lg">
              Attendance Record
            </h3>
            <form>
              <label className="text-sm">Student ID: </label>
              <input
                type="text"
                value={studentId}
                onChange={(e)=>setStudentId(e.target.value)}
                maxLength={7}
                className="border-2 px-2 h-8 rounded-md w-full mt-2 mb-3"
              />

              <label className="text-sm">Student Name: </label>
              <input
                type="text"
                value={studentName}
                readOnly
                className="border-2 px-2  h-8 rounded-md w-full mt-2 mb-3"
              />

              <label className="text-sm">Message: </label>
              <input
                type="text"
                value={attendanceMessage}
                readOnly
                className={`border-2 px-2 h-8 rounded-md w-full mt-2 mb-3 ${isErrorAttendance ? "text-red-500" : ""}`}
              />
              <label htmlFor="">Attendance Logs</label><br />
              <div className="border-2 h-8 rounded-md lg:text-sm text-xs flex justify-center gap-2 items-center">
                {(attendanceForDate?.event_attend_time || []).map((value, index) => (
                  <span key={index} className="flex items-center gap-1">
                    <input type="radio" name="event-time" checked={timeInout === value} value={value} onChange={(e)=>{setTimeInout(e.target.value)}} id={`attend-${attendanceForDate.day_num}-${index}`} />
                    <label htmlFor={`attend-${attendanceForDate.day_num}-${index}`}>{value}</label>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 justify-end mt-1">
                <input type="checkbox" checked={autoMark} onChange={(e) => setAutoMark(e.target.checked)} />
                <label htmlFor="">Auto-Mark Attendance</label>
              </div>
              <button disabled={autoMark} onClick={(e)=> {e.preventDefault(); markAttendance(studentId)}} className={`w-[100%] ${color} h-8 rounded-md mt-1 text-white ${autoMark ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>Mark Present</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
);

export default ScanAttendance;