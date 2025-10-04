import React from "react";

const ProofPayment = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{


    return( 
        <div ref={ref}   className={` ${animate} lg:w-[420px] w-[390px] h-125 px-8 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg  z-50 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className=" text-sm text-[#000] mt-8  flex flex-col">
                <span className="text-2xl font-bold text-[#621668]">Tech Night 2025</span>
                <span className="mt-3">Student Name: Jerick Gamboa</span>
                <span>Year & Section: 3A</span>
                <span>Amount: 150</span>
                <span>Date: May 22, 2025</span>
                <span className="mt-3">Proof of Payment</span>
                <div className="w-[100%] overflow-y-scroll hide-scrollbar p-4 h-70 bg-[#D9D9D9] rounded-md">
                    <p>G-CASH PROOF OF PAYMENT</p>
                </div>
            </div>
            
        </div>
       
    );
});
export default ProofPayment;