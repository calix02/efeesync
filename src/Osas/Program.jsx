import OsasLogo from '../assets/osas.png';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableProgram from '../other_components/TableProgram.jsx';
import AddProgramCard from '../other_components/AddProgramCard.jsx';
import UpdateProgramCard from '../other_components/UpdateProgramCard.jsx';
import Header from '../other_components/Header_Council.jsx';
import React, {useState,useRef} from 'react';
import '../animate.css';




function Program(){
    const [showAddCollege, setShowAddCollege] = useState(false);
    const [showUpdateCollege, setShowUpdateCollege] = useState(false);

    const [animate, setAnimate] = useState('');
    const updateCollege  = useRef(null);
    const addCollege = useRef(null);

    const clickedAddStudent = () =>{
        if(!showAddCollege){
            setShowAddCollege(true);
            setAnimate('fade-in');
        }else{
            setAnimate('fade-out');
        }
    }
    const clickedUpdateStudent = () =>{
        if(!showUpdateCollege){
            setShowUpdateCollege(true);
            setAnimate('fade-in');
        }else{
            setAnimate('fade-out');
        }
    }
    const handleAddStudent = () =>{
        if(animate === "fade-out"){
            setShowAddCollege(false);
        }
    }

     const handleUpdateStudent = () =>{
        if(animate === "fade-out"){
            setShowUpdateCollege(false);
        }
    }
    const handleCloseCard = () => {
    setAnimate('fade-out');
    };

    return(
        <>
        {showAddCollege &&
            <>
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddProgramCard ref={addCollege} onAnimationEnd={handleAddStudent} onClose={handleCloseCard} animate={animate} />
            </>
        }
        {showUpdateCollege &&
            <>  
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateProgramCard ref={updateCollege} onAnimationEnd={handleUpdateStudent} onClose={handleCloseCard} animate={animate} />

            </>

        }
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className='lg:ml-73 mt-27 lg:flex lg:justify-between items-center px-5'>
                    <h2 className='text-[26px] font-semibold'>Manage Program</h2>
                    <button onClick={clickedAddStudent} className='bg-[#174515] w-40 py-1 text-sm flex justify-center items-center text-white rounded-md'>
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
             <TableProgram update={clickedUpdateStudent}/>

             </div>

          <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
        </>
    );
}
export default Program;