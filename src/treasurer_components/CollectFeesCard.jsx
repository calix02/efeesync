import React from "react";
import { useState, useEffect } from "react";
import { successAlert } from "../utils/alert";
const CollectFeesCard = React.forwardRef(({animate, onAnimationEnd,onClose,code},ref) =>{
     const colors = {
      CITSC: "border-[#621668] text-[#621668] bg-[#621668] ",
      CESC: "border-[#020180] text-[#020180] bg-[#020180]",
      CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
      COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
      SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
      SSC: "border-[#174515] text-[#174515] bg-[#174515]"
    };
    const color = colors[code] || "border-black text-black";
    const [paidForValue, setPaidForValue] = useState("");
    const [studentId, setStudentId] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("");
    const [amountToPay, setAmountToPay] = useState(0);
    const [collect, setCollect] = useState("");
    const [valid, setValid] = useState(false);

    React.useEffect(() =>{
        const id = /^\d{2}-\d{4}$/;
        const fee = /\d/;
        if( id.test(studentId) && 
            paidForValue != "" &&
            (paidForValue == "Sanctions" || selectedEvent != "") &&
            (fee.test(collect))
            )
        {
            setValid(true);
        }else{
            setValid(false);
        }
    })
    const eventData = {
        event: [
            {
            eventName : "IT Week",
            contribution: 200
            },
             {
            eventName : "Year End",
            contribution: 400
            }
        ]
    }
    const handleSelectPaidFor = (e) => {
        const value = e.target.value;
        setPaidForValue(value);

        if (value === "Sanctions") {
            setAmountToPay(0);
            setSelectedEvent("");
        }
    };

    const handleSubmit = (e) =>{
        successAlert("Student Id : " + studentId +
            "Event Name: " + selectedEvent +
            "Amount : " + collect
        );

        e.preventDefault();
    }
   
    return(
        <div ref ={ref} onAnimationEnd={onAnimationEnd} className={`${animate} ${color} px-8 w-100 bg-white rounded-2xl min-h-95 py-4`}>
            <div className="flex justify-end ">
                 <span
            onClick={onClose} className="material-symbols-outlined cursor-pointer ">
            disabled_by_default
          </span>
            </div>
            <h1 className="font-poppins border-b-4 text-xl font-semibold">Collect Fees</h1>
            <form onSubmit={handleSubmit}  className=" font-poppins flex flex-col gap-2 mt-5">
                <div className="">
                    <label htmlFor="">Student Id</label><br />
                    <input placeholder="ex. 22-1917" onChange={(e)=>setStudentId(e.target.value)} type="text" className="w-full h-10 px-2 rounded-md border-2" required /><br />
                    
                </div>
                <div className="">
                    
                    <label htmlFor="">Paid For</label><br />
                    <select className="w-full px-2 rounded-md border-2 h-10 cursor-pointer" name="" id=""  onChange={handleSelectPaidFor} required>
                        <option value=""></option>
                        <option value="Sanctions">Sanctions</option>
                        <option value="Contribution">Contribution</option>
                    </select>
                </div>        
                {paidForValue === "Contribution" && (
                    <div className="">
                        <label htmlFor="">Event Name</label><br />
                        <select className="w-full px-2 rounded-md border-2 h-10 cursor-pointer" name=""  
                       
                        onChange={(e) => {
                            setSelectedEvent(e.target.value);
                            const event = eventData.event.find(ev => ev.eventName === e.target.value);
                            setAmountToPay(event ? event.contribution : "");
                        }}  required>
                            <option value=""></option>
                            {eventData.event.map((data, id) =>(
                            <option key={id} value={data.eventName}>{data.eventName}</option>
                            ))}
                        </select>
                    </div>
                )}     
                <div className="flex gap-2">
                    {paidForValue === "Contribution" &&(
                    <div className=" w-full">
                        <label htmlFor="">Amount to Pay: </label><br />
                        <input value={amountToPay}   type="text" className="w-full   h-10 font-semibold text-lg px-8"  readOnly />
                    </div>
                    )}
                    <div className="w-full">
                        <label htmlFor="">Amount</label><br />
                        <input placeholder="ex. 100" onChange={(e)=> setCollect(e.target.value)}  type="text" className="w-full h-10 px-2 rounded-md border-2" required />
                    </div>
                </div>

                <div className="">
                    <button type="submit" disabled={!valid} className={`w-full ${color} mt-2 hover:scale-107 transition duration-300 text-white cursor-pointer disabled:bg-gray-200 disabled:scale-100 disabled:cursor-not-allowed  h-10 rounded-2xl`}>Collect</button>
                </div>

            </form>


        </div>
    );
});
export default CollectFeesCard;