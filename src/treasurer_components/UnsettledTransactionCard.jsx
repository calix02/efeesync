import React, {useState} from "react";
import { successAlert, errorAlert } from "../utils/alert";
import { use } from "react";

const UnsettledTransactionCard = React.forwardRef(({animate, onAnimationEnd,onClose, code, data}, ref) =>{
    const colors = {
            CIT: "border-[#621668] text-[#621668] bg-[#621668]",
            COE: "border-[#020180] text-[#020180] bg-[#020180]",
            COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COT: "border-[#847714] text-[#847714] bg-[#847714]",
            ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]"
        };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    const [collect, setCollect] = useState(false);
    const clickedCollect = () => setCollect(!collect);

    const [partial, setPartial] = useState(false);
    const clickedPartial = () => setPartial(!partial);

    const [amountSanction, setAmountSanction] = useState("");
    const [amountPartial, setAmountPartial] = useState("");


    const changeAmountSanction = (e) => setAmountSanction(e.target.value);
    const changeAmountPartial = (e) => setAmountPartial(e.target.value);

    const collectAmount = () =>{
        successAlert("Amount : " + amountSanction);
        setAmountSanction(" ");
    }
     const collectPartial = () =>{
        successAlert("Amount : " + amountPartial);
        setAmountPartial(" ");
    }

    return( 
        <div ref={ref}   className={` ${animate} ${color} lg:w-200 w-80 pt-3 pb-8 px-6 font-[family-name:Arial] lg:text-sm text-xs bg-white  rounded-lg  z-80 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
             <form onSubmit={(e)=>{
                            collectAmount();
                            clickedCollect();
                            e.preventDefault();
             }}>
            <div className="mt-6 border-b-4 ">
                <span className="font-semibold lg:text-xl text-lg">Unsettled Transactions</span>
            </div>
            <div className="h-50 overflow-y-scroll hide-scrollbar">
                <h3 className="font-bold sticky top-0 font-inter text-lg mt-3">Sanctions</h3>
                <table className="w-[100%]  text-center" >
                    <thead className={`${color} sticky top-8 `}>
                        <tr className="text-white">
                            <th className="py-1.5">Event Name</th>
                            <th>Total Sanctions</th>
                            <th>Balance</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                       
                        <tr className=" border-b-1 text-black border-[#635C5C30]">
                            <td className="py-4">General Assembly</td>
                            <td>18</td>
                            <td>0</td>
                            <td >
                                {collect === false &&(
                                    <button onClick={clickedCollect} className="px-3 cursor-pointer py-0.5 rounded-sm text-[#65A810] border border-[#65A810]">Collect</button>
                                )}
                                {collect === true &&(
                                    <>
                                    <input onChange={changeAmountSanction}  type="number" className="py-0.5 text-center w-20 rounded-sm border border-[#65A810]" />
                                    <button hidden type="submit" >Collect</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </form>
            <form onSubmit={(e) =>{
                collectPartial();
                e.preventDefault();
                clickedPartial();
            }}>
            <div className=" h-50 overflow-y-scroll hide-scrollbar mt-8">
                <h3 className="font-bold font-inter bg-white  sticky top-0 text-lg mt-3">Unsettled Contributions</h3>
                <table className="w-[100%]  text-center" >
                    <thead className={`${color} text-white sticky top-8`}>
                        <tr>
                            <th className="py-1.5">Event Name</th>
                            <th>Total Contributions</th>
                            <th>Balance</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr className=" border-b-1 text-black border-[#635C5C30]">
                            <td className="py-4">General Assembly</td>
                            <td>18</td>
                            <td>0</td>
                            <td >
                                {partial === false &&(
                                    <>
                                     <span className="px-3 py-0.5 rounded-sm cursor-pointer text-[#65A810] border border-[#65A810]">Full</span>
                                    <span onClick={clickedPartial} className="px-3 py-0.5 ml-2 cursor-pointer rounded-sm text-[#EAB308] border border-[#EAB308]">Partial</span>
                                    </>
                                )}
                                {partial === true &&(
                                     <>
                                    <input onChange={changeAmountPartial}  type="number" className="py-0.5 text-center w-20 rounded-sm border border-[#EAB308]" />
                                    <button hidden type="submit" >Collect</button>
                                    </>
                                )}
                               
                            </td>
                            
                            
                        </tr>
                        
                        
                    </tbody>
                </table>
            </div>
            </form>
        </div>
           
       
    );
});
export default UnsettledTransactionCard;