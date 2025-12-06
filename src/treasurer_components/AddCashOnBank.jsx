import React, {useState} from "react";
import { successAlert, errorAlert } from "../utils/alert";

const AddCashOnBank = React.forwardRef(({animate, onAnimationEnd,onClose, code, data}, ref) =>{
    const colors = {
            CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
            CESC: "border-[#020180] text-[#020180] bg-[#020180]",
            CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
            SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]"
        };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    const [amount, setAmount] = useState(0);
    
    
    return( 
        <div ref={ref}   className={` ${animate} ${color} lg:w-100 w-80 pt-2 pb-6 px-6 font-[family-name:Arial] lg:text-sm text-xs bg-white  rounded-lg  z-80 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 ">
                <span className="font-semibold lg:text-xl text-lg">Add Cash on Bank</span>
            </div>
            <form onSubmit={(e)=>{
                onClose();
                data(amount);
                e.preventDefault();
            }} >
            <div className="mt-4">
                <label>Cash Amount:</label><br />
                <input type="number" onChange={(e) =>setAmount(e.target.value)} required value={amount} className=" px-2 border-2  h-8 rounded-md w-[100%] mb-4" /> <br />
            </div>
            
                <button type="submit"  className={`${color} w-[100%] cursor-pointer rounded-md text-white h-8`}>Insert Cash Bank</button>
            </form>
        </div>
       
    );
});
export default AddCashOnBank;