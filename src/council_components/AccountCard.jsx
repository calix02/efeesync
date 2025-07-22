import {Link} from 'react-router-dom';
import React from 'react';
const AccountCard = React.forwardRef(({ animate, onAnimationEnd}, ref) => {
    
    return(
        <div ref={ref}  className={`${animate} w-[230px] h-[90px] rounded-[10px] bg-white border-1 border-black shadow-[2px_2px_grey] absolute right-[45px] top-[60px] grid items-center  `} 
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
            <Link to="/" className="flex items-center ml-[20px] mt-[10px]">
                <span className="material-symbols-outlined">logout</span>
                <span>Log Out</span>
            </Link>
            </center>
            
        </div>
    );
});
export default AccountCard;