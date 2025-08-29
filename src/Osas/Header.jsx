import { Link } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import EfeeOsas from '../assets/Final_logo.png';
import AccountCard from '../other_components/AccountCard.jsx';
import Sidebar from './Sidebar.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import NotificationCard from '../other_components/NotificationCard.jsx';
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
    cit: "border-[#621668] text-[#621668]",
    coe: "border-[#0E2148]",
    coc: "border-[#3A0519]",
    cot: "border-[#FFD95F] text-[#000]",
    eap: "border-[#4B352A]",
    osas: "border-[#174515] text-[#174515]",
  };
  const borderColor = borderColors[props.code] || "border-red";
  
  const logos ={
    coc : Crim,
    cit: It,
    coe:Educ,
    esaf: Esaf,
    cot: Indus,
    osas: Osas,
    

  };
  const logo = logos[props.code] || Educ;


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
          <img src={logo} className='lg:w-28 md:w-14 w-12' alt="logo"/>
        </span>
      </span>
      
      <span >
        <h2 className="lg:text-2xl md:text-lg text-sm  font-bold">{props.titleCouncil}</h2>
      </span>

      <span className="flex lg:gap-3 absolute right-8">
        
      <span className='lg:block hidden'>
        <i  className="fa-solid fa-moon lg:text-xl cursor-pointer hover:bg-[#174515] transiton duration-150 rounded-full p-1.5 hover:text-white"></i>
      </span>

      <span>
        <i onClick={() => {clickedBell(); notification.toggle();}} className="fa-solid fa-bell lg:text-xl hover:bg-[#174515] transiton duration-150 rounded-full p-1.5 hover:text-white  text-sm cursor-pointer"></i>
      </span>

        <span className="hidden lg:block">
          <i onClick={() =>{clickedAccBar(); account.toggle();}}  className="fa-solid fa-circle-user lg:text-xl hover:bg-[#174515] transiton duration-150 rounded-full p-1.5 hover:text-white text-sm cursor-pointer"></i>
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
        <div className="fixed inset-0 bg-[#00000062] z-20 pointer-events-auto">
          {/* Overlay */}
        </div>
       
          <Sidebar eFee={EfeeOsas} ref={sideRef} onAnimationEnd={sidebar.handleEnd} animate={sidebar.animation} onClose={() => sidebar.setAnimation("fade-out")} />
       
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
