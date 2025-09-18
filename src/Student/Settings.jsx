import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import SettingCard from "../student_components/SettingCard.jsx";
import UploadProfile from "../other_components/UploadProfile.jsx";
import UpdateInfo from "../student_components/UpdateInfo.jsx";
import ChangePassword from "../other_components/ChangePassword.jsx";
import QRCode from "../student_components/QRCode.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import React, {useRef, useState, useEffect} from 'react';
import useAnimatedToggle from "../hooks/useAnimatedToggle.js";
import it from '../assets/it.png';


function Settings(){
/* ------------------------- Animated States ----------------------------- */
    const profile = useAnimatedToggle();
    const updateInfo = useAnimatedToggle();
    const changePassword = useAnimatedToggle();
    const qrCode = useAnimatedToggle();

    const profileRef = useRef(null);
    const updateRef = useRef(null);
    const changeRef = useRef(null);
    const qrRef = useRef(null);

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
        {profile.isVisible &&(
            <>
                <div className="fixed lg:z-40 md:z-50 z-70 flex justify-center items-center inset-0 bg-[#00000062] pointer-events-auto">
                    {/* Overlay */}
                    <UploadProfile ref={profileRef} code={currentUserData?.department_code} onAnimationEnd={profile.handleEnd} onClose={() => profile.setAnimation("fade-out")} animate={profile.animation} />  
                </div>
            </>
        )
            
               

        }
         {updateInfo.isVisible &&(
            <>
                <div className="fixed lg:z-40 md:z-50 z-70 flex justify-center items-center inset-0 bg-[#00000062]  pointer-events-auto">
                    {/* Overlay */}
                    <UpdateInfo ref={updateRef} onAnimationEnd={updateInfo.handleEnd} onClose={() => updateInfo.setAnimation("fade-out")} animate={updateInfo.animation} />  
                </div>
            </>

         )
            
        }
         {changePassword.isVisible &&(
            <>
                <div className="fixed lg:z-40 md:z-50 z-70 flex justify-center items-center  inset-0 bg-[#00000062]  pointer-events-auto">
                    {/* Overlay */}
                    <ChangePassword code={currentUserData?.department_code} ref={changeRef} onAnimationEnd={changePassword.handleEnd} onClose={() => changePassword.setAnimation("fade-out")} animate={changePassword.animation} />  
                </div>
            </>

         )
            
        }
        {qrCode.isVisible &&(
            <>
                <div className="fixed lg:z-40 md:z-50 z-70 flex justify-center items-center inset-0 bg-[#00000062] pointer-events-auto">
                    {/* Overlay */}
                    <QRCode ref={qrRef} onAnimationEnd={qrCode.handleEnd} onClose={() => qrCode.setAnimation("fade-out")} animate={qrCode.animation} />  
                </div>
            </>

        )
            
        }
        <Header code={currentUserData?.department_code} titleCouncil ={currentUserData?.organization_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-semibold ml-6">Settings</h2>
            </div>
            <div className="lg:ml-70 px-6 mt-4">
                <SettingCard upload={profile.toggle} edit={updateInfo.toggle} change={changePassword.toggle} qr={qrCode.toggle}/>
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar  code={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default Settings;