import OsasLogo from '../assets/osas.png';
import Header from '../other_components/Header_Council.jsx';
import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import AccountSetting from '../treasurer_components/AccountSetting.jsx';
import SystemSetting from '../osas_components/SystemSetting.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import UploadProfile from '../other_components/UploadProfile.jsx';
import ChangePassword from '../other_components/ChangePassword.jsx';
import PersonalInformation from '../other_components/PersonalInformation.jsx';
import DefaultProfile from '../assets/default.png';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonSideBar from '../skeletons/SkeletonSidebar.jsx';
import SkeletonSetting from '../skeletons/SkeletonSetting.jsx';
import UploadLogo from '../osas_components/UploadLogo.jsx';
import UploadEfee from '../osas_components/UploadEfee.jsx';
import React, {useState, useEffect, useRef} from 'react';
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";


function Setting(){
    document.title = "Settings";
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
        section: "",
        roleId: "",
        role: "",
        email: "",
    });

    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingData, setLoadingData] = useState(true);

    const fetchUser = async () => {
        setLoadingData(true);
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
                    section: response.data.student_section,
                    roleId: response.data.role_id,
                    role: response.data.role_name,
                    email: response.data.institutional_email,
                });
            }
        } catch (err) {
            //alert("Failed to fetch user data");
        } finally {
            setLoadingData(false);
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
    const [currentUserData, setCurrentUserData] = useState(() => {
    const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });
    
    const fetchCurrentUser = async () => {
        setLoadingUser(true);
        try {
            const res = await fetch("/api/users/current", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
               setCurrentUserData(response.data);
               localStorage.setItem("currentUserData", JSON.stringify(response.data));
            }
        } catch (err) {
           // errorAlert("Fetch Failed");
        } finally {
            setLoadingUser(false);
        }
    }
      useEffect(() => {
        fetchCurrentUser();
      }, []);
    
    return(
        <>
        {profile.isVisible &&(
            <>
            <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                <UploadProfile code={currentUserData?.organization_code} ref={profileRef}  onAnimationEnd={profile.handleEnd} onClose={() => profile.setAnimation("fade-out")} animate={profile.animation}  onUpdate={handleProfileUpdate} />  
            </div>
            </>
        )}
        {logo.isVisible &&(
            <>
            <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                <UploadLogo code={currentUserData?.organization_code} data={title} ref={logoRef} onUpdateTitle={handleTitleUpdate}  onAnimationEnd={logo.handleEnd} onClose={() => logo.setAnimation("fade-out")} animate={logo.animation}  onUpdate={handleLogoUpdate} />  
            </div>
            </>
        )}
        {efee.isVisible &&(
            <>
            <div className="fixed inset-0 bg-[#00000062] flex items-center justify-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                <UploadEfee code={currentUserData?.organization_code} data={title} ref={efeeRef} onUpdateTitle={handleTitleUpdate}  onAnimationEnd={efee.handleEnd} onClose={() => efee.setAnimation("fade-out")} animate={efee.animation}  onUpdate={handleEfeeUpdate} />  
            </div>
            </>
        )}
        {changePassword.isVisible &&(
            <>
            <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                <ChangePassword ref={passwordRef} code={currentUserData?.organization_code} onAnimationEnd={changePassword.handleEnd} onClose={() => changePassword.setAnimation("fade-out")} animate={changePassword.animation} />  
            </div>
            </>
         )}
        {information.isVisible &&(
            <>
            <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                <PersonalInformation reloadUserInfo={fetchUser} ref={infoRef} code={currentUserData?.organization_code} data={accountData} onUpdate={handleInfoUpdate} onAnimationEnd={information.handleEnd} onClose={() => information.setAnimation("fade-out")} animate={information.animation} />  
            </div>
            </>
         )}

        <>
        {loadingUser ? (
            <SkeletonHeader/>
        ) : (
            <Header code={currentUserData?.organization_code}  titleCouncil ={currentUserData?.organization_name}/>
        )}
        <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="lg:mt-30 mt-25 lg:ml-68">
                <h2 className="text-2xl font-semibold font-poppins">Manage Settings</h2>
            </div>
            <div className='w-[100%] mt-3 '>
                <div className='lg:ml-70 lg:px-8 '>
                    {loadingData ? (
                        <SkeletonSetting/>
                    ) : (
                        <AccountSetting code={currentUserData?.organization_code} upload={profile.toggle} changeInfo={information.toggle} changePass={changePassword.toggle}  profile={profileImage} accName={accountData.full_name} accRole={accountData.role} accEmail={accountData.email}/>
                    )}
                </div>
            </div>
        </div>
        <div className='lg:block hidden' >
            {loadingUser ? (
                <SkeletonSideBar/>
            ) : (
                <Sidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.organization_code} />
            )}
        </div>
        </> 
    </>
       
    );
}
export default Setting;