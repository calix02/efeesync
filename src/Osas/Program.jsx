import OsasLogo from '../assets/osas.png';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableProgram from '../osas_components/TableProgram.jsx';
import AddProgramCard from '../osas_components/AddProgramCard.jsx';
import UpdateProgramCard from '../osas_components/UpdateProgramCard.jsx';
import Header from './Header.jsx';
import React, {useState, useEffect, useRef} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonSideBar from '../skeletons/SkeletonSidebar.jsx';
import SkeletonTable from '../skeletons/SkeletonTable.jsx';
import '../animate.css';

function Program(){
    document.title = "Program";
    const animateL = "left-In";
/* ------------------------- Animated States ----------------------------- */
    const addProgram = useAnimatedToggle();
    const updateProgram = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);

    const [selectedProgram, setSelectedProgram] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPrograms = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/programs", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setPrograms(response.data);
            }
        } catch (err) {
            //alert("Fetch failed");
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchPrograms();
    }, []);

    return(
        <>
        {addProgram.isVisible &&(
             <>
                 <div className="fixed inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddProgramCard reloadPrograms={fetchPrograms} ref={addRef} onAnimationEnd={addProgram.handleEnd} onClose={() => addProgram.setAnimation("fade-out")} animate={addProgram.animation} />
            </>

        )
           
        }
        {updateProgram.isVisible &&(
            <>  
                 <div className="fixed inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateProgramCard reloadPrograms={fetchPrograms} ref={updateRef} data={selectedProgram} onAnimationEnd={updateProgram.handleEnd} onClose={() => updateProgram.setAnimation("fade-out")} animate={updateProgram.animation} />

            </>

        )
        }
        {loading ? (
         <>   
         <SkeletonHeader/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className='lg:ml-68 text-[#145712] lg:mt-30 mt-25 lg:flex lg:justify-between items-center'>
                   <div className="w-80 h-8 rounded-2xl bg-gray-200 animate-pulse"></div>
                    <div className='bg-gray-200 animate-pulse rounded-2xl w-40 h-6'></div>
                </div>
                <SkeletonTable/>
             </div>
          <div className='lg:block hidden' >
                <SkeletonSideBar/>
            </div>
            </>
            ) : (
                 <>   
            <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
                <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                    <div className='lg:ml-68 text-[#145712] lg:mt-30 mt-25 lg:flex lg:justify-between items-center'>
                        <h2 className="text-2xl font-semibold font-poppins">Manage Program</h2>
                        <button onClick={addProgram.toggle} className='bg-[#174515] lg:mr-4 font-poppins cursor-pointer w-40 py-1 text-sm flex justify-center items-center text-white rounded-md'>
                            <span className="material-symbols-outlined px-1">add</span>Add Program
                        </button>  
                    </div>
                <TableProgram programs={programs} reloadPrograms={fetchPrograms} update={(row) => {
                    setSelectedProgram(row);
                    updateProgram.toggle();
                    }}/>
                </div>
            <div className='lg:block hidden' >
                <Sidebar eFee={EfeeOsas}/>
            </div>
            </>
            )}
        </>
    );
}
export default Program;