import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import EfeeViolet from '../assets/violetlogo.png'
import AccountCard from '../other_components/AccountCard.jsx';
import Sidebar from './Sidebar.jsx';
import NotificationCard from '../other_components/NotificationCard.jsx';
import '../animate.css';

function Header(props) {
   const Color =
   props.code === "cit" ? 'border-[#621668] text-[#621668]' 
   :props.code === "coe" ? 'border-[#0E2148]'
   :props.code === "coc" ? 'border-[#3A0519]'
   :props.code === "cot" ? 'border-[#FFD95F] text-[#000]'
   :props.code === "eap" ? 'border-[#4B352A]'
   :props.code === "osas" ? 'border-[#174515]'
   : 'border-red'

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
    <header className={` flex  bg-white fixed top-0 w-screen h-[80px] lg:z-30 z-80 items-center border-b-3 ${Color} `}>
      <span hidden>{props.code}</span>
      <span className="flex items-center  gap-3 ml-2">
        <span className='lg:hidden block'>
          <i onClick={clickedMenu} className="fa-solid fa-bars text-sm cursor-pointer"></i>
        </span>
        <span className='lg:ml-18'>
          <img src={props.logoCouncil} className='lg:w-18 w-12' alt="logo"/>
        </span>
      </span>
      
      <span className="lg:ml-5 ml-1">
        <h2 className="lg:text-2xl text-sm font-bold">{props.titleCouncil}</h2>
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
