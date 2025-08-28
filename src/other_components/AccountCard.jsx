import {Link} from 'react-router-dom';
import React from 'react';
import apiUrl from "./../apiUrl.js";

const AccountCard = React.forwardRef(({ animate, onAnimationEnd}, ref) => {
    const logout = async () => {
        try {
            const res = await fetch(apiUrl + "/logout", {
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
        <div ref={ref}  className={`${animate} w-[230px] h-[90px] rounded-[10px] bg-white border-1 border-black shadow-[2px_2px_grey] z-50 absolute right-[45px] top-[60px] grid items-center  `} 
        onAnimationEnd={onAnimationEnd}>
            <center>
                <span className="flex gap-[5px] items-center border-b-2 border-[#545454] w-[200px] mt-[5px]">
                <span>
                    <span className="material-symbols-outlined">account_circle</span>
                </span>
                <span className="text-start leading-2.5">
                    <h2 className="font-bold text-[#8A2791]">ROLANDO NIERVA III <br />
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