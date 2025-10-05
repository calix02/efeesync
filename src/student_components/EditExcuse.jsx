import React, { useState } from "react";
import { errorAlert, successAlert } from "../utils/alert.js";

const EditExcuse = React.forwardRef(({ animate, onAnimationEnd, onClose, code, data, fetchExcuses }, ref) => {
  const colors = {
    CIT: "border-[#621668] text-[#621668] bg-[#621668]",
    COE: "border-[#020180] text-[#020180] bg-[#020180]",
    COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
    COT: "border-[#847714] text-[#847714] bg-[#847714]",
    ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
    SSC: "border-[#174515] text-[#174515] bg-[#174515]",
  };
  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

  const [reason, setReason] = useState(data?.attendance_excuse_reason || "");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [replaceFile, setReplaceFile] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle file change
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && !/\.(jpg|jpeg|png|pdf)$/i.test(selected.name)) {
      errorAlert("Only JPG, PNG, and PDF files are allowed");
      e.target.value = "";
    } else if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("reason", reason);
      if (replaceFile && file) {
        formData.append("proof_file", file);
      }

      const response = await fetch(`/api/students/current/excuses/${data.attendance_excuse_id}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok && result.status === "success") {
        fetchExcuses();
        successAlert("Excuse updated successfully!");
        onClose();
      } else {
        errorAlert(result.message || "Failed to update excuse");
      }
    } catch (err) {
      errorAlert("An error occurred while updating the excuse");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`${animate} ${color} lg:w-[420px] w-[390px] py-4 px-8 bg-white rounded-lg z-80 inset-0 mx-auto`}
      onAnimationEnd={onAnimationEnd}
    >
      {/* Close Button */}
      <div className="mt-[10px] relative">
        <span
          onClick={onClose}
          className="material-symbols-outlined absolute right-0.5 cursor-pointer"
        >
          disabled_by_default
        </span>
      </div>

      <div className="border-b-4 mb-2">
        <span className="font-semibold text-[22px]">Edit Excuse Letter</span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Reason */}
        <div className="mt-[15px]">
          <label>Reason</label>
          <input
            type="text"
            className="h-8 w-full border-2 rounded-md mb-3 px-2"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          {/* Replace File Toggle */}
          <div className="flex items-center mb-2">
            <input
              id="replaceFile"
              type="checkbox"
              checked={replaceFile}
              onChange={(e) => setReplaceFile(e.target.checked)}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="replaceFile" className="cursor-pointer text-sm">
              Replace existing file
            </label>
          </div>

          {/* Conditional File Upload */}
          {replaceFile && (
            <div className="bg-[#c3c3c3c2] flex flex-col justify-center items-center w-full py-5 rounded-lg mb-4">
              <i className="fa-solid fa-arrow-up-from-bracket text-xl"></i>
              <p className="text-sm">Upload new file (JPG, PNG, or PDF)</p>
              <div className="relative w-full mt-2 flex justify-center">
                <button type="button" className="w-25 h-8 border rounded-md absolute">
                  Browse
                </button>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  className="z-[1] w-30 opacity-0 cursor-pointer"
                />
              </div>

              {preview && (
                <div className="mt-2 text-sm text-gray-700">
                  Preview:
                  {/\.(jpg|jpeg|png)$/i.test(file?.name) ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-[120px] mt-1 rounded-md border"
                    />
                  ) : (
                    <span className="block mt-1">{file?.name}</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${color} cursor-pointer rounded-[5px] text-white py-[5px] mt-2`}
        >
          {loading ? "Updating..." : "Update Excuse"}
        </button>
      </form>
    </div>
  );
});

export default EditExcuse;