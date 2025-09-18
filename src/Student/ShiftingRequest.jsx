import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import ShiftingStatusCard from "../student_components/ShiftingStatusCard.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import SendShift from "../student_components/SendShift.jsx";
import React, {useRef, useState, useEffect} from 'react';
import useAnimatedToggle from "../hooks/useAnimatedToggle.js";
import it from '../assets/it.png';


function ShiftingRequest(){
/* ------------------------- Animated States ----------------------------- */
    const sendShift = useAnimatedToggle();
    const shiftRef = useRef(null);

    const [currentUserData, setCurrentUserData] = useState([]);
            
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

   
       
    return(
        <>
        {sendShift.isVisible &&(
            <>   
            <div className="fixed inset-0 bg-[#00000062] z-40 pointer-events-auto">
                {/* Overlay */}
            </div>
                <SendShift ref={shiftRef} onAnimationEnd={sendShift.handleEnd} onClose={() => sendShift.setAnimation("fade-out")} animate={sendShift.animation} />  

            </>

        )
            
        }
        <Header code={currentUserData?.department_code} titleCouncil = {currentUserData?.organization_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
             <div className="mt-[110px] lg:ml-70 flex justify-between px-6">
                <h2 className="text-2xl font-semibold ">Shifting Request</h2>
                <button onClick={sendShift.toggle}  className="w-45 h-10 rounded-lg shadow-[2px_2px_3px_grey] text-white bg-[#621668] border-1 border-[#621668]"><i className="fa-solid fa-plus mr-2"></i>Send Shifting Letter</button>
            </div>
            <div className="lg:ml-70 flex gap-6 px-6 flex-wrap mt-6">
                <ShiftingStatusCard status="Approved"/>
                <ShiftingStatusCard status="Pending"/>
                <ShiftingStatusCard status="Approved"/>
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar  code={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default ShiftingRequest;