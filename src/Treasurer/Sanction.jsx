import React, { useRef, useState } from 'react';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import EfeeViolet from '../assets/violetlogo.png';
import TableMonetarySanction from '../treasurer_components/TableMonetarySanction.jsx';
import TableCommunityService from '../treasurer_components/TableCommunityService.jsx';
import SanctionCollect from '../other_components/SanctionCollect.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import "../animate.css";
function CITSanction() {
    const animateR = "right-In";
    const animateL = "left-In";
/* ------------------------- Animated States ----------------------------- */
    const sanctionCollect = useAnimatedToggle();
    const sanctionRef = useRef(null);

    const [selectedSanction, setSelectedSanction] = useState("Monetary Sanction");

    return (
        <>
        {sanctionCollect.isVisible &&(
             <>
            {/* Sanction Collection */}
             <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
            <SanctionCollect ref={sanctionRef} onAnimationEnd={sanctionCollect.handleEnd} animate={sanctionCollect.animation} onClose={() => sanctionCollect.setAnimation("fade-out")} />
            </>
        )
           
        }
            <CITHeader code="cit" titleCouncil="College Of Information Teachnology" abb="CIT Council" />

            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                    <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Sanctions</h2>
                    <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                    <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4   border-[#8A2791] block' type="text" placeholder='Search Student' />
                    </div>
                </div>

                <div className="w-100% mt-3">
                    <div className={`lg:ml-70 ${animateL} flex lg:justify-start md:justify-start justify-center gap-2.5`}>
                        <select
                            className="bg-white w-35  border-1 border-[#8A2791] transition duration-100 hover:scale:100 hover:bg-[#8A2791] hover:text-white cursor-pointer py-1 font-semibold text-[#8A2791] rounded-md text-xs text-center"
                            value={selectedSanction}
                            onChange={(e) => setSelectedSanction(e.target.value)}
                        >
                            <option value="Monetary Sanction">Monetary Sanction</option>
                            <option value="Community Service">Community Service</option>
                        </select>

                        <select className="bg-white lg:w-25 w-20 border-1 cursor-pointer border-[#8A2791] py-1 font-semibold text-[#8A2791] transition duration-100 hover:bg-[#8A2791] hover:scale-100 hover:text-white rounded-md text-xs text-center">
                            <option value="">Year</option>
                            <option value="">hey</option>
                        </select>

                         <select className="bg-white lg:w-25 w-20 border-1 cursor-pointer border-[#8A2791] py-1 font-semibold text-[#8A2791] transition duration-100 hover:bg-[#8A2791] hover:scale-100 hover:text-white rounded-md text-xs text-center">
                            <option value="">Section</option>
                            <option value="">hey</option>
                        </select>
                    </div>

                    {/* Conditional rendering */}
                    {selectedSanction === "Community Service" ? (
                        <TableCommunityService code="cit" />
                    ) : (
                        <TableMonetarySanction collectSanction={sanctionCollect.toggle} code="cit" />
                    )}
                </div>
            </div>

            <div className="hidden lg:block">
                <CITSidebar eFee={EfeeViolet} />
            </div>
        </>
    );
}

export default CITSanction;
