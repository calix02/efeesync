import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const ScanAttendance = React.forwardRef(({ animate, onAnimationEnd, onClose, data }, ref) => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [yearSection, setYearSection] = useState("");

  const handleScan = (detectedCodes) => {
    if (detectedCodes && detectedCodes.length > 0) {
      const code = detectedCodes[0].rawValue;

      try {
        const parsedData = JSON.parse(code);
        setStudentId(parsedData.id || "");
        setStudentName(parsedData.name || "");
        setYearSection(parsedData.section || "");
      } catch (err) {
        const parts =  detectedCodes[0].rawValue.split(/\r?\n/); 
        setStudentId(parts[0] || "");
        setStudentName(parts[1] || "");
        setYearSection(parts[2] || "");     
      }
    }
  };

  return (
    <div
      ref={ref}
      className={`${animate} lg:w-200 w-80 py-6 px-6 lg:text-sm text-xs font-[family-name:Arial] bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg z-80 inset-0 mx-auto`}
      onAnimationEnd={onAnimationEnd}
    >
      {/* header */}
      <div className="flex justify-end">
        <span onClick={onClose} className="material-symbols-outlined cursor-pointer">
          disabled_by_default
        </span>
      </div>

      <div className="grid grid-cols-2 mt-6">
        <div className="w-[100%] text-center text-xs px-3">
          <p className="mx-4">
            To record your attendance, simply show your QR Code in front of the laptop camera and wait for the system to confirm.
          </p>
          <div className="w-[100%] bg-[#D9D9D9] h-90 flex items-center justify-center">
            <Scanner
              onScan={handleScan}
              onError={(error) => console.error("Scanner error:", error)}
              scanDelay={500}       /* optional */
              allowMultiple={true}
              formats={[
                "qr_code",       // QR codes
                "code_128",      // Common barcodes
                "ean_13",        // Retail barcodes
                "ean_8",         // Short retail codes
                "upc_a",         // UPC-A barcodes
                "upc_e",         // UPC-E barcodes
                "codabar",       // Library/healthcare barcodes
                "itf",           // ITF (interleaved 2 of 5)
                "data_matrix",   // 2D codes
                "pdf417",        // ID cards, boarding passes
                "aztec"          
              ]} 
            />
          </div>
        </div>

        {/* Form side */}
        <div className="w-[100%] text-[#621668] font-[family-name:Arial] px-6">
          <h3 className="font-bold text-center mb-12 font-poppins text-lg">Attendance Record</h3>
          <form>
            <label className="text-sm">Student ID: </label>
            <input
              type="text"
              value={studentId}
              readOnly
              className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mt-2 mb-3"
            />

            <label className="text-sm">Student Name: </label>
            <input
              type="text"
              value={studentName}
              readOnly
              className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mt-2 mb-3"
            />

            <label className="text-sm">Year & Section </label>
            <input
              type="text"
              value={yearSection}
              readOnly
              className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mt-2 mb-3"
            />

            <label className="text-sm">Attendance Logs: </label>
            <div className="border-2 px-2 flex justify-center items-center gap-2 border-[#8A2791] h-8 rounded-md w-[100%] mt-2 mb-3">
              <span className="flex justify-center items-center">
                <input type="radio" name="log" /> <label>AM IN</label>
              </span>
              <span className="flex justify-center items-center">
                <input type="radio" name="log" /> <label>AM OUT</label>
              </span>
              <span className="flex justify-center items-center">
                <input type="radio" name="log" /> <label>PM IN</label>
              </span>
              <span className="flex justify-center items-center">
                <input type="radio" name="log" /> <label>PM OUT</label>
              </span>
            </div>

            <button
              type="button"
              className="w-[100%] text-white mt-2 rounded-md h-8 bg-[#621668]"
            >
              Mark Present
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default ScanAttendance;
