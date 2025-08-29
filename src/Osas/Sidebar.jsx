import {Link} from 'react-router-dom';
import NavLink from '../other_components/NavLink.jsx';
import React from 'react';
import apiUrl from "./../apiUrl.js";

const Sidebar = React.forwardRef(({eFee, animate, onAnimationEnd,onClose},ref) =>{
    
    const logout = async () => {
        try {
            const res = await fetch(apiUrl + "/logout", {
                method: "POST",
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                alert(response.message);
            }
        } catch (err) {
            alert("An error occured: " + response.message);
        }
    }
   
    return(
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`w-70 h-screen shadow-[3px_2px_1px_#174515] ${animate} border-b-20 border-[#174515] lg:z-1 z-50 fixed bg-white`}>
            <div className='mt-[110px]'>
                <span onClick={onClose} className='lg:hidden'>
                    <span className="material-symbols-outlined absolute right-1.5 top-23 cursor-pointer text-[#174515]">close</span>
                </span>
                <span className='flex justify-center items-center gap-3'>
                    <img className='w-[60px]' src={eFee} alt="" />
                    <span className='text-center font-bold text-[22px] block text-[#174515]'>eFeeSync</span>
                </span>
                <nav className='pt-9 mx-3  '>
                    <NavLink code="osas" navLink = "/osas/dashboard" iconName="dashboard" navName="Dashboard"/>
                    <NavLink code="osas" navLink = "/osas/college" iconName="account_balance" navName="College"/>
                    <NavLink code="osas" navLink = "/osas/program" iconName="school" navName="Program"/>
                    <NavLink code="osas" navLink = "/osas/organisation" iconName="graph_2" navName="Organisation"/>
                    <NavLink code="osas" navLink = "/osas/student" iconName="person" navName="Student"/>
                    <NavLink code="osas" navLink = "/osas/account" iconName="person_add" navName="Account"/>
                    <NavLink code="osas" navLink = "/osas/setting" iconName="settings" navName="Settings"/>
                </nav>
                <div className="absolute bottom-2 w-full px-3 lg:hidden block">
                    <NavLink code="osas" navLink = "#" iconName="moon_stars" navName="Dark Mode"  />
                      <Link onClick={logout} className={`flex items-center font-[family-name:Helvetica] transition duration-150 p-2.5 text-md hover:bg-[#174515]  rounded-md hover:text-white hover:shadow-[3px_2px_2px_grey`}>
                        <span className="material-symbols-outlined px-2.5">logout</span>
                            <span>Log Out</span>
                        <span hidden >osas</span>
                    </Link>
       
                </div>
            </div>
        </div>
    );
});
export default Sidebar;