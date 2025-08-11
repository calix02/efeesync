import OsasLogo from '../assets/osas.png';
import Header from '../other_components/Header_Council.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableStudentOsas from '../other_components/TableStudentOsas.jsx';
import AddStudentOsasCard from '../other_components/AddStudentOsasCard.jsx';
import UpdateStudentOsasCard from '../other_components/UpdateStudentOsasCard.jsx';
import React, {useState,useRef} from 'react';
import '../animate.css';




function Student(){
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
                <AddStudentOsasCard ref={addCollege} onAnimationEnd={handleAddStudent} onClose={handleCloseCard} animate={animate} />
            </>
        }
        {showUpdateCollege &&
            <>  
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateStudentOsasCard ref={updateCollege} onAnimationEnd={handleUpdateStudent} onClose={handleCloseCard} animate={animate} />

            </>

        }
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className='lg:ml-[290px] mt-[110px] lg:flex lg:justify-between px-[10px]'>
                    <h2 className='text-[26px] font-semibold'>Manage Students</h2>
                    <div className=' lg:flex lg:mr-8 lg:gap-2.5 lg:mt-0 mt-[10px] items-center'>
                        <input className='lg:w-[320px] w-[100%] p-2 bg-white rounded-[10px] border-2 font-semibold border-[#174515] block' type="text" placeholder='Search Student' />
                        <div className='relative lg:mt-0 mt-[10px]'>
                            <input className='bg-amber-300 lg:w-[150px] w-[100%] h-[35px] block z-[1]  cursor-pointer opacity-0' type="file" />
                            <button className='bg-[#174515] h-[35px] lg:w-[150px] w-[100%] px-[15px] flex items-center justify-center cursor-pointer rounded-[10px] text-white absolute z-[-1] top-0'>
                                <span className="material-symbols-outlined">download</span>Import CSV
                            </button>
                        </div>
                       
                    </div> 

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
                        <button className='bg-white w-[100px] border-1 border-[#174515] h-[30px] font-semibold text-[#174515] cursor-pointer rounded-[5px] text-[14px] text-center flex justify-center items-center'><span class="material-symbols-outlined">print</span>Print</button>

                    </div>

                </div>
             <TableStudentOsas update={clickedUpdateStudent} add={clickedAddStudent}/>

             </div>

          <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
        </>
    );
}
export default Student;