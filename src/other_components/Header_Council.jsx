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
import Ssc from "../assets/SSC.png";

import '../animate.css';

function Header_Council({code, titleCouncil}) {
  /* ------------------------- Color  ----------------------------- */

  const colors = {
    CIT: "border-[#621668] text-[#621668]",
    COE: "border-[#020180] text-[#020180]",
    COC: "border-[#660A0A] text-[#660A0A]",
    COT: "border-[#847714] text-[#847714]",
    ESAF: "border-[#6F3306] text-[#6F3306]",
    SSC: "border-[#174515] text-[#174515]"
  };
  const color = colors[code] || "border-[#174515] text-[#174515]";

  const hoverColors = {
    CIT: "hover:bg-[#621668] ",
    COE: "hover:bg-[#020180] ",
    COC: "hover:bg-[#660A0A]",
    COT: "hover:bg-[#847714]",
    ESAF: "hover:bg-[#6F3306]",
    SSC: "hover:bg-[#174515]"

  };
  const hoverColor = hoverColors[code] || "hover:bg-[#174515]";



  const logos = {
    COC: Crim,
    CIT: It,
    COE: Educ,
    ESAF: Esaf,
    COT: Indus,
    SSC: Ssc
  };
  const logo = logos[code] || Ssc;


  /* ------------------------- Animated States ----------------------------- */
  const account = useAnimatedToggle();
  const sidebar = useAnimatedToggle();
  const notification = useAnimatedToggle();

  const accRef = useRef(null);
  const sideRef = useRef(null);
  const notifRef = useRef(null);

  const clickedBell = () => {
    account.setIsVisible(false);
    sidebar.setIsVisible(false);
  }
  const clickedAccBar = () => {
    notification.setIsVisible(false);
  }

  /* ------------------ Dark Mode Toggle ------------------ */
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <header className={` flex  bg-white fixed top-0 w-screen h-20 lg:z-20 md:z-40 z-60  items-center border-b-3 ${color}`}>
        <span hidden>{code}</span>
        <span className="flex items-center  gap-3 ml-2">
          <span className='lg:hidden block'>
            <i onClick={() => { clickedAccBar(); sidebar.toggle(); }} className="fa-solid fa-bars text-sm cursor-pointer"></i>
          </span>
          <span className='lg:ml-14'>
            <img src={logo} className='lg:h-16 md:h-14 h-12  mr-2 ' alt="logo" />
          </span>
        </span>

        <span >
          <h2 className="lg:text-2xl md:text-lg text-sm  font-bold font-poppins ml-2">{titleCouncil}</h2>
        </span>

        <span className="flex lg:gap-3 lg:absolute md:absolute md:right-8 lg:right-8 float-right ">
      {/* 
          <span className='lg:block hidden'>
            <i className={`fa-solid fa-moon lg:text-xl cursor-pointer ${hoverColor} transiton duration-150 rounded-full p-1.5 hover:text-white`}></i>
          </span>

          <span>
            <i onClick={() => { clickedBell(); notification.toggle(); }} className={`fa-solid fa-bell  lg:text-xl ${hoverColor} transiton duration-150 rounded-full p-1.5 hover:text-white  text-sm cursor-pointer`}></i>
          </span>
        */}

          <span onClick={() => { clickedAccBar(); account.toggle(); }}  className={`hidden px-3 font-[family-name:Arial] text-sm rounded-3xl shadow-[1px_1px_1px_grey] ${hoverColor} cursor-pointer transiton duration-150 border-1 border-[#f3f3f3] lg:flex items-center hover:text-white`}>
            <span><i  className={`fa-solid fa-circle-user lg:text-xl  rounded-full p-1.5 hover:text-white  text-sm cursor-pointer`}></i></span>
            <span>Account</span>
          </span>
        </span>

        {/* Account Card */}
        {account.isVisible && (
          <AccountCard ref={accRef} code={code} onAnimationEnd={account.handleEnd} animate={account.animation} />
        )
        }
      </header>

      {/* Sidebar*/}
      {sidebar.isVisible && (
        <>
          <div className="fixed inset-0 bg-[#00000062] z-20 pointer-events-auto">
            {/* Overlay */}
          </div>

          <CITSidebar code={code} eFee={EfeeViolet} ref={sideRef} onAnimationEnd={sidebar.handleEnd} animate={sidebar.animation} onClose={() => sidebar.setAnimation("fade-out")} />

        </>
      )

      }
      {notification.isVisible && (
        <NotificationCard ref={notifRef} code={props.code} onAnimationEnd={notification.handleEnd} animate={notification.animation} />
      )
      }
    </>
  );
}

export default Header_Council;
