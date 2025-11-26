import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {confirmAlert,errorAlert} from "../utils/alert.js";

const AccountCard = React.forwardRef(({ animate, onAnimationEnd,code}, ref) => {
    const [user, setUser] = useState([]);
/* ------------------------- Color ----------------------------- */
    const colors = {
    CITSC: "text-[#621668]",
    CESC: "text-[#020180]",
    CCSC: "text-[#660A0A]",
    COTSC: "text-[#847714]",
    SCEAP: " text-[#6F3306]",
    SSC: "text-[#174515]"
  };
  const color = colors[code] || " text-[#174515]";

    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        setLoading(true);
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
        }finally{
            setLoading(false);
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
                            window.location.reload();
                        }
                    }catch (err) {
                        errorAlert("An error occured: " + response.message);
                    }
                }
            });
        }
    return(
        <>
        {loading ? (
        <div ref={ref} onAnimationEnd={onAnimationEnd}  className={`${animate} ${color} px-5 py-6 rounded-lg bg-white border-1 border-black shadow-[2px_2px_grey] z-50 absolute right-10 top-15 grid items-center  `}>
            <div className="w-full flex gap-5">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="flex flex-col gap-2">
                    <div className="w-30 rounded-full h-3 bg-gray-200 animate-pulse"></div>
                    <div className="w-40 rounded-full h-3 bg-gray-200 animate-pulse"></div>
                    <div className="w-40 rounded-full h-3 bg-gray-200 animate-pulse"></div>


                </div>
            </div>

        </div> 

        ) :(
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
        )}
        </>
    );
});
export default AccountCard;