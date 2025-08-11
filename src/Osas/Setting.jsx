import OsasLogo from '../assets/osas.png';
import Header from '../other_components/Header_Council.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import AccountSetting from '../other_components/AccountSetting.jsx';
import SystemSetting from '../other_components/SystemSetting.jsx';

function Setting(){
    return(
        <>
        
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
         <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className="mt-[110px] lg:ml-[280px]">
                    <h2 className="text-[26px] font-semibold ml-[20px]">Manage Settings</h2>
                </div>
                <div className='w-[100%] mt-3 '>
                    <div className='ml-70 px-8 '>
                        <AccountSetting/>
                        <SystemSetting/>
                    </div>
                </div>
            </div>
            
          <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
        </>
    );
}
export default Setting;