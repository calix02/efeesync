import React, { useState } from "react";
const ProofPayment = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{
    const[eventName, setEventName] = useState(data?.eventName);
    const[studentName, setStudentName] = useState(data?.studName);
    const[amount, setAmount] = useState(data?.amount);
    const[date, setDate] = useState(data?.date);



    React.useEffect(()=>{
        if(data){
            setEventName(data.eventName);
            setStudentName(data.studName);
            setAmount(data.amount);
            setDate(data.date);

        }
    })
    return( 
        <div ref={ref}   className={` ${animate} lg:w-[420px] w-[390px] h-125 px-8 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg  z-50 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className=" text-sm text-[#000] mt-8  flex flex-col">
                <span className="text-2xl font-bold text-[#621668]">{eventName}</span>
                <span className="mt-3">Student Name: {studentName}</span>
                <span>Year & Section: 3A</span>
                <span>Amount: {amount}</span>
                <span>Date: {date}</span>
                <span className="mt-3">Proof of Payment</span>
                <div className="w-[100%] overflow-y-scroll hide-scrollbar p-4 h-70 bg-[#D9D9D9] rounded-md">
                    <p>G-CASH PROOF OF PAYMENT</p>
                </div>
            </div>
            
        </div>
       
    );
});
export default ProofPayment;