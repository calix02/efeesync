import OsasLogo from '../assets/osas.png';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import TableOrganization from '../osas_components/TableOrganization.jsx';
import AddOrganizationCard from '../osas_components/AddOrganizationCard.jsx';
import UpdateOrganizationCard from '../osas_components/UpdateOrganizationCard.jsx';
import React, {useState, useEffect, useRef} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import '../animate.css';




function Organisation(){
    document.title = "Organization";
/* ------------------------- Animated States ----------------------------- */
    const addOrg = useAnimatedToggle();
    const updateOrg = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);

    const [selectedOrg, setSelectedOrg] = useState(null);
    const [orgs, setOrgs] = useState([]);

    const fetchOrgs = async () => {
        try {
            const res = await fetch("/api/organizations", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setOrgs(response.data);
            }
        } catch (err) {
            // alert("Fetch failed");
        }
    }

    useEffect(()=> {
        fetchOrgs();
    }, []);

    return(
        <>
        {addOrg.isVisible &&(
            <>
                 <div className="fixed inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <AddOrganizationCard reloadOrgs={fetchOrgs} organizations={orgs} ref={addRef} onAnimationEnd={addOrg.handleEnd} onClose={() => addOrg.setAnimation("fade-out")} animate={addOrg.animation} />
            </>
        )
        }
        {updateOrg.isVisible &&(
             <>  
                 <div className="fixed inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateOrganizationCard reloadOrgs={fetchOrgs} organizations={orgs} ref={updateRef} data={selectedOrg} onAnimationEnd={updateOrg.handleEnd} onClose={() => updateOrg.setAnimation("fade-out")} animate={updateOrg.animation} />
            </>
        )
        }
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className='lg:ml-70 lg:mt-30 mt-25 lg:flex lg:justify-between items-center '>
                    <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Manage Organization</h2>
                    <button onClick={addOrg.toggle} className='bg-[#174515] w-40 py-1 text-sm cursor-pointer flex justify-center items-center text-white rounded-md'>
                        <span className="material-symbols-outlined px-1">add</span>Add Organization
                    </button>
                    
                </div>
              
             <TableOrganization reloadOrgs={fetchOrgs} organizations={orgs} update={(row) =>{
                setSelectedOrg(row);
                updateOrg.toggle();
             }}/>

             </div>

          <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
        </>
    );
}
export default Organisation;