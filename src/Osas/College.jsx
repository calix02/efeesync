import OsasLogo from '../assets/osas.png';
import Header from '../other_components/Header_Council.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableCollege from '../other_components/TableCollege.jsx';
import AddCollegeCard from '../other_components/AddCollegeCard.jsx';
import UpdateCollegeCard from '../other_components/UpdateCollegeCard.jsx';
import React, {useRef} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import '../animate.css';




function College(){
/* ------------------------- Animated States ----------------------------- */
    const addCollege = useAnimatedToggle();
    const updateCollege = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);


    return(
        <>
        {addCollege.isVisible &&(
            <>
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddCollegeCard ref={addRef} onAnimationEnd={addCollege.handleEnd} onClose={() => addCollege.setAnimation("fade-out")} animate={addCollege.animation} />
            </>

        )
            
        }
        {updateCollege.isVisible &&(
             <>  
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateCollegeCard ref={updateRef} onAnimationEnd={updateCollege.handleEnd} onClose={() => updateCollege.setAnimation("fade-out")} animate={updateCollege.animation} />

            </>

        )
           

        }
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className='lg:ml-[290px] mt-[110px] lg:flex lg:justify-between items-center px-5'>
                    <h2 className='text-[26px] font-semibold'>Manage Colleges</h2>
                    <button onClick={addCollege.toggle} className='bg-[#174515] w-40 py-1 text-sm flex justify-center items-center text-white rounded-md'>
                        <span className="material-symbols-outlined px-1">add</span>Add Colleges
                    </button>
                    
                </div>
             <TableCollege update={updateCollege.toggle}/>

             </div>

          <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
        </>
    );
}
export default College;