import {Link} from 'react-router-dom';
import NavLink from '../other_components/NavLink.jsx';
import DropDownNav from '../other_components/DropDownNav.jsx';
import {confirmAlert,successAlert, errorAlert} from "../utils/alert.js";
import Crim from "../assets/maroon logo.png";
import Educ from "../assets/bluelogo.png";
import It from "../assets/violetlogo.png";
import Indus from "../assets/yellow logo.png";
import Esaf from "../assets/brown logo.png";
import Ssc from "../assets/greenlogo.png";
import React from 'react';
const Sidebar = React.forwardRef(({eFee, animate,code, onAnimationEnd,onClose},ref) =>{
     const colors = {
        CIT: "border-[#621668] text-[#621668]",
        COE: "border-[#020180] text-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A]",
        COT: "border-[#847714] text-[#847714]",
        ESAF: "border-[#6F3306] text-[#6F3306]",
        SSC: "border-[#174515] text-[#174515]"
      };
      const color = colors[code] || "border-black text-black";
      
      const logos = {
            COC : Crim,
            COE: Educ,
            CIT: It,
            COT: Indus,
            ESAF: Esaf,
            SSC: Ssc
           
          };
          const logo = logos[code] || " ";
    

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
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`w-70 h-screen border-r-2 ${color} ${animate} border-b-20 lg:z-1 z-50 fixed bg-white`}>
            <div className='mt-[118px]'>
                <span onClick={onClose} className='lg:hidden'>
                    <span className="material-symbols-outlined absolute right-1.5 top-23 cursor-pointer text-[#621668]">close</span>
                    <span hidden >{code}</span>
                </span>
                <span className='flex justify-center items-center gap-3'>
                    <img className='h-10' src={logo} alt="" />
                    <span className='text-center font-bold text-[22px] block '>eFeeSync</span>
                </span>
                <nav className='pt-9 mx-3  '>
                    <NavLink code={code} navLink = "/student/dashboard" iconName="dashboard" navName="Dashboard"/>
                    <NavLink code={code} navLink = "/student/contribution" iconName="account_balance" navName="Contributions"/>
                    <NavLink code={code} navLink = "/student/attendance" iconName="patient_list" navName="Attendance"/>
                    <NavLink code={code} navLink = "/student/sanction" iconName="event_busy" navName="Sanctions"/>
                    <NavLink code={code} navLink = "/student/excuse" iconName="approval" navName="Excuse Request"/>
                    <NavLink code={code} navLink = "/student/financial" iconName="article" navName="Financial Report"/>
                    {/** 
                    <DropDownNav code={code} subNavLink1 = "/student/financial" subNavLink2 = "/student/accomplishment" iconName="assignment" navName="Reports" iconName1 = "article" subNavName1 = "Financial Report" iconName2 = "fact_check" subNavName2 = "Accomplishment Report"/>
                    */}
                    <NavLink code={code} navLink = "/student/payment" iconName="payments" navName="Payment"/>
                    <NavLink code={code} navLink = "/student/settings" iconName="settings" navName="Settings"/>
                </nav>
                <div className="absolute bottom-2 w-full px-3 lg:hidden block">
                    {/** 
                    <NavLink code={code} navLink = "#" iconName="moon_stars" navName="Dark Mode"  />
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
export default Sidebar;