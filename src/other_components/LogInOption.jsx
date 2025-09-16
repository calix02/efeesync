import { useState } from "react";
import { okAlert, errorAlert } from "./../utils/alert.js"; 
import Cbsua from "../assets/cbsua.png";
function LogInOption(loginData, availableRoles){

    const performLoginWithSelectedRole = async (roleChoosen) => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    "email": loginData.loginData.email,
                    "password": loginData.loginData.password,
                    "role": roleChoosen
                })
            });

            const response = await res.json();
            if (response.status === "success") {
                if (response.data != null) {
                    window.location.reload();  
                }
            } else {
                errorAlert(response.message || "Invalid email or password.");
                return;
            }
           
        } catch (err) {
            errorAlert("Login failed. Please try again.");
            return;
        }
    }
    return(
        <div className="w-110 h-70 font-poppins px-10 rounded-lg  z-80 bg-white shadow-[2px_2px_3px_grey]">
            <div className="flex justify-center mt-6">
                <img src={Cbsua} className="w-15" alt="" />
            </div>
            <h3 className=" text-lg font-semibold text-center mt-3">Log In As</h3>
            {(loginData.availableRoles).map((s, idx) => (
                <button className="w-[100%] hover:bg-[#075207] text-sm cursor-pointer hover:text-white transiton duration-200 hover:scale-102 mt-6 rounded-md border-1 bnorder-[#075207] h-8 " onClick={() => performLoginWithSelectedRole(s.role_name)}>{(s.role_name).charAt(0).toUpperCase()+(s.role_name).slice(1)}</button>
            ))}
        </div>
    );

}
export default LogInOption;