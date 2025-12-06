import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import AccountSetting from '../student_components/AccountSetting.jsx';
import QrCodeSetting from '../student_components/QrCodeSetting.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import UploadProfile from '../other_components/UploadProfile.jsx';
import ChangePassword from '../other_components/ChangePassword.jsx';
import QrCode from "../student_components/QRCode.jsx";
import PersonalInformation from '../other_components/PersonalInformation.jsx';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonSetting from '../skeletons/SkeletonSetting.jsx';
import DefaultProfile from '../assets/default.png';
import React, {useState, useEffect, useRef} from 'react';
import { errorAlert} from '../utils/alert.js';
import SkeletonSideBar from '../skeletons/SkeletonSidebar.jsx';


function Setting(){
    document.title = "Settings";
    const profile = useAnimatedToggle();
    const changePassword = useAnimatedToggle();
    const information = useAnimatedToggle();
    const qr = useAnimatedToggle();
    
    const profileRef = useRef(null);
    const passwordRef = useRef(null);
    const infoRef = useRef(null);
    const qrRef = useRef(null);
    
    const [profileImage, setProfileImage] = useState(DefaultProfile);
    const [userLoading, setUserLoading] = useState(true);
    const [settingLoading, setSettingLoading] = useState(true);
    
    

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
    

    const fetchUser = async () => {
        setSettingLoading(true);
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
            alert("Failed to fetch user data");
        }finally{
            setSettingLoading(false);
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
        setUserLoading(true);
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
        }finally{
            setUserLoading(false);
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
                    {/* Overlay */}
                    <UploadProfile code={currentUserData?.organization_code} ref={profileRef}  onAnimationEnd={profile.handleEnd} onClose={() => profile.setAnimation("fade-out")} animate={profile.animation}  onUpdate={handleProfileUpdate} />  
                </div>
            </>
        )

        }
       
        {changePassword.isVisible &&(
            <>
                <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <ChangePassword ref={passwordRef} code={currentUserData?.organization_code} onAnimationEnd={changePassword.handleEnd} onClose={() => changePassword.setAnimation("fade-out")} animate={changePassword.animation} />  
                </div>
            </>
         )
            
        }
        {information.isVisible &&(
            <>
                <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <PersonalInformation ref={infoRef} reloadUserInfo={fetchUser} code={currentUserData?.organization_code} data={accountData} onUpdate={handleInfoUpdate} onAnimationEnd={information.handleEnd} onClose={() => information.setAnimation("fade-out")} animate={information.animation} />  
                </div>
            </>

         )
            
        }
        {qr.isVisible &&(
             <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
                {/* Overlay */}
                <QrCode ref={qrRef} code={currentUserData?.organization_code}  onAnimationEnd={qr.handleEnd} onClose={() => qr.setAnimation("fade-out")} animate={qr.animation} />  
            </div>

        )
        }
        {userLoading ? ( 
            <SkeletonHeader/>
        ) : (
            <Header code={currentUserData?.organization_code} title = {currentUserData?.department_name}/>
        )}
         <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
                <div className=" mt-[110px]  lg:ml-70">
                    <h2 className="text-2xl font-semibold font-poppins">Manage Settings</h2>
                </div>
                <div className='w-[100%] mt-3 '>
                    <div className='lg:ml-70 lg:px-8 flex flex-col gap-4'>
                        {settingLoading ? ( 
                            <SkeletonSetting/>
                        ) : (
                        <AccountSetting 
                            code={currentUserData?.organization_code} 
                            upload={profile.toggle} 
                            changeInfo={information.toggle} 
                            changePass={changePassword.toggle}  
                            profile={profileImage} 
                            accName={accountData.full_name} 
                            accEmail={accountData.email}
                        />
                        )}
                        {/** 
                        <QrCodeSetting code={currentUserData?.department_code} show={qr.toggle}/>
                        */}
                    </div>
                </div>
            </div>
            
          <div className='lg:block hidden' >
            {userLoading ? (
                <SkeletonSideBar/>
            ) : (
                <Sidebar code={currentUserData?.organization_code}/>
            )}
            </div>
        </>
    );
}
export default Setting;