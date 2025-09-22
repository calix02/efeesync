import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import EfeeViolet from '../assets/violetlogo.png'
import AccountCard from '../other_components/AccountCard.jsx';
import Sidebar from './Sidebar.jsx';
import NotificationCard from '../other_components/NotificationCard.jsx';
import Crim from "../assets/CRIM.png";
import Osas from "../assets/osas.png";
import It from "../assets/CIT.png";
import Educ from "../assets/COE.png";
import Esaf from "../assets/ESAF.png";
import Indus from "../assets/COT.png";
import '../animate.css';

function Header(props) {

    const colors = {
    CIT: "border-[#621668] text-[#621668]",
    COE: "border-[#0E2148] text-[#0E2148]",
    COC: "border-[#3A0519] text-[#3A0519]",
    COT: "border-[#FFD95F] text-[#FFD95F]",
    SCEAP: "border-[#4B352A] text-[#4B352A]",
    OSAS: "border-[#174515] text-[#174515]",
  };
   const logos = {
      COC : Crim,
      CIT: It,
      COE:Educ, 
      ESAF: Esaf,
      COT: Indus,
      OSAS: Osas,
    };
    const logo = logos[props.code] || " ";
  const color = colors[props.code] || "border-black text-black";

  const [showAccount, setShowAccount] = useState(false);
  const [accAnimation, setAccAnimation] = useState('');
  const accRef = useRef(null);

  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarAnimation, setSidebarAnimation] = useState('');
  const sideRef = useRef(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notifAnimation,setNotifAnimation] = useState('');
  const notifRef = useRef(null);



  const clickedMenu = () =>{
    if(!showSidebar){
      setShowSidebar(true);
      setSidebarAnimation('fade-side');
    }else{
      setSidebarAnimation('fade-out') 
    }
  }

  const clickedBell = () =>{
    if(!showNotification){
      setShowNotification(true);
      setNotifAnimation('fade-in');
    }else{
      setNotifAnimation('fade-out') 
    }
  }
  const handleNotifAnimation = () =>{
    if(notifAnimation === 'fade-out'){
      setShowNotification(false);
    }
  }

 
  const clickedAcc = () =>{
    if(!showAccount){
      setShowAccount(true);
      setAccAnimation('fade-in');
    }else{
      setAccAnimation('fade-out') 
    }
  }
  const handleAccAnimation = () =>{
    if(accAnimation === 'fade-out'){
      setShowAccount(false);
    }
  }



  const handleAnimationEnd = () => {
    if (sidebarAnimation === 'fade-out') {
      setShowSidebar(false); 
              // Unmount only after fade-out
    }
  };
   const handleCloseSidebar = () => {
    setSidebarAnimation('fade-out');
    };

  return (
  <>
    <header className={` flex  bg-white fixed top-0 w-screen h-[80px] lg:z-20 md:z-40 z-60 items-center border-b-3 ${color} `}>
      <span hidden>{props.code}</span>
      <span className="flex items-center  gap-3 ml-2">
        <span className='lg:hidden block'>
          <i onClick={clickedMenu} className="fa-solid fa-bars text-sm cursor-pointer"></i>
        </span>
        <span className='lg:ml-18'>
          <img src={logo} className='lg:h-16 md:h-14 h-12  mr-2 ' alt="logo"/>
        </span>
      </span>
      
      <span className="lg:ml-5 ml-1">
        <h2 className="lg:text-2xl md:text-lg text-sm font-bold">{props.titleCouncil}</h2>
      </span>

      <span className="flex lg:gap-5 absolute right-8">

      <span className='lg:block hidden'>
        <i className="fa-solid fa-moon lg:text-xl cursor-pointer"></i>
      </span>

      <span>
        <i onClick={clickedBell} className="fa-solid fa-bell lg:text-xl text-sm cursor-pointer"></i>
      </span>

        <span className="hidden lg:block">
          <i onClick={clickedAcc}  className="fa-solid fa-circle-user lg:text-xl text-sm cursor-pointer"></i>
        </span>
      </span>
      { showAccount &&
        <AccountCard ref={accRef} code="cit" onAnimationEnd={handleAccAnimation} animate={accAnimation} />
        
      }

    </header>
    {showSidebar &&
      <>
        <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
          {/* Overlay */}
        </div>
        <Sidebar eFee={EfeeViolet} ref={sideRef} onAnimationEnd={handleAnimationEnd} animate={sidebarAnimation} onClose={handleCloseSidebar} />
      </>
    }
    {showNotification &&

      <NotificationCard ref={notifRef} code="cit" onAnimationEnd={handleNotifAnimation} animate={notifAnimation} />
    }
    

    </>
     
    
  );
}

export default Header;
