import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import NavLink from './NavLink';
import DropDownNav from './DropDownNav';
import AccountCard from './AccountCard';
import '../animate.css';

function Header_Council(props) {

  const [showAccount, setShowAccount] = useState(false);
  const [accAnimation, setAccAnimation] = useState('');
  const accRef = useRef(null);

  const [showNav, setShowNav] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [animation, setAnimation] = useState('');
  const navRef = useRef(null);

  const clickedDarkMode = () =>{
    setDarkmode(!darkmode);
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

  const clickedMenu = () => {
    if (!navVisible) {
      setNavVisible(true);          // Mount the menu
      setAnimation('fade-down');      // Play fade-in
      setShowNav(true);             // Change icon
    } else {
      setAnimation('fade-up');     // Play fade-out
      setShowNav(false);            // Change icon
    }
  };

  const handleAnimationEnd = () => {
    if (animation === 'fade-up') {
      setNavVisible(false); 
              // Unmount only after fade-out
    }
  };

  return (
    <>
    
    <header className={` bg-white grid grid-cols-[90px_auto_100px_50px] lg:grid-cols-[120px_auto_180px] fixed top-0 w-screen h-[80px] z-[1] items-center shadow-[2px_4px_3px_#741f6e]`}>
      <span className="grid justify-end">
        <img src={props.logoCouncil} alt="logo" width="70px" />
      </span>

      <span className="ml-[20px]">
        <h2 className="lg:hidden text-[22px] font-bold">{props.abb}</h2>
        <h2 className="hidden lg:block text-[26px] font-bold">{props.titleCouncil}</h2>
      </span>

      <span className="flex justify-around text-[28px] mr-[40px] cursor-pointer">
        <span onClick={clickedDarkMode} className="material-symbols-outlined px-[5px]">moon_stars</span>
        <span className="material-symbols-outlined">notifications</span>
        <span onClick={clickedAcc} className="material-symbols-outlined">account_circle</span>
      </span>
      { showAccount &&
        <AccountCard ref={accRef} onAnimationEnd={handleAccAnimation} animate={accAnimation} />
      }
     
      <span className="lg:hidden grid justify-center text-[20px] cursor-pointer">
        <span onClick={clickedMenu} className="material-symbols-outlined px-[5px]">
          {showNav ? 'close' : 'menu'}
        </span>
      </span>
    </header>
    
     {navVisible && (
        <span className='z-[1] absolute top-[85px]'>
          <nav ref={navRef} onAnimationEnd={handleAnimationEnd}
            className={`lg:hidden w-screen flex flex-col px-[30px] bg-[#ffffff] pt-[40px] overflow-hidden ${animation}`}
          >
            <NavLink code="cit" navLink = "/org/citdashboard" iconName="dashboard" navName="Dashboard"/>
            <NavLink code="cit" navLink = "/org/citstudent" iconName="person" navName="Student"/>
            <NavLink code="cit" navLink = "/org/citeventlist" iconName="event_note" navName="Event List"/>
            <DropDownNav code="cit" subNavLink1 = "/org/citeventcontribution" subNavLink2 = "/org/citattendance" iconName="calendar_month" navName="Event Management" iconName1 = "event_upcoming" subNavName1 = "Event Contributions" iconName2 = "edit_calendar" subNavName2 = "Event Attendance"/>
            <DropDownNav code="cit" subNavLink1 = "/org/citfinancial" subNavLink2 = "/org/citaccomplishment" iconName="assignment" navName="Reports" iconName1 = "article" subNavName1 = "Financial Report" iconName2 = "fact_check" subNavName2 = "Accomplishment Report"/>
            <NavLink code="cit" navLink = "/org/citsanction" iconName="event_busy" navName="Sanctions"/>
            <NavLink code="cit" navLink = "/org/citexcuse" iconName="approval" navName="Excuse Approval"/>
            <NavLink code="cit" navLink = "/org/citsettings" iconName="settings" navName="Settings"/>
            <NavLink code="cit" navLink = "/" iconName="logout" navName="Log Out"/>
          </nav>
        </span>
      )}
      </>
  );
}

export default Header_Council;
