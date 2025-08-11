import {Link} from 'react-router-dom';
import DropDownNav from '../other_components/DropDownNav.jsx';
import NavLink from '../other_components/NavLink.jsx';
import React from 'react';
const CITSidebar = React.forwardRef(({eFee, animate, onAnimationEnd,onClose},ref) =>{
   
    return(
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`w-70 h-screen shadow-[3px_2px_1px_violet] ${animate} border-b-20 border-[#4e0746] lg:z-1 z-50 fixed bg-white`}>
            <div className='mt-[110px]'>
                <span onClick={onClose} className='lg:hidden'>
                    <span className="material-symbols-outlined absolute right-1.5 top-23 cursor-pointer text-[#621668]">close</span>
                </span>
                <span className='flex justify-center items-center gap-3'>
                    <img className='w-[60px]' src={eFee} alt="" />
                    <span className='text-center font-bold text-[22px] block'>eFeeSync</span>
                </span>
                <nav className='pt-9 mx-3  '>
                    <NavLink code="cit" navLink = "/org/citdashboard" iconName="dashboard" navName="Dashboard"/>
                    <NavLink code="cit" navLink = "/org/citstudent" iconName="person" navName="Student"/>
                    <NavLink code="cit" navLink = "/org/citeventlist" iconName="event_note" navName="Event List"/>
                    <DropDownNav code="cit" subNavLink1 = "/org/citeventcontribution" subNavLink2 = "/org/citattendance" iconName="calendar_month" navName="Event Management" iconName1 = "event_upcoming" subNavName1 = "Event Contributions" iconName2 = "edit_calendar" subNavName2 = "Event Attendance"/>
                    <DropDownNav code="cit" subNavLink1 = "/org/citfinancial" subNavLink2 = "/org/citaccomplishment" iconName="assignment" navName="Reports" iconName1 = "article" subNavName1 = "Financial Report" iconName2 = "fact_check" subNavName2 = "Accomplishment Report"/>
                    <NavLink code="cit" navLink = "/org/payment-transaction" iconName="credit_card" navName="Payment Transactions"/>
                    <NavLink code="cit" navLink = "/org/citsanction" iconName="event_busy" navName="Sanctions"/>
                    <DropDownNav code="cit" subNavLink1 = "/org/citexcuse" subNavLink2="/org/shifting-approval" iconName="approval" navName="Excuse Approval" subNavName1="Excuse Letter Approval" iconName1="inbox_text" subNavName2="Shifting Approval" iconName2="article_person"/>
                    <NavLink code="cit" navLink = "/org/citsettings" iconName="settings" navName="Settings"/>
                </nav>
                <div className="absolute bottom-2 w-full px-3 lg:hidden block">
                    <NavLink code="cit" navLink = "/org/citdashboard" iconName="moon_stars" navName="Dark Mode"  />
                    <NavLink code="cit" navLink = "/" iconName="logout" navName="Log Out"/>
                </div>
            </div>
        </div>
    );
});
export default CITSidebar;