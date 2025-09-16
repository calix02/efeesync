import {Link} from 'react-router-dom';
import NavLink from '../other_components/NavLink.jsx';
import React from 'react';
import { confirmAlert, successAlert, errorAlert } from '../utils/alert.js';

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
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`w-64 h-screen border-r-3  ${animate} border-b-20 border-[#174515] lg:z-10 md:z-30 z-40 fixed bg-white`}>
            <div className='mt-[90px]'>
                <span onClick={onClose} className='lg:hidden'>
                    <span className="material-symbols-outlined absolute right-1.5 top-23 cursor-pointer text-[#174515]">close</span>
                </span>
                <span className='flex justify-center items-center gap-3'>
                    <img className='h-10' src={eFee} alt="" />
                    <span className='text-center font-bold font-poppins text-[18px] block text-[#174515]'>eFeeSync</span>
                </span>
                <nav className='pt-5 mx-3  '>
                    <NavLink code="OSAS" navLink = "/osas/dashboard" iconName="dashboard" navName="Dashboard"/>
                    <NavLink code="OSAS" navLink = "/osas/college" iconName="account_balance" navName="College"/>
                    <NavLink code="OSAS" navLink = "/osas/program" iconName="school" navName="Program"/>
                    <NavLink code="OSAS" navLink = "/osas/organisation" iconName="graph_2" navName="Organisation"/>
                    <NavLink code="OSAS" navLink = "/osas/student" iconName="person" navName="Student"/>
                    <NavLink code="OSAS" navLink = "/osas/account" iconName="person_add" navName="Account"/>
                    <NavLink code="OSAS" navLink = "/osas/setting" iconName="settings" navName="Settings"/>
                </nav>
                <div className="absolute bottom-2 w-full px-3 lg:hidden block">
                    <NavLink code="OSAS" navLink = "#" iconName="moon_stars" navName="Dark Mode"  />
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