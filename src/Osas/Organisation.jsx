import OsasLogo from '../assets/osas.png';
import Header from '../other_components/Header_Council.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableOrganization from '../other_components/TableOrganization.jsx';
import AddOrganizationCard from '../other_components/AddOrganizationCard.jsx';
import UpdateOrganizationCard from '../other_components/UpdateOrganizationCard.jsx';
import React, {useRef} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import '../animate.css';




function Organisation(){
/* ------------------------- Animated States ----------------------------- */
    const addOrg = useAnimatedToggle();
    const updateOrg = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);




   
    return(
        <>
        {addOrg.isVisible &&(
            <>
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddOrganizationCard ref={addRef} onAnimationEnd={addOrg.handleEnd} onClose={() => addOrg.setAnimation("fade-out")} animate={addOrg.animation} />
            </>
        )
        }
        {updateOrg.isVisible &&(
             <>  
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateOrganizationCard ref={updateRef} onAnimationEnd={updateOrg.handleEnd} onClose={() => updateOrg.setAnimation("fade-out")} animate={updateOrg.animation} />
            </>
        )
        }
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className='lg:ml-73 mt-27 lg:flex lg:justify-between items-center px-5'>
                    <h2 className='text-[26px] font-semibold'>Manage Organization</h2>
                    <button onClick={addOrg.toggle} className='bg-[#174515] w-40 py-1 text-sm flex justify-center items-center text-white rounded-md'>
                        <span className="material-symbols-outlined px-1">add</span>Add Organization
                    </button>
                    
                </div>
              
             <TableOrganization update={updateOrg.toggle}/>

             </div>

          <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
        </>
    );
}
export default Organisation;