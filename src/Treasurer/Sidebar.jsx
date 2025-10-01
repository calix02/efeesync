import {Link} from 'react-router-dom';
import DropDownNav from '../other_components/DropDownNav.jsx';
import NavLink from '../other_components/NavLink.jsx';
import React from 'react';
import {confirmAlert,successAlert, errorAlert} from "../utils/alert.js";
import Crim from "../assets/maroon logo.png";
import Educ from "../assets/bluelogo.png";
import It from "../assets/violetlogo.png";
import Indus from "../assets/yellow logo.png";
import Esaf from "../assets/brown logo.png";
import Ssc from "../assets/greenlogo.png";



const CITSidebar = React.forwardRef(({ animate, onAnimationEnd,onClose ,code, isUnivWide },ref) =>{
     const colors = {
        CIT: "border-[#621668] text-[#621668]",
        COE: "border-[#020180] text-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A]",
        COT: "border-[#847714] text-[#847714]",
        ESAF: "border-[#6F3306] text-[#6F3306]",
        SSC: "border-[#174515] text-[#174515]"
      };
      const color = colors[code] || "border-[#174515] text-[#174515]";
      
      const logos = {
        COC : Crim,
        COE: Educ,
        CIT: It,
        COT: Indus,
        ESAF: Esaf,
        SSC: Ssc
       
      };
      const logo = logos[code] || Ssc;

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
                        window.location.reload();
                    }
                }catch (err) {
                            errorAlert("An error occured: " + response.message);
                }
            }
        });
    }
   
    return(
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`w-70 h-screen overflow-y-scroll hide-scrollbar  border-r-3  ${animate} border-b-20 ${color} lg:z-10 md:z-30  z-40 fixed bg-white`}>
            <div className='mt-[95px]'>
                <span onClick={onClose} className='lg:hidden'>
                    <span className="material-symbols-outlined absolute right-1.5 top-23 cursor-pointer text-[#621668]">close</span>
                </span>
                <span className='flex justify-center items-center gap-3'>
                    <img className='h-10' src={logo} alt="" />
                    <h2 className='text-center font-semibold text-[18px] font-poppins text-2xl block'>eFeeSync</h2>
                </span>
                <nav className='pt-5 mx-3'>
                    <NavLink code={code} navLink = "/org/dashboard" iconName="dashboard" navName="Dashboard"/>
                    {!isUnivWide && (
                        <NavLink code={code} navLink = "/org/student" iconName="person" navName="Student"/>
                    )}
                    <NavLink code={code} navLink = "/org/eventlist" iconName="event_note" navName="Event List"/>
                    {/** 
                    <DropDownNav code={code} subNavLink1 = "/org/financial" subNavLink2 = "/org/accomplishment" iconName="assignment" navName="Reports" iconName1 = "article" subNavName1 = "Financial Report" iconName2 = "fact_check" subNavName2 = "Accomplishment Report"/>
                    */}
                    <NavLink code={code} navLink = "/org/financial" iconName="article" navName="Financial Report"/>
                    <NavLink code={code} navLink = "/org/payment-transaction" iconName="credit_card" navName="Online Payments"/>
                    <NavLink code={code} navLink = "/org/sanction" iconName="event_busy" navName="Unsettled Transactions"/>
                    <NavLink code={code} navLink = "/org/excuse" iconName="approval" navName="Request Approval"/>
                    <NavLink code={code} navLink = "/org/settings" iconName="settings" navName="Settings"/>
                </nav>
                <div className="absolute bottom-2 w-full px-3 lg:hidden block">
                    {/** 
                    <NavLink code={code} navLink = "/org/citdashboard" iconName="moon_stars" navName="Dark Mode"  />
                    */}
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