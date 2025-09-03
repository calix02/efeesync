import OsasLogo from '../assets/osas.png';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableCollege from '../osas_components/TableCollege.jsx';
import AddCollegeCard from '../osas_components/AddCollegeCard.jsx';
import UpdateCollegeCard from '../osas_components/UpdateCollegeCard.jsx';
import React, {useState,useRef, useEffect} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
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

    const fetchColleges = async () => {
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
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
                <div className='lg:ml-70 lg:mt-30 mt-25 lg:flex lg:justify-between items-center'>
                    <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Manage Colleges</h2>
                    <button onClick={addCollege.toggle} className='bg-[#174515] cursor-pointer w-40 py-1 text-sm flex justify-center items-center text-white rounded-md'>
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
    );
}
export default College;