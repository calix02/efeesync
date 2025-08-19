import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableStudent from '../other_components/TableStudent.jsx';
import AddStudentCard from '../other_components/AddStudentCard.jsx';
import UpdateStudentCard from '../other_components/UpdateStudentCard.jsx';
import EfeeViolet from '../assets/violetlogo.png'
import React, {useRef} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import it from '../assets/it.png';
import '../animate.css';

function CITStudent(){

     const studData = Array.from({ length: 13 }, (_, i) => ({
        id: `22-${1000 + i}`,
        name: `Mark Alvarado ${i + 1}`,
        yearSection: "3A",
    }));

/* ------------------------- Animated States ----------------------------- */
    const addStudent = useAnimatedToggle();
    const updateStudent = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);

    return(
        <>
        {addStudent.isVisible &&(
            <>
                {/* Add Student*/}
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddStudentCard ref={addRef} onAnimationEnd={addStudent.handleEnd} animate={addStudent.animation} onClose={() => addStudent.setAnimation("fade-out")} />
            </>

        )
            
        }
         {updateStudent.isVisible &&(
            <>
                {/* Update Student */}
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateStudentCard ref={updateRef} onAnimationEnd={updateStudent.handleEnd} animate={updateStudent.animation} onClose={() => updateStudent.setAnimation("fade-out")} />
            </>

         )
            
        }
         

            <CITHeader logoCouncil={it} titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className='lg:ml-70 lg:mt-30 lg:flex lg:justify-between '>
                    <h2 className="text-2xl font-medium font-[family-name:Futura Bold] ml-6">Manage Students</h2>
                    <div className=' lg:flex lg:mr-8 lg:gap-2.5 lg:mt-0 mt-[10px] items-center'>
                        <input className='lg:w-[320px] w-[100%] p-2 bg-white rounded-[10px] border-2 font-semibold border-[#8A2791] block' type="text" placeholder='Search Student' />
                        <div className='relative lg:mt-0 mt-[10px]'>
                            <input className='bg-amber-300 lg:w-[150px] w-[100%] h-[35px] block z-[1]  cursor-pointer opacity-0' type="file" />
                            <button className='bg-[#8A2791] h-[35px] lg:w-[150px] w-[100%] px-[15px] flex items-center justify-center cursor-pointer rounded-[10px] text-white absolute z-[-1] top-0'>
                                <span className="material-symbols-outlined">download</span>Import CSV
                            </button>
                        </div>  
                    </div> 

                </div>
                <div className=' w-[100%] lg:mt-[10px] '>
                    <div className='lg:ml-[300px] flex lg:justify-start justify-center gap-2.5'>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Sort by</option>
                            <option value="">hey</option>

                        </select>
                        <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Year</option>
                            <option value="">hey</option>

                        </select>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Section</option>
                            <option value="">hey</option>

                        </select>
                         <select className='bg-white w-[100px] border-1 border-[#8A2791] py-[2px] font-semibold text-[#8A2791] rounded-[5px] text-[14px] text-center'  name="" id="">
                            <option value="">Status</option>
                            <option value="">hey</option>

                        </select>
                         
                        
                    </div>

                </div>
                <TableStudent students={studData} show={addStudent.toggle} update={updateStudent.toggle} />      

                             
               
            </div>
            <div className='hidden lg:block'>
                <CITSidebar eFee={EfeeViolet}/>
            </div>
        </>
    );
}
export default CITStudent;