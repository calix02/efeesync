import React, { useState } from "react";
import { successAlert, errorAlert } from "../utils/alert";

const ChangePassword = React.forwardRef(({animate, onAnimationEnd,onClose,code}, ref) =>{
     const colors = {
        CIT: "border-[#621668] text-[#621668] bg-[#621668]",
        COE: "border-[#020180] text-[#020180] bg-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COT: "border-[#847714] text-[#847714] bg-[#847714]",
        SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg-[#174515]",
        OSAS: "border-[#174515] text-[#174515] bg-[#174515]",

      };
      const color = colors[code] || "border-black text-black";

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newConfirmPass, setNewConfirmPass] = useState("");

    const pwdData = {
        "old_password": oldPass,
        "new_password": newPass,
    }

    const changePassword = async () => {
        if (newPass !== newConfirmPass) {
            errorAlert("Passwords do not match!");
            return;
        }
        if (oldPass == newPass) {
            errorAlert("New password is the same as old password.");
            return;
        }
        try {
            const res = await fetch("/api/users/current/password", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pwdData)
            });

            const response = await res.json();
            if (response.status === "success") {
                successAlert("Succesfully changed password");
            } else {
                errorAlert("Failed: " + response.message);
            }
        } catch (err) {
            errorAlert("Fetch failed: " + err);
        }
    }

    return( 
        <div ref={ref}   className={`${color} ${animate} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-85 px-6 bg-white shadow-[2px_2px_grey,-2px_-2px_white] rounded-lg z-[80] inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 ">
                <span className=" font-semibold lg:text-xl text-lg">Change Password</span>
            </div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                changePassword();
            }}>
                <div className="mt-6">
                    <label>Old Password:</label><br />
                    <input type="password" onChange={(e)=> setOldPass(e.target.value)} className="border-2 px-2 text-[#000] h-8 rounded-md w-[100%] mb-4" required/> <br />
                    <label>New Password:</label><br />
                    <input type="password" onChange={(e)=> setNewPass(e.target.value)} className="border-2 px-2 text-[#000] h-8 rounded-md w-[100%] mb-4" required/> <br />
                    <label>Confirm Password:</label><br />
                    <input type="password" onChange={(e)=> setNewConfirmPass(e.target.value)} className="border-2 px-2 text-[#000]  h-8 rounded-md w-[100%] mb-4" required/> <br />
                    
                </div>
                
                    <button type="submit" className={` ${color} cursor-pointer w-[100%] rounded-md text-white h-8`}>Change Pasword</button>
            </form>
            
        </div>
       
    );
});
export default ChangePassword;