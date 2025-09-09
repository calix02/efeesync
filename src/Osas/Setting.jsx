import OsasLogo from '../assets/osas.png';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import AccountSetting from '../osas_components/AccountSetting.jsx';
import SystemSetting from '../osas_components/SystemSetting.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import UploadProfile from '../other_components/UploadProfile.jsx';
import ChangePassword from '../other_components/ChangePassword.jsx';
import PersonalInformation from '../osas_components/PersonalInformation.jsx';
import DefaultProfile from '../assets/default.png';
import UploadLogo from '../osas_components/UploadLogo.jsx';
import UploadEfee from '../osas_components/UploadEfee.jsx';
import React, {useState, useEffect, useRef} from 'react';

function Setting(){
    document.title = "Setting";
    const profile = useAnimatedToggle();
    const changePassword = useAnimatedToggle();
    const information = useAnimatedToggle();
    const logo = useAnimatedToggle();
    const efee = useAnimatedToggle();
    
    const profileRef = useRef(null);
    const passwordRef = useRef(null);
    const infoRef = useRef(null);
    const logoRef = useRef(null);
    const efeeRef = useRef(null);
    
    const [profileImage, setProfileImage] = useState(DefaultProfile);
    const [logoOsas, setLogoOsas] = useState(OsasLogo);
    const [efeeLogo, setEfeeLogo] = useState(EfeeOsas);
    
    const [title, setTitle] = useState({
        organizationName: "Office of Student Affairs and Services",
        systemName : "eFeeSync",
    });

    const [accountData, setAccountData] = useState({
        full_name: "",
        firstName: "",
        middleName: "",
        lastName: "",
        roleId: "",
        role: "",
        email: "",
    });

    const fetchUser = async () => {
        try {
            const res = await fetch("/api/users/current", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setAccountData({
                    full_name: response.data.full_name,
                    firstName: response.data.first_name,
                    middleName: response.data.middle_initial,
                    lastName: response.data.last_name,
                    roleId: response.data.role_id,
                    role: response.data.role_name,
                    email: response.data.institutional_email,
                });
            }
        } catch (err) {
            alert("Failed to fetch user data");
        }
    }

    useEffect(()=> {
        fetchUser();
    }, []);

   const handleInfoUpdate = (newData) => {
        setAccountData(newData);      // update state in parent
        information.setAnimation("fade-out");
    };

    const handleTitleUpdate = (newData) => {
        setTitle((prev) => ({ ...prev, ...newData }));
        logo.setAnimation("fade-out");
    };

    const handleProfileUpdate = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setProfileImage(reader.result); 
        };
        reader.readAsDataURL(file);
        profile.setAnimation("fade-out"); 
    };

    const handleLogoUpdate = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setLogoOsas(reader.result); 
            
        };
        reader.readAsDataURL(file);
        logo.setAnimation("fade-out"); 
    };

    const handleEfeeUpdate = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setEfeeLogo(reader.result); 
            
        };
        reader.readAsDataURL(file);
        logo.setAnimation("fade-out"); 
    };
    
    

    return(
        <>
        {profile.isVisible &&(
            <>
                <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <UploadProfile code="osas" ref={profileRef}  onAnimationEnd={profile.handleEnd} onClose={() => profile.setAnimation("fade-out")} animate={profile.animation}  onUpdate={handleProfileUpdate} />  

                </div>
            </>
        )

        }
        {logo.isVisible &&(
            <>
                <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <UploadLogo code="osas" data={title} ref={logoRef} onUpdateTitle={handleTitleUpdate}  onAnimationEnd={logo.handleEnd} onClose={() => logo.setAnimation("fade-out")} animate={logo.animation}  onUpdate={handleLogoUpdate} />  
                </div>
            </>
        )

        }
        {efee.isVisible &&(
            <>
                <div className="fixed inset-0 bg-[#00000062] flex items-center justify-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <UploadEfee code="osas" data={title} ref={efeeRef} onUpdateTitle={handleTitleUpdate}  onAnimationEnd={efee.handleEnd} onClose={() => efee.setAnimation("fade-out")} animate={efee.animation}  onUpdate={handleEfeeUpdate} />  
                </div>
            </>
        )

        }
        {changePassword.isVisible &&(
            <>
                <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <ChangePassword ref={passwordRef} code="osas" onAnimationEnd={changePassword.handleEnd} onClose={() => changePassword.setAnimation("fade-out")} animate={changePassword.animation} />  
                </div>
            </>
         )
            
        }
        {information.isVisible &&(
            <>
                <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <PersonalInformation ref={infoRef} code="osas" data={accountData} onUpdate={handleInfoUpdate} onAnimationEnd={information.handleEnd} onClose={() => information.setAnimation("fade-out")} animate={information.animation} />  
                </div>
            </>

         )
            
        }
        
       
        
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
         <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
                <div className="lg:mt-30 mt-25 lg:ml-68">
                    <h2 className="text-2xl font-semibold font-poppins">Manage Settings</h2>
                </div>
                <div className='w-[100%] mt-3 '>
                    <div className='lg:ml-70 lg:px-8 '>
                        <AccountSetting upload={profile.toggle} changeInfo={information.toggle} changePass={changePassword.toggle}  profile={profileImage} accName={accountData.full_name} accRole={accountData.role} accEmail={accountData.email}/>
                        <SystemSetting upload={logo.toggle} updateEfeeLogo={efee.toggle} logo={logoOsas} efeeLogo={efeeLogo} title={title.organizationName} systemName={title.systemName}/>
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