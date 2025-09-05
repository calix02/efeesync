import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {confirmAlert,successAlert, errorAlert} from "../utils/alert.js";

const AccountCard = React.forwardRef(({ animate, onAnimationEnd,code}, ref) => {
    const [user, setUser] = useState([]);
/* ------------------------- Color ----------------------------- */
    const colors = {
        cit: "text-[#621668] ",
        coe: "text-[#0E2148]",
        coc: "text-[#3A0519]",
        cot: "text-[#FFD95F] ",
        eap: "text-[#4B352A]",
        osas: "text-[#174515]",
        ssc: "text-[#174515]"
    }
    const color = colors[code] || "text-[#000]";

    const fetchUser = async () => {
        try {
            const res = await fetch("/api/users/current", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setUser(response.data);
            }
        } catch (err) {
            errorAlert("Failed to fetch");
        }
    }

    useEffect(()=> {
        fetchUser();
    }, []);
    
        const logout = () => {
            confirmAlert("You really want to Log out?").then( async (result) =>{
                if(result.isConfirmed){
                    try {
                        const res = await fetch("/api/logout", {
                        method: "POST",
                        credentials: "include"
                    });
                        const response = await res.json();
                        if (response.status === "success") {
                            successAlert(response.message).then((result) =>{
                                if(result.isConfirmed){
                                    window.location.reload();
                                }
                            });
                        }
                    }catch (err) {
                        errorAlert("An error occured: " + response.message);
                    }
                }
            });
        }
    return(
        <div ref={ref}  className={`${animate} ${color} px-5 py-2 rounded-lg bg-white border-1 border-black shadow-[2px_2px_grey] z-50 absolute right-10 top-15 grid items-center  `} 
        onAnimationEnd={onAnimationEnd}>
            <span hidden >{code}</span>
            <center>
                <span className="flex gap-[5px] items-center border-b-2 border-[#545454] px-4 mt-[5px]">
                <span>
                    <span className="material-symbols-outlined">account_circle</span>
                </span>
                <span className="text-start leading-2.5">
                    <h2 className={`font-bold`}>{user.full_name} <br />
                    <span className="text-[9px]">{user.institutional_email}</span>
                    </h2>
                </span>
            </span>
            <Link className="flex items-center ml-[20px] mt-[10px]" onClick={logout}>
                <span className="material-symbols-outlined">logout</span>
                <span>Log Out</span>
            </Link>
            </center>
            
        </div>
    );
});
export default AccountCard;