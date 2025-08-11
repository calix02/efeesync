import React, { useRef, useState } from 'react';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './CITSidebar.jsx';
import it from '../assets/it.png';
import EfeeViolet from '../assets/violetlogo.png';
import TablePaymentTransaction from '../other_components/TablePaymentTransaction.jsx';
function PaymentTransaction() {
    
    return (
        <>

            <CITHeader logoCouncil={it} titleCouncil="College Of Information Teachnology" abb="CIT Council" />

            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto">
                <div className="mt-[110px] lg:ml-[280px] px-[20px] flex lg:flex-row flex-col justify-between">
                    <h2 className="text-[26px] font-semibold">Manage Payments</h2>
                    <input
                        className="lg:w-[360px] w-[100%] p-2 bg-white rounded-[10px] border-2 font-semibold border-[#8A2791] block mr-[30px]"
                        type="text"
                        placeholder="Search..."
                    />
                </div>

                <div className="w-100% lg:mt-2">
                    <div className="lg:ml-[300px] flex lg:justify-start justify-center gap-2.5">
                    

                        <select className="bg-white w-25 border-1 border-[#8A2791] py-1 font-semibold text-[#8A2791] rounded-sm text-sm text-center">
                            <option value="">Year</option>
                            <option value="">hey</option>
                        </select>

                        <select className="bg-white w-25 border-1 border-[#8A2791] py-1 font-semibold text-[#8A2791] rounded-sm text-sm text-center">
                            <option value="">Section</option>
                            <option value="">hey</option>
                        </select>
                    </div>
                   
                    <TablePaymentTransaction  code="cit" />
                    
                </div>
            </div>

            <div className="hidden lg:block">
                <CITSidebar eFee={EfeeViolet} />
            </div>
        </>
    );
}

export default PaymentTransaction;
