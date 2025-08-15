import {Link} from 'react-router-dom';
import NavLink from '../other_components/NavLink.jsx';
import DropDownNav from '../other_components/DropDownNav.jsx';
import React from 'react';
const Sidebar = React.forwardRef(({eFee, animate, onAnimationEnd,onClose},ref) =>{
   
    return(
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`w-70 h-screen shadow-[3px_2px_1px_#621668] ${animate} border-b-20 border-[#621668] lg:z-1 z-50 fixed bg-white`}>
            <div className='mt-[110px]'>
                <span onClick={onClose} className='lg:hidden'>
                    <span className="material-symbols-outlined absolute right-1.5 top-23 cursor-pointer text-[#621668]">close</span>
                </span>
                <span className='flex justify-center items-center gap-3'>
                    <img className='w-[60px]' src={eFee} alt="" />
                    <span className='text-center font-bold text-[22px] block text-[#621668]'>eFeeSync</span>
                </span>
                <nav className='pt-9 mx-3  '>
                    <NavLink code="cit" navLink = "/student/dashboard" iconName="dashboard" navName="Dashboard"/>
                    <NavLink code="cit" navLink = "/student/contribution" iconName="account_balance" navName="Contributions"/>
                    <NavLink code="cit" navLink = "/student/attendance" iconName="patient_list" navName="Attendance"/>
                    <NavLink code="cit" navLink = "/student/sanction" iconName="event_busy" navName="Sanctions"/>
                    <DropDownNav code="cit" subNavLink1 = "/student/excuse" subNavLink2="/student/shifting" iconName="approval" navName="Request" subNavName1="Excuse Letter Request" iconName1="inbox_text" subNavName2="Shifting Request" iconName2="article_person"/>
                    <DropDownNav code="cit" subNavLink1 = "/student/financial" subNavLink2 = "/student/accomplishment" iconName="assignment" navName="Reports" iconName1 = "article" subNavName1 = "Financial Report" iconName2 = "fact_check" subNavName2 = "Accomplishment Report"/>
                    <NavLink code="cit" navLink = "/student/payment" iconName="payments" navName="Payment"/>
                    <NavLink code="cit" navLink = "/student/settings" iconName="settings" navName="Settings"/>
                </nav>
                <div className="absolute bottom-2 w-full px-3 lg:hidden block">
                    <NavLink code="cit" navLink = "#" iconName="moon_stars" navName="Dark Mode"  />
                    <NavLink code="cit" navLink = "/" iconName="logout" navName="Log Out"/>
                </div>
            </div>
        </div>
    );
});
export default Sidebar;