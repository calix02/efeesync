import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import AccountSetting from '../other_components/AccountSetting.jsx';
import SystemSetting from '../other_components/SystemSetting.jsx';
import {useEffect, useState} from 'react';
import EfeeViolet from '../assets/violetlogo.png'
function CITSettings(){

    const [currentUserData, setCurrentUserData] = useState([]);
        
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
            console.log(currentUserData);
          }, []);

    return(
        <>
            <CITHeader code={currentUserData?.department_code} titleCouncil ={currentUserData?.organization_name} abb="CIT Council" />
            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className="mt-[110px] lg:ml-[280px]">
                    <h2 className="text-[26px] font-semibold ml-[20px]">Manage Settings</h2>
                </div>
                <div className='w-[100%] mt-3 '>
                    <div className='lg:ml-70 px-8 '>
                        <AccountSetting/>
                        <SystemSetting/>
                    </div>
                </div>
            </div>
            
            <div className='hidden lg:block'>
                <CITSidebar eFee={EfeeViolet}/>
            </div>
        </>
    );
}
export default CITSettings;