import React, { useRef, useState } from 'react';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import EfeeViolet from '../assets/violetlogo.png';
import TableExcuse from '../treasurer_components/TableExcuse.jsx';
import "../animate.css";
function CITExcuse() {
    const animateR = "right-In";
    const animateL = "left-In";

    
    return (
        <>

            <CITHeader code="cit" titleCouncil="College Of Information Teachnology" abb="CIT Council" />

            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                    <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Manage Excuse Approval</h2>
                    <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                    <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4   border-[#8A2791] block' type="text" placeholder='Search Student' />
                    </div>
                </div>

               <div className=' w-[100%] mt-3 '>
                    <div className={`lg:ml-70 ${animateL} flex lg:justify-start md:justify-start font-[family-name:Arial]  justify-center gap-2.5`}>
                         <select className='bg-white lg:w-25  w-20 text-xs transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white cursor-pointer border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Year</option>
                            <option value="">hey</option>

                        </select>
                         <select className='bg-white lg:w-25 w-20 text-xs transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white cursor-pointer border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Section</option>
                            <option value="">hey</option>

                        </select>
                    </div>
                   
                    <TableExcuse  code="cit" />
                    
                </div>
            </div>

            <div className="hidden lg:block">
                <CITSidebar eFee={EfeeViolet} />
            </div>
        </>
    );
}

export default CITExcuse;
