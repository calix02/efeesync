import OsasLogo from '../assets/osas.png';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableProgram from '../other_components/TableProgram.jsx';
import AddProgramCard from '../other_components/AddProgramCard.jsx';
import UpdateProgramCard from '../other_components/UpdateProgramCard.jsx';
import Header from '../other_components/Header_Council.jsx';
import React, {useRef} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import '../animate.css';




function Program(){
/* ------------------------- Animated States ----------------------------- */
    const addProgram = useAnimatedToggle();
    const updateProgram = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);
 

    return(
        <>
        {addProgram.isVisible &&(
             <>
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddProgramCard ref={addRef} onAnimationEnd={addProgram.handleEnd} onClose={() => addProgram.setAnimation("fade-out")} animate={addProgram.animation} />
            </>

        )
           
        }
        {updateProgram.isVisible &&(
            <>  
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateProgramCard ref={updateRef} onAnimationEnd={updateProgram.handleEnd} onClose={() => updateProgram.setAnimation("fade-out")} animate={updateProgram.animation} />

            </>

        )
            

        }
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className='lg:ml-73 mt-27 lg:flex lg:justify-between items-center px-5'>
                    <h2 className='text-[26px] font-semibold'>Manage Program</h2>
                    <button onClick={addProgram.toggle} className='bg-[#174515] w-40 py-1 text-sm flex justify-center items-center text-white rounded-md'>
                        <span className="material-symbols-outlined px-1">add</span>Add Program
                    </button>
                    
                </div>
                 <div className=' w-[100%] lg:mt-[10px] '>
                    <div className='lg:ml-[300px] flex lg:justify-start justify-center gap-2.5'>
                         <select className='bg-white w-40 border-1 border-[#174515] py-[2px] font-semibold text-[#174515] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Program Code</option>
                            <option value="">hey</option>

                        </select>
                        <select className='bg-white w-40 border-1 border-[#174515] py-[2px] font-semibold text-[#174515] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Organization Code</option>
                            <option value="">hey</option>

                        </select>   
                    </div>

                </div>
             <TableProgram update={updateProgram.toggle}/>

             </div>

          <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
        </>
    );
}
export default Program;