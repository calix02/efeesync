import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import SettingCard from "../student_components/SettingCard.jsx";
import UploadProfile from "../student_components/UploadProfile.jsx";
import UpdateInfo from "../student_components/UpdateInfo.jsx";
import ChangePassword from "../student_components/ChangePassword.jsx";
import QRCode from "../student_components/QRCode.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import React, {useState,useRef} from 'react';
import it from '../assets/it.png';


function Settings(){
    const [showUpload, setShowUpload] = useState(false);
    const [showUpdateInfo, setShowUpdateInfo] = useState(false);
    const [showChange, setShowChange] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const [animation,setAnimation] = useState('');

    const uploadRef = useRef(null);
    const updateInfoRef = useRef(null);
    const changeRef = useRef(null);
    const qrRef = useRef(null);
 
    const clickedUpload = () =>{
        if(!showUpload ){
            setShowUpload(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
     const handleCloseUpload = () =>{
        if(animation === "fade-out"){
            setShowUpload(false);
        }
    }

    const clickedEdit = () =>{
        if(!showUpdateInfo ){
            setShowUpdateInfo(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
     const handleCloseUpdateInfo = () =>{
        if(animation === "fade-out"){
            setShowUpdateInfo(false);
        }
    }

     const clickedChange = () =>{
        if(!showChange ){
            setShowChange(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
     const handleCloseChange = () =>{
        if(animation === "fade-out"){
            setShowChange(false);
        }
    }

    
     const clickedQR = () =>{
        if(!showQR ){
            setShowQR(true);
            setAnimation('fade-in');
        }else{
            setAnimation('fade-out');
        }
    }
     const handleCloseQR = () =>{
        if(animation === "fade-out"){
            setShowQR(false);
        }
    }

     const handleClose = () =>{
        setAnimation("fade-out");
    }

    
       
    return(
         <>
        {showUpload &&
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UploadProfile ref={uploadRef} onAnimationEnd={handleCloseUpload} onClose={handleClose} animate={animation} />  
            </>
               

        }
         {showUpdateInfo &&
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <UpdateInfo ref={updateInfoRef} onAnimationEnd={handleCloseUpdateInfo} onClose={handleClose} animate={animation} />  
            </>
        }
         {showChange &&
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <ChangePassword ref={changeRef} onAnimationEnd={handleCloseChange} onClose={handleClose} animate={animation} />  
            </>
        }
        {showQR &&
            <>
                <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                    {/* Overlay */}
                </div>
                <QRCode ref={qrRef} onAnimationEnd={handleCloseQR} onClose={handleClose} animate={animation} />  
            </>
        }
        <Header code="cit" logoCouncil={it} titleCouncil = "College of Information Technology"/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-semibold ml-6">Settings</h2>
            </div>
            <div className="lg:ml-70 px-6 mt-4">
                <SettingCard upload={clickedUpload} edit={clickedEdit} change={clickedChange} qr={clickedQR}/>
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeViolet}/>
            </div>

        </>
    );
}
export default Settings;