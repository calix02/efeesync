import React, {useState} from "react";
import { successAlert, errorAlert } from "../utils/alert";

const EditCashOutflowCard = React.forwardRef(({animate, onAnimationEnd,onClose, code}, ref) =>{
    const colors = {
            CIT: "border-[#621668] text-[#621668] bg-[#621668]",
            COE: "border-[#020180] text-[#020180] bg-[#020180]",
            COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COT: "border-[#847714] text-[#847714] bg-[#847714]",
            ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]"
        };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState("");
    
    const changeDesc = (e) => setDesc(e.target.value);
    const changeAmount = (e) => setAmount(e.target.value);

    const clickedInsert = () =>{
        successAlert("Description: " + desc +
            "Amount: " + amount
        )
    }
   

    
    return( 
        <div ref={ref}   className={` ${animate} ${color} lg:w-100 w-80 pt-2 pb-6 px-6 font-[family-name:Arial] lg:text-sm text-xs bg-white  rounded-lg  z-80 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 ">
                <span className="font-semibold lg:text-xl text-lg">Edit Cash Outflow</span>
            </div>
            <form onSubmit={(e)=>{
                clickedInsert();
                onClose();
                e.preventDefault();

            }} >
            <div className="mt-4">
                <label>Expenses Description:</label><br />
                <input type="text" onChange={changeDesc} required value={desc} maxLength={7}  className=" px-2 border-2  h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Amount:</label><br />
                <input type="text" onChange={changeAmount} required value={amount}  className=" px-2 border-2  h-8 rounded-md w-[100%] mb-4" /> <br />
            </div>
            
                <button type="submit"  className={`${color} w-[100%] cursor-pointer rounded-md text-white h-8`}>Insert Cash Outflow</button>
            </form>
        </div>
       
    );
});
export default EditCashOutflowCard;