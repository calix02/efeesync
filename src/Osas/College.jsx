import OsasLogo from '../assets/osas.png';
import Header from '../other_components/Header_Council.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableCollege from '../other_components/TableCollege.jsx';
import AddCollegeCard from '../other_components/AddCollegeCard.jsx';
import UpdateCollegeCard from '../other_components/UpdateCollegeCard.jsx';
import React, {useState,useRef} from 'react';
import '../animate.css';




function College(){
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
                <AddCollegeCard ref={addCollege} onAnimationEnd={handleAddStudent} onClose={handleCloseCard} animate={animate} />
            </>
        }
        {showUpdateCollege &&
            <>  
                 <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateCollegeCard ref={updateCollege} onAnimationEnd={handleUpdateStudent} onClose={handleCloseCard} animate={animate} />

            </>

        }
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className='lg:ml-[290px] mt-[110px] lg:flex lg:justify-between items-center px-5'>
                    <h2 className='text-[26px] font-semibold'>Manage Colleges</h2>
                    <button onClick={clickedAddStudent} className='bg-[#174515] w-40 py-1 text-sm flex justify-center items-center text-white rounded-md'>
                        <span className="material-symbols-outlined px-1">add</span>Add Colleges
                    </button>
                    
                </div>
             <TableCollege update={clickedUpdateStudent}/>

             </div>

          <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
        </>
    );
}
export default College;