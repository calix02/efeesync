import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import AddEventContributionCard from '../other_components/AddEventContributionCard.jsx';
import UpdateEventCard from '../other_components/UpdateEventCard.jsx';
import TableEventContribution from '../other_components/TableEventContribution.jsx';
import React, {use, useRef} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import it from '../assets/it.png';
import "../animate.css";
import EfeeViolet from '../assets/violetlogo.png'

function CITEventContribution(){
/* --------------------------------- animation -------------------------------- */
const animateR = "right-In";
const animateL = "left-In";

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
                <div className="fixed inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddEventContributionCard ref={addRef} onAnimationEnd={addContribution.handleEnd} animate={addContribution.animation} onClose={() => addContribution.setAnimation("fade-out")} />
            </>
         )
           
        }
        {updateContribution.isVisible &&(
            <>
                {/* Update Contribution */}
                <div className="fixed inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateEventCard ref={updateRef} onAnimationEnd={updateContribution.handleEnd} animate={updateContribution.animation} onClose={() => updateContribution.setAnimation("fade-out")} />
            </>
        )
            
        }
            <CITHeader logoCouncil={it} titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  justify-between">
                    <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Event Contribution</h2>
                    <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                    <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4   border-[#8A2791] block' type="text" placeholder='Search Student' />
                    </div>
                </div>
               <div className=' w-[100%] mt-3 '>
                    <div className={`lg:ml-70 ${animateL} flex lg:justify-start md:justify-start font-[family-name:Arial]  justify-center gap-2.5`}>
                         <select className='bg-white lg:w-25 w-20 text-xs cursor-pointer transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white  border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">S/Y</option>
                            <option value="">hey</option>

                        </select>
                         <select className='bg-white lg:w-25 w-20 text-xs cursor-pointer transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white  border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Semester</option>
                            <option value="">hey</option>

                        </select>
                          <select className='bg-white lg:w-25 w-20 text-xs cursor-pointer transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white  border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Month</option>
                            <option value="">hey</option>

                        </select>
                        
                    </div>

                </div>
                <TableEventContribution addEvent={addContribution.toggle} updateEvent={updateContribution.toggle}/>

            </div>
            <div className='hidden lg:block'>
                <CITSidebar eFee={EfeeViolet}/>
            </div>
        </>
    );
}
export default CITEventContribution;