import OsasLogo from '../assets/osas.png';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableAccount from '../osas_components/TableAccount.jsx';
import AddAccountCard from '../osas_components/AddAccountCard.jsx';
import UpdateAccountCard from '../osas_components/UpdateAccountCard.jsx';
import React, {useState, useRef, useEffect} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonSideBar from '../skeletons/SkeletonSidebar.jsx';
import SkeletonTable from '../skeletons/SkeletonTable.jsx';
import '../animate.css';

function Account(){
/* ------------------------- Animated States ----------------------------- */
    const addTreasurer = useAnimatedToggle();
    const updateTreasurer = useAnimatedToggle();
    document.title = "Treasurer";


    const addRef = useRef(null);
    const updateRef = useRef(null);

    const [selectedAccount, setSelectedAccount] = useState(null);

    const [treasurers, setTreasurers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    const fetchTreasurers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/organization/officers?designation=treasurer", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setTreasurers(response.data);
            }
        } catch (err) {
            //alert("Fetch failed");
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchTreasurers();
    }, []);
    return(
        <>
        {addTreasurer.isVisible &&(
             <>
                 <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <AddAccountCard ref={addRef} reloadTreasurers={fetchTreasurers} onAnimationEnd={addTreasurer.handleEnd} onClose={() => addTreasurer.setAnimation("fade-out")} animate={addTreasurer.animation} />
                </div>
            </>
        )
           
        }
        {updateTreasurer.isVisible &&(
            <>  
                 <div className="fixed inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateAccountCard data={selectedAccount} reloadTreasurers={fetchTreasurers} ref={updateRef} onAnimationEnd={updateTreasurer.handleEnd} onClose={() => updateTreasurer.setAnimation("fade-out")} animate={updateTreasurer.animation} />
            </>
        )
            
        }
        {loading ? (
            <>
            <SkeletonHeader/>
            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
                 <div className='lg:ml-70 lg:mt-30 mt-25 lg:flex lg:justify-between items-center'>
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
            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
                 <div className='lg:ml-70 lg:mt-30 mt-25 lg:flex lg:justify-between items-center'>
                    <h2 className="text-2xl font-semibold text-[#145712] font-poppins">Manage Treasurers</h2>
                    <button onClick={addTreasurer.toggle} className='hover:bg-[#174515] bg-white cursor-pointer w-40 h-10 text-sm flex justify-center items-center hover:text-white text-[#174515] font-semibold border border-[#e0e0e0] shadow-[2px_2px_2px_gray] hover:scale-103 transition duration-300 rounded-2xl'>
                        <span className="material-symbols-outlined px-1">add</span>Add Treasurer
                    </button>
                </div>
             <TableAccount accounts={treasurers} reloadTreasurers={fetchTreasurers} update={(row) =>{
                setSelectedAccount(row);
                updateTreasurer.toggle();
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
export default Account;