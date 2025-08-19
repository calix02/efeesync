import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import AddEventContributionCard from '../other_components/AddEventContributionCard.jsx';
import UpdateEventCard from '../other_components/UpdateEventCard.jsx';
import TableEventContribution from '../other_components/TableEventContribution.jsx';
import React, {use, useRef} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import it from '../assets/it.png';
import EfeeViolet from '../assets/violetlogo.png'

function CITEventContribution(){
/* ------------------------- Animated States ----------------------------- */
    const addContribution = useAnimatedToggle();
    const updateContribution = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);


    
    return(
        <>
         {addContribution.isVisible &&(
             <>
                {/* Add Contribution*/}
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddEventContributionCard ref={addRef} onAnimationEnd={addContribution.handleEnd} animate={addContribution.animation} onClose={() => addContribution.setAnimation("fade-out")} />
            </>
         )
           
        }
        {updateContribution.isVisible &&(
            <>
                {/* Update Contribution */}
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateEventCard ref={updateRef} onAnimationEnd={updateContribution.handleEnd} animate={updateContribution.animation} onClose={() => updateContribution.setAnimation("fade-out")} />
            </>
        )
            
        }
            <CITHeader logoCouncil={it} titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className="mt-[110px] lg:ml-[280px] px-[20px] flex lg:flex-row flex-col justify-between">
                    <h2 className="text-[26px] font-semibold">Event Contribution</h2>
                    <input className='lg:w-[360px] w-[100%] p-2 bg-white rounded-[10px] border-2 font-semibold border-[#8A2791] block mr-[30px]' type="text" placeholder='Search Events' />
                </div>
                <div className=' w-[100%] lg:mt-[10px] '>
                    <div className='lg:ml-[300px] flex lg:justify-start justify-center gap-2.5'>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">S/Y</option>
                            <option value="">hey</option>
                        </select>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Semester</option>
                            <option value="">hey</option>

                        </select>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Month</option>
                            <option value="">hey</option>

                        </select>
                    </div>
                <TableEventContribution addEvent={addContribution.toggle} updateEvent={updateContribution.toggle}/>

                </div>
            </div>
            <div className='hidden lg:block'>
                <CITSidebar eFee={EfeeViolet}/>
            </div>
        </>
    );
}
export default CITEventContribution;