import OsasLogo from '../assets/osas.png';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableAccount from '../other_components/TableAccount.jsx';
import AddAccountCard from '../other_components/AddAccountCard.jsx';
import UpdateAccountCard from '../other_components/UpdateAccountCard.jsx';
import React, {useRef} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import '../animate.css';

function Account(){
/* ------------------------- Animated States ----------------------------- */
    const addTreasurer = useAnimatedToggle();
    const updateTreasurer = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);
    
    return(
        <>
        {addTreasurer.isVisible &&(
             <>
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddAccountCard ref={addRef} onAnimationEnd={addTreasurer.handleEnd} onClose={() => addTreasurer.setAnimation("fade-out")} animate={addTreasurer.animation} />
            </>
        )
           
        }
        {updateTreasurer.isVisible &&(
            <>  
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateAccountCard ref={updateRef} onAnimationEnd={updateTreasurer.handleEnd} onClose={() => updateTreasurer.setAnimation("fade-out")} animate={updateTreasurer.animation} />
            </>
        )
            
        }
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className='lg:ml-73 mt-27 lg:flex lg:justify-between items-center px-5'>
                    <h2 className='text-[26px] font-semibold'>Manage Account</h2>
                    <button onClick={addTreasurer.toggle} className='bg-[#174515] w-40 py-1 text-sm flex justify-center items-center text-white rounded-md'>
                        <span className="material-symbols-outlined px-1">add</span>Add Account
                    </button>
                    
                </div>
             <TableAccount update={updateTreasurer.toggle}/>

             </div>

          <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
        </>
    );
}
export default Account;