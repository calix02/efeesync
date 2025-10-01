import React, { useRef, useState, useEffect } from 'react';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableExcuse from '../treasurer_components/TableExcuse.jsx';
import Letter from '../treasurer_components/Letter.jsx';
import "../animate.css";
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
function CITExcuse() {
    const animateR = "right-In";
    const animateL = "left-In";

    const [currentUserData, setCurrentUserData] = useState([]);

    const viewLetter = useAnimatedToggle();

    const viewLetterRef  = useRef(null);
        
        const fetchCurrentUser = async () => {
            try {
                const res = await fetch("/api/users/current", {
                    credentials: "include"
                });
                const response = await res.json();
                if (response.status === "success") {
                    setCurrentUserData(response.data);
                }
            } catch (err) {
                errorAlert("Fetch Failed");
            }
        }
        useEffect(() => {
            fetchCurrentUser();
            console.log(currentUserData);
        }, []);

    const hoverColors = {
            CIT: " hover:bg-[#621668]",
            COE: "hover:bg-[#020180]",
            COC: "hover:bg-[#660A0A]",
            COT: "hover:bg-[#847714]",
            ESAF: "hover:bg-[#6F3306]",
            SSC: "hover:bg-[#174515]"
        };
    const hoverColor = hoverColors[currentUserData?.department_code] || "hover:bg-[#174515]";

    
    return (
        <>
        {viewLetter.isVisible &&(
             <>
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <Letter ref={viewLetterRef} onAnimationEnd={viewLetter.handleEnd} animate={viewLetter.animation} onClose={() => viewLetter.setAnimation("fade-out")} />
                </div>
            </>
        )}

            <CITHeader code={currentUserData?.department_code} titleCouncil={currentUserData?.organization_name} abb="CIT Council" />

            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                    <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Manage Excuse Approval</h2>
                    <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                    <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4 block' type="text" placeholder='Search Student' />
                    </div>
                </div>

               <div className=' w-[100%] mt-3 '>
                    <div className={`lg:ml-70 ${animateL} flex lg:justify-start md:justify-start font-[family-name:Arial]  justify-center gap-2.5`}>
                         <select className={`bg-white ${hoverColor} lg:w-25  w-20 text-xs transition duration-100 hover:scale-105 hover:text-white cursor-pointer border-1  py-1  rounded-md text-center`}  name="" id="">
                            <option value="">Year</option>
                            <option value="">hey</option>
                        </select>
                         <select className={`bg-white ${hoverColor} lg:w-25  w-20 text-xs transition duration-100 hover:scale-105 hover:text-white cursor-pointer border-1  py-1  rounded-md text-center`}  name="" id="">
                            <option value="">Section</option>
                            <option value="">hey</option>
                        </select>
                    </div>
                   
                    <TableExcuse viewLetter={viewLetter.toggle}  code={currentUserData?.department_code} />
                    
                </div>
            </div>

            <div className="hidden lg:block">
                <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.department_code} />
            </div>
        </>
    );
}

export default CITExcuse;
