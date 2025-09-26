import CITHeader from '../other_components/Header_Council.jsx';
import it from '../assets/it.png';
import DashboardContent from '../treasurer_components/DashboardContent.jsx';
import CITSidebar from './Sidebar.jsx';
import EfeeViolet from '../assets/violetlogo.png'
import { useEffect, useState } from 'react';
function CITCouncil(){

    const [currentUserData, setCurrentUserData] = useState(null);
    
      const fetchCurrentUser = async () => {
         try {
             const res = await fetch("/api/users/current", {
                 credentials: "include"
             });
             const response = await res.json();
             if (response.status === "success") {
                 setCurrentUserData(response.data);
             }
         } catch (err) {
             errorAlert("Fetch Failed");
         }
      }
      useEffect(() => {
        fetchCurrentUser();
      }, []);
    
    return(
        <>
            <CITHeader code={currentUserData?.department_code}  titleCouncil = {currentUserData?.organization_name} abb="CIT Council" />
            <DashboardContent currentUserData={currentUserData} className="hide-scrollbar"/>
            <div className='lg:block hidden' >
                 <CITSidebar code={currentUserData?.department_code} />
            </div>
           
        </>
      
    );
}
export default CITCouncil;