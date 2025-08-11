import React, { useRef, useState } from 'react';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './CITSidebar.jsx';
import it from '../assets/it.png';
import EfeeViolet from '../assets/violetlogo.png';
import TableMonetarySanction from '../other_components/TableMonetarySanction.jsx';
import TableCommunityService from '../other_components/TableCommunityService.jsx';
import SanctionCollect from '../other_components/SanctionCollect.jsx';
function CITSanction() {
    const [selectedSanction, setSelectedSanction] = useState("Monetary Sanction");

    const [showCollectSanction, setShowCollectSanction] = useState(false);
    const[animation,setAnimation] = useState('');
    const collectRef = useRef(null);

    const clickedCollect = () =>{
        if(!showCollectSanction){
            setShowCollectSanction(true);
            setAnimation("fade-in");
        }else{
            setAnimation("fade-out");
        }
    }
    const handleCloseCollection = () =>{
        if(animation === "fade-out"){
            setShowCollectSanction(false);
        }
    }
     const handleCloseCard = () => {
        setAnimation('fade-out');
    };

    return (
        <>
        {showCollectSanction &&
            <>

             <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
            <SanctionCollect ref={collectRef} onAnimationEnd={handleCloseCollection} animate={animation} onClose={handleCloseCard} />
            </>

        }
            <CITHeader logoCouncil={it} titleCouncil="College Of Information Teachnology" abb="CIT Council" />

            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto">
                <div className="mt-[110px] lg:ml-[280px] px-[20px] flex lg:flex-row flex-col justify-between">
                    <h2 className="text-[26px] font-semibold">Manage Sanctions</h2>
                    <input
                        className="lg:w-[360px] w-[100%] p-2 bg-white rounded-[10px] border-2 font-semibold border-[#8A2791] block mr-[30px]"
                        type="text"
                        placeholder="Search..."
                    />
                </div>

                <div className="w-100% lg:mt-2">
                    <div className="lg:ml-[300px] flex lg:justify-start justify-center gap-2.5">
                        <select
                            className="bg-white w-40 border-1 border-[#8A2791] py-1 font-semibold text-[#8A2791] rounded-sm text-sm text-center"
                            value={selectedSanction}
                            onChange={(e) => setSelectedSanction(e.target.value)}
                        >
                            <option value="Monetary Sanction">Monetary Sanction</option>
                            <option value="Community Service">Community Service</option>
                        </select>

                        <select className="bg-white w-25 border-1 border-[#8A2791] py-1 font-semibold text-[#8A2791] rounded-sm text-sm text-center">
                            <option value="">Year</option>
                            <option value="">hey</option>
                        </select>

                        <select className="bg-white w-25 border-1 border-[#8A2791] py-1 font-semibold text-[#8A2791] rounded-sm text-sm text-center">
                            <option value="">Section</option>
                            <option value="">hey</option>
                        </select>
                    </div>

                    {/* Conditional rendering */}
                    {selectedSanction === "Community Service" ? (
                        <TableCommunityService code="cit" />
                    ) : (
                        <TableMonetarySanction collectSanction={clickedCollect} code="cit" />
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
