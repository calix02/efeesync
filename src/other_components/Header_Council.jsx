import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import EfeeViolet from '../assets/violetlogo.png'
import AccountCard from './AccountCard';
import CITSidebar from '../treasurer/Sidebar.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import NotificationCard from './NotificationCard.jsx';
import OsasSidebar from "../osas/Sidebar.jsx";
import Crim from "../assets/CRIM.png";
import Osas from "../assets/osas.png";
import It from "../assets/CIT.png";
import Educ from "../assets/COE.png";
import Esaf from "../assets/ESAF.png";
import Indus from "../assets/COT.png";

import '../animate.css';

function Header_Council(props) {
/* ------------------------- Color  ----------------------------- */

   const borderColors = {
    CIT: "border-[#621668] text-[#621668]",
    COE: "border-[#0E2148] text-[#0E2148]",
    COC: "border-[#3A0519] text-[#3A0519]",
    COT: "border-[#FFD95F] text-[#FFD95F]",
    SCEAP: "border-[#4B352A] text-[#4B352A]",
    OSAS: "border-[#174515] text-[#174515]",
  };
  const borderColor = borderColors[props.code] || "border-black text-black";
  
  const logos = {
    COC : Crim,
    CIT: It,
    COE:Educ, 
    ESAF: Esaf,
    COT: Indus,
    OSAS: Osas,
  };
  const logo = logos[props.code] || " ";


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
    <header className={` flex  bg-white fixed top-0 w-screen h-20 lg:z-20 md:z-40 z-60  items-center border-b-3 ${borderColor}`}>
      <span hidden>{props.code}</span>
      <span className="flex items-center  gap-3 ml-2">
        <span className='lg:hidden block'>
          <i onClick={()=>{clickedAccBar(); sidebar.toggle();} } className="fa-solid fa-bars text-sm cursor-pointer"></i>
        </span>
        <span className='lg:ml-14'>
          <img src={logo} className='h-16  mr-2 ' alt="logo"/>
        </span>
      </span>
      
      <span >
        <h2 className="lg:text-2xl md:text-lg text-sm  font-bold font-poppins ml-2">{props.titleCouncil}</h2>
      </span>

      <span className="flex lg:gap-3 absolute right-8">
        
      <span className='lg:block hidden'>
        <i  className="fa-solid fa-moon lg:text-xl cursor-pointer hover:bg-[#621668] transiton duration-150 rounded-full p-1.5 hover:text-white"></i>
      </span>

      <span>
        <i onClick={() => {clickedBell(); notification.toggle();}} className="fa-solid fa-bell lg:text-xl hover:bg-[#621668] transiton duration-150 rounded-full p-1.5 hover:text-white  text-sm cursor-pointer"></i>
      </span>

        <span className="hidden lg:block">
          <i onClick={() =>{clickedAccBar(); account.toggle();}}  className="fa-solid fa-circle-user lg:text-xl hover:bg-[#621668] transiton duration-150 rounded-full p-1.5 hover:text-white text-sm cursor-pointer"></i>
        </span>
      </span>

      {/* Account Card */}
      { account.isVisible &&(
          <AccountCard ref={accRef} code="cit" onAnimationEnd={account.handleEnd} animate={account.animation} />
        )    
      }
    </header>
      
    {/* Sidebar*/}
    {sidebar.isVisible && (
      <>
        <div className="fixed inset-0 bg-[#00000062] z-20 pointer-events-auto">
          {/* Overlay */}
        </div>
       
          <CITSidebar eFee={EfeeViolet} ref={sideRef} onAnimationEnd={sidebar.handleEnd} animate={sidebar.animation} onClose={() => sidebar.setAnimation("fade-out")} />
       
      </>
    )
      
    }
    {notification.isVisible &&(
      <NotificationCard ref={notifRef} code="cit" onAnimationEnd={notification.handleEnd} animate={notification.animation} />
    )
    }
    </>
  );
}

export default Header_Council;
