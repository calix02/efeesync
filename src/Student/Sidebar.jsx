import {Link} from 'react-router-dom';
import NavLink from '../other_components/NavLink.jsx';
import DropDownNav from '../other_components/DropDownNav.jsx';
import {confirmAlert,successAlert, errorAlert} from "../utils/alert.js";
import React from 'react';
const Sidebar = React.forwardRef(({eFee, animate, onAnimationEnd,onClose},ref) =>{
    const logout = () => {
           confirmAlert("You really want to Log out?").then( async (result) =>{
               if(result.isConfirmed){
                   try {
                       const res = await fetch("/api/logout", {
                       method: "POST",
                       credentials: "include"
                   });
                       const response = await res.json();
                       if (response.status === "success") {
                           successAlert(response.message).then((result) =>{
                               if(result.isConfirmed){
                                   window.location.reload();
                               }
                           });
                       }
                   }catch (err) {
                               errorAlert("An error occured: " + response.message);
                   }
               }
           });
       }
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
                    <Link onClick={logout} className={`flex items-center font-[family-name:Helvetica] transition duration-150 p-2.5 text-md hover:bg-[#621668]  rounded-md hover:text-white hover:shadow-[3px_2px_2px_grey`}>
                        <span className="material-symbols-outlined px-2.5">logout</span>
                        <span>Log Out</span>
                        <span hidden >cit</span>
                    </Link>
                </div>
            </div>
        </div>
    );
});
export default Sidebar;