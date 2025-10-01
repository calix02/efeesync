import OsasLogo from '../assets/osas.png';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableAccount from '../osas_components/TableAccount.jsx';
import AddAccountCard from '../osas_components/AddAccountCard.jsx';
import UpdateAccountCard from '../osas_components/UpdateAccountCard.jsx';
import React, {useState, useRef, useEffect} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import '../animate.css';

function Account(){
/* ------------------------- Animated States ----------------------------- */
    const addTreasurer = useAnimatedToggle();
    const updateTreasurer = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);

    const [selectedAccount, setSelectedAccount] = useState(null);

    const [treasurers, setTreasurers] = useState([]);
    
    const fetchTreasurers = async () => {
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
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
                 <div className='lg:ml-70 lg:mt-30 mt-25 lg:flex lg:justify-between items-center'>
                    <h2 className="text-2xl font-semibold text-[#145712] font-poppins">Manage Treasurers</h2>
                    <button onClick={addTreasurer.toggle} className='bg-[#174515] cursor-pointer w-40 py-1 text-sm flex justify-center items-center text-white rounded-md'>
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
    );
}
export default Account;