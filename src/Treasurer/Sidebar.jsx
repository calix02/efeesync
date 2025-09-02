import {Link} from 'react-router-dom';
import DropDownNav from '../other_components/DropDownNav.jsx';
import NavLink from '../other_components/NavLink.jsx';
import React from 'react';
import {confirmAlert,successAlert, errorAlert} from "../utils/alert.js";

const CITSidebar = React.forwardRef(({eFee, animate, onAnimationEnd,onClose},ref) =>{
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
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`w-70 h-screen text-[#621668] border-r-3 border-[#621668] ${animate} border-b-20 border-[#4e0746] lg:z-10 md:z-30  z-40 fixed bg-white`}>
            <div className='mt-35'>
                <span onClick={onClose} className='lg:hidden'>
                    <span className="material-symbols-outlined absolute right-1.5 top-23 cursor-pointer text-[#621668]">close</span>
                </span>
                <span className='flex relative justify-center items-center'>
                    <img className='w-10 absolute left-15' src={eFee} alt="" />
                    <h2 className='text-center absolute right-18 font-semibold font-[family-name:Cambria] text-2xl block'>eFeeSync</h2>
                </span>
                <nav className='pt-10 mx-3  '>
                    <NavLink code="cit" navLink = "/org/dashboard" iconName="dashboard" navName="Dashboard"/>
                    <NavLink code="cit" navLink = "/org/student" iconName="person" navName="Student"/>
                    <NavLink code="cit" navLink = "/org/eventlist" iconName="event_note" navName="Event List"/>
                    <DropDownNav code="cit" subNavLink1 = "/org/eventcontribution" subNavLink2 = "/org/attendance" iconName="calendar_month" navName="Event Management" iconName1 = "event_upcoming" subNavName1 = "Event Contributions" iconName2 = "edit_calendar" subNavName2 = "Event Attendance"/>
                    <DropDownNav code="cit" subNavLink1 = "/org/financial" subNavLink2 = "/org/accomplishment" iconName="assignment" navName="Reports" iconName1 = "article" subNavName1 = "Financial Report" iconName2 = "fact_check" subNavName2 = "Accomplishment Report"/>
                    <NavLink code="cit" navLink = "/org/payment-transaction" iconName="credit_card" navName="Payment Transactions"/>
                    <NavLink code="cit" navLink = "/org/sanction" iconName="event_busy" navName="Sanctions"/>
                    <DropDownNav code="cit" subNavLink1 = "/org/excuse" subNavLink2="/org/shifting-approval" iconName="approval" navName="Excuse Approval" subNavName1="Excuse Letter Approval" iconName1="inbox_text" subNavName2="Shifting Approval" iconName2="article_person"/>
                    <NavLink code="cit" navLink = "/org/settings" iconName="settings" navName="Settings"/>
                </nav>
                <div className="absolute bottom-2 w-full px-3 lg:hidden block">
                    <NavLink code="cit" navLink = "/org/citdashboard" iconName="moon_stars" navName="Dark Mode"  />
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
export default CITSidebar;