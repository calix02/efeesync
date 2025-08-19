import { Link } from 'react-router-dom';
import React, { useRef } from 'react';
import EfeeViolet from '../assets/violetlogo.png'
import AccountCard from './AccountCard';
import CITSidebar from '../Treasurer/Sidebar.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import NotificationCard from './NotificationCard.jsx';

import '../animate.css';

function Header_Council(props) {
/* ------------------------- Border Color by Council ----------------------------- */

   const borderColors = {
    cit: "border-[#621668]",
    coe: "border-[#0E2148]",
    coc: "border-[#3A0519]",
    cot: "border-[#FFD95F] text-[#000]",
    eap: "border-[#4B352A]",
    osas: "border-[#174515]",
  };
  const borderColor = borderColors[props.code] || "border-red";

/* ------------------------- Animated States ----------------------------- */
  const account = useAnimatedToggle();
  const sidebar = useAnimatedToggle();
  const notification = useAnimatedToggle();

  const accRef = useRef(null);
  const sideRef = useRef(null);
  const notifRef = useRef(null);

  const clickedBell = () =>{
    account.setIsVisible(false);
    sidebar.setIsVisible(false);
  }
  const clickedAccBar = () =>{
    notification.setIsVisible(false);
  }
  
  /* ------------------ Dark Mode Toggle ------------------ */
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
  <>
    <header className={` flex  bg-white fixed top-0 w-screen h-[80px] lg:z-30 z-80 items-center border-b-3 ${borderColor}`}>
      <span hidden>{props.code}</span>
      <span className="flex items-center  gap-3 ml-2">
        <span className='lg:hidden block'>
          <i onClick={()=>{clickedAccBar(); sidebar.toggle();} } className="fa-solid fa-bars text-sm cursor-pointer"></i>
        </span>
        <span className='lg:ml-18'>
          <img src={props.logoCouncil} className='lg:w-18 md:w-14 w-12' alt="logo"/>
        </span>
      </span>
      
      <span className="lg:ml-5 ml-1">
        <h2 className="lg:text-2xl md:text-lg text-sm  font-bold">{props.titleCouncil}</h2>
      </span>

      <span className="flex lg:gap-5 absolute right-8">

      <span className='lg:block hidden'>
        <i  className="fa-solid fa-moon lg:text-xl cursor-pointer"></i>
      </span>

      <span>
        <i onClick={() => {clickedBell(); notification.toggle();}} className="fa-solid fa-bell lg:text-xl text-sm cursor-pointer"></i>
      </span>

        <span className="hidden lg:block">
          <i onClick={() =>{clickedAccBar(); account.toggle();}}  className="fa-solid fa-circle-user lg:text-xl text-sm cursor-pointer"></i>
        </span>
      </span>

      {/* Account Card */}
      { account.isVisible &&(
          <AccountCard ref={accRef} onAnimationEnd={account.handleEnd} animate={account.animation} />
        )    
      }
    </header>
      
    {/* Sidebar*/}
    {sidebar.isVisible && (
      <>
        <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
          {/* Overlay */}
        </div>
        <CITSidebar eFee={EfeeViolet} ref={sideRef} onAnimationEnd={sidebar.handleEnd} animate={sidebar.animation} onClose={() => sidebar.setAnimation("fade-out")} />
      </>
    )
      
    }
    {notification.isVisible &&(
      <NotificationCard ref={notifRef} onAnimationEnd={notification.handleEnd} animate={notification.animation} />
    )

    }
    </>
     
    
  );
}

export default Header_Council;
