import React, { useState } from "react";
import Check from "../assets/check.gif"; // your animated check icon

function Success({ message = "Successfully log in",onFinish }) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // simulate loading before navigating
    setTimeout(() => {
      if (onFinish) onFinish(); 
    }, 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-[320px] animate-fadeIn">
        <img src={Check} alt="success" className="w-24 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-600">{message}</h2>
        <p className="text-gray-600 mt-2">Welcome back to your dashboard</p>

        <button
          onClick={handleClick}
          disabled={loading}
          className={`mt-6 px-6 py-2 rounded-md text-white font-semibold transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Redirecting...
            </span>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
}

export default Success;
