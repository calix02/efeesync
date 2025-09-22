import { useState } from "react";
import { okAlert, errorAlert } from "./../utils/alert.js"; 
import Cbsua from "../assets/cbsua.png";

function LogInOption({ loginData, availableRoles, setIsSuccess }) {   // ✅ destructure setIsSuccess

    const performLoginWithSelectedRole = async (roleChoosen) => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    "email": loginData.email,
                    "password": loginData.password,
                    "role": roleChoosen
                })
            });

            const response = await res.json();
            if (response.status === "success") {
                if (response.data != null) {
                    // ✅ trigger success state on parent button
                    if (setIsSuccess) setIsSuccess(true);

                    setTimeout(() => {
                        window.location.reload();  
                    }, 1200); // small delay so animation shows
                }
            } else {
                errorAlert(response.message || "Invalid email or password.");
                return;
            }
           
        } catch (err) {
            errorAlert("Login failed. Please try again.");
            return;
        }
    };

    return(
        <div className="w-110 h-70 font-poppins px-10 rounded-lg z-80 bg-white shadow-[2px_2px_3px_grey]">
            <div className="flex justify-center mt-6">
                <img src={Cbsua} className="w-15" alt="" />
            </div>
            <h3 className="text-lg font-semibold text-center mt-3">Log In As</h3>
            {availableRoles.map((s, idx) => (
                <button 
                  key={idx}
                  className="w-[100%] hover:bg-[#075207] text-sm cursor-pointer hover:text-white transition duration-200 hover:scale-102 mt-6 rounded-md border-1 border-[#075207] h-8" 
                  onClick={() => performLoginWithSelectedRole(s.role_name)}
                >
                  {s.role_name.charAt(0).toUpperCase() + s.role_name.slice(1)}
                </button>
            ))}
        </div>
    );
}

export default LogInOption;
