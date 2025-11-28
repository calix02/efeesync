import OsasLogo from '../assets/osas.png';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableCollege from '../osas_components/TableCollege.jsx';
import AddCollegeCard from '../osas_components/AddCollegeCard.jsx';
import UpdateCollegeCard from '../osas_components/UpdateCollegeCard.jsx';
import React, {useState,useRef, useEffect} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonSideBar from '../skeletons/SkeletonSidebar.jsx';
import SkeletonTable from '../skeletons/SkeletonTable.jsx';
import '../animate.css';


function College() {
    document.title = "College";
/* ------------------------- Animated States ----------------------------- */
    const addCollege = useAnimatedToggle();
    const updateCollege = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);

    const [selectedCollege, setSelectedCollege] = useState(null);
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchColleges = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/departments", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setColleges(response.data);
            }
        } catch (err) {
            //alert("Fetch failed");
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchColleges();
    }, []);

    return(
        <>
        {addCollege.isVisible &&(
            <>
                 <div className="fixed inset-0 bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddCollegeCard ref={addRef} reloadColleges={fetchColleges} onAnimationEnd={addCollege.handleEnd} onClose={() => addCollege.setAnimation("fade-out")} animate={addCollege.animation} />
            </>

        )
            
        }
        {updateCollege.isVisible &&(
             <>  
                 <div className="fixed inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70  pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateCollegeCard ref={updateRef} reloadColleges={fetchColleges} data={selectedCollege} onAnimationEnd={updateCollege.handleEnd} onClose={() => updateCollege.setAnimation("fade-out")} animate={updateCollege.animation} />

            </>

        )
           
        }
        {loading ? (
            <>
                <SkeletonHeader/>
                <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
                    <div className='lg:ml-68 lg:mr-4 lg:mt-30 mt-25 lg:flex lg:justify-between items-center'>
                        <div className="w-80 h-8 rounded-2xl bg-gray-200 animate-pulse"></div>
                        <div className='bg-gray-200 animate-pulse rounded-2xl w-40 h-6'></div>
                    </div>
                    <SkeletonTable/>
                </div>

                <div className='lg:block hidden' >
                    <SkeletonSideBar/>
                </div>    
            </>
        ):(
            <>
             <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
                <div className='lg:ml-68 lg:mr-4 lg:mt-30 mt-25 lg:flex lg:justify-between items-center'>
                    <h2 className="text-2xl font-semibold font-poppins text-[#145712]">Manage Colleges</h2>
                    <button onClick={addCollege.toggle} className='hover:bg-[#174515] transition duration-300 hover:scale-103 text-[#174515] cursor-pointer w-40 h-10 bg-white text-sm font-poppins font-semibold border border-[#e0e0e0] shadow-[2px_2px_2px_gray] flex justify-center items-center hover:text-white rounded-2xl'>
                        <span className="material-symbols-outlined px-1">add</span>Add Colleges
                    </button>
                </div>
             <TableCollege reloadColleges={fetchColleges} colleges={colleges} update={(row) =>{
                setSelectedCollege(row);
                updateCollege.toggle();
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
export default College;