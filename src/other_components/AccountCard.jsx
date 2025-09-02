import {Link} from 'react-router-dom';
import React from 'react';

const AccountCard = React.forwardRef(({ animate, onAnimationEnd,code}, ref) => {
/* ------------------------- Color ----------------------------- */
    const colors = {
        cit: "text-[#621668] ",
        coe: "text-[#0E2148]",
        coc: "text-[#3A0519]",
        cot: "text-[#FFD95F] ",
        eap: "text-[#4B352A]",
        osas: "text-[#174515]"
    }
    const color = colors[code] || "text-[#000]";
    


    const logout = async () => {
        try {
            const res = await fetch("/api/logout", {
                method: "POST",
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                alert(response.message);
                window.location.reload();
            }
        } catch (err) {
            alert("An error occured: " + response.message);
        }
    }
    return(
        <div ref={ref}  className={`${animate} px-5 py-2 rounded-lg bg-white border-1 border-black shadow-[2px_2px_grey] z-50 absolute right-10 top-15 grid items-center  `} 
        onAnimationEnd={onAnimationEnd}>
            <span hidden >{code}</span>
            <center>
                <span className="flex gap-[5px] items-center border-b-2 border-[#545454] w-[200px] mt-[5px]">
                <span>
                    <span className="material-symbols-outlined">account_circle</span>
                </span>
                <span className="text-start leading-2.5">
                    <h2 className={`font-bold ${color}`}>ROLANDO NIERVA III <br />
                    <span className="text-[9px]">citstreasurer@cbsua.edu.ph</span>
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