import {Link} from 'react-router-dom';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableAttendance from '../other_components/TableAttendance.jsx';
import AddEventListCard from '../other_components/AddEventListCard.jsx';
import UpdateEventCard from '../other_components/UpdateEventCard.jsx';
import AttendanceCard from '../treasurer_components/AttendanceCard.jsx';
import ScanAttendance from '../treasurer_components/ScanAttendance.jsx';
import UpdateAttendanceCard from '../treasurer_components/UpdateAttendanceCard.jsx';
import React, {useRef,useState,useEffect} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import EfeeViolet from '../assets/violetlogo.png'
import "../animate.css"

function Attendance(){
/* ------------------------- animation ----------------------------- */
const animateR = "right-In";
const animateL = "left-In";

/* ------------------------- Animated States ----------------------------- */
    const scanAttendee = useAnimatedToggle();
    const updateEvent = useAnimatedToggle();
    const addAttendee = useAnimatedToggle();
    const updateAttendee = useAnimatedToggle();

    const scanRef = useRef(null);
    const updateRef = useRef(null);
    const attendeeRef = useRef(null);
    const updateAttendeeRef = useRef(null);

    const [selectedAttendee, setSelectedAttendee] = useState(null);

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

        
        {updateEvent.isVisible &&(
            <>
                {/* Update Event */}
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <UpdateEventCard ref={updateRef} onAnimationEnd={updateEvent.handleEnd} animate={updateEvent.animation} onClose={() => updateEvent.setAnimation("fade-out")} />

                </div>
            </>
        )
            
        }
       
        {updateAttendee.isVisible &&(
            <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                {/* Overlay */}
                <UpdateAttendanceCard ref={updateAttendeeRef} data={selectedAttendee} onAnimationEnd={updateAttendee.handleEnd} animate={updateAttendee.animation} onClose={() => updateAttendee.setAnimation("fade-out")} />
            </div>

        )

        }
        {scanAttendee.isVisible &&(
            <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
            <ScanAttendance ref={scanRef} onAnimationEnd={scanAttendee.handleEnd} animate={scanAttendee.animation} onClose={() => scanAttendee.setAnimation("fade-out")}/>
            </div>
            

        )

        }
            <CITHeader code={currentUserData?.department_code} titleCouncil = {currentUserData?.organization_name} abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  justify-between">
                    <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Manage Attendance</h2>
                    <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                    <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4   border-[#8A2791] block' type="text" placeholder='Search Student' />
                    </div>
                </div>
                 <div className=' w-[100%] mt-3 '>
                    <div className={`lg:ml-70 ${animateL} flex lg:justify-start md:justify-start font-[family-name:Arial]  justify-center gap-2.5`}>
                         <select className='bg-white lg:w-25  w-20 text-xs transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white cursor-pointer border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Sort by</option>
                            <option value="">hey</option>

                        </select>
                         <select className='bg-white lg:w-25 w-20 text-xs transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white cursor-pointer border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Year</option>
                            <option value="">hey</option>

                        </select>
                          <select className='bg-white lg:w-25 w-20 text-xs transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white cursor-pointer border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Section</option>
                            <option value="">hey</option>

                        </select>
                         <button className='bg-white lg:w-25 w-20 transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white text-xs cursor-pointer flex justify-center gap-1 border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'><i className="fa-solid fa-print"></i>Print</button>
                    </div>
                    <div className="lg:ml-70 text-[font-family:Arial] lg:text-sm text-xs mt-3 flex justify-end">
                        <Link to="/org/eventlist">
                            <button className='bg-[#621668] text-center hover:bg-white hover:border-[#621668] hover:text-[#621668] hover:scale-102 hover:shadow-[2px_2px_3px_grey] duration-200 transition py-1 rounded-md cursor-pointer px-3 text-white border-1 border-[#804d84]'>Back to Eventlist</button>
                        </Link>
                    </div>
                <TableAttendance  updateEvent={updateEvent.toggle} scanAttendee={scanAttendee.toggle} />

                </div>
            </div>
            <div className='hidden lg:block'>
                <CITSidebar eFee={EfeeViolet}/>
            </div>
        </>
    );
}
export default Attendance;