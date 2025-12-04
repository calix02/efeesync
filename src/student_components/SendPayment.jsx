import React, { useState } from "react";
import { errorAlert, successAlert } from "../utils/alert";

const SendPayment = React.forwardRef(({ animate, onAnimationEnd, onClose, data, code, fetchContributionStatus, fetchDashboardData }, ref) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const colors = {
    CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
    CESC: "border-[#020180] text-[#020180] bg-[#020180]",
    CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
    COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
    SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
    SSC: "border-[#174515] text-[#174515] bg-[#174515]",
  };

  const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && !/\.(png|jpe?g|pdf)$/i.test(selected.name)) {
      errorAlert("Only PNG, JPEG, or PDF files are allowed.");
      e.target.value = "";
    } else if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected)); // show preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return errorAlert("Please attach your payment proof.");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("proof", file);

      const res = await fetch(
        `/api/students/current/onlinepayments/contributions/event/${data?.event_id}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Submission failed.");
      if (fetchDashboardData) fetchDashboardData();
      if (fetchContributionStatus) fetchContributionStatus();
      successAlert("Payment proof submitted successfully! Pending for approval.");
      onClose();

    } catch (err) {
      errorAlert(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        <span className="font-semibold text-[22px]">Sending Payment</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-[15px]">
          <label>Upload Proof of Payment:</label>
          <div className="bg-[#c3c3c3c2] flex flex-col justify-center items-center w-full pt-2 pb-15 rounded-lg mb-4">
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-40 mb-2 rounded-md" />
            ) : (
              <>
                <i className="fa-solid fa-arrow-up-from-bracket text-xl"></i>
                <p className="text-sm">Upload image or PDF file.</p>
              </>
            )}
            <div className="relative w-full mt-2 flex justify-center">
              <button type="button" className="w-25 h-8 border rounded-md absolute bg-white">
                Browse
              </button>
              <input
                type="file"
                accept=".png,.jpeg,.jpg,.pdf"
                required
                onChange={handleFileChange}
                className="absolute w-25 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${color} cursor-pointer w-full rounded-[5px] text-white py-[5px] mt-2 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send Payment"}
        </button>
      </form>
    </div>
  );
});

export default SendPayment;