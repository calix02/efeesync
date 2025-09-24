import CITHeader from '../other_components/Header_Council.jsx';
import {Navigate} from 'react-router-dom';
import CITSidebar from './Sidebar.jsx';
import TableEventList from '../other_components/TableEventList.jsx';
import EventDetails from '../treasurer_components/EventDetails.jsx';
import AddEventListCard from '../other_components/AddEventListCard.jsx';
import UpdateEventCard from '../other_components/UpdateEventCard.jsx';
import React, {useRef, useState, useEffect} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import EfeeViolet from '../assets/violetlogo.png'
import "../animate.css";

function CITEventList(){
/* --------------------------------- animation -------------------------------- */
    const animateR = "right-In";
    const animateL = "left-In";

/* ------------------------- Animated States ----------------------------- */
    const addEvent = useAnimatedToggle();
    const updateEvent = useAnimatedToggle();
    const viewEventDetails = useAnimatedToggle();
    const addFee = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);
    const viewDetailsRef = useRef(null);
    const addFeeRef = useRef(null);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedType, setSelectedType] = useState("");

    const [currentUserData, setCurrentUserData] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    
    const fetchCurrentUser = async () => {
        try {
            const res = await fetch("/api/users/current", { credentials: "include" });
            const response = await res.json();

            if (response.status === "success") {
                const user = response.data;
                setCurrentUserData(user);
                fetchEvents(user.organization_id);
            }
        } catch (err) {
            console.error("Fetch Failed: " + err);
        }
    };

    const [eventsOrg, setEventsOrg] = useState([]);

    const formatDateStr = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
    }

    const fetchEvents = async (organizationId=currentUserData.organization_id, page = 1, search = "") => {
        if (!organizationId) return;
        try {
            const res = await fetch(`/api/organizations/${organizationId}/events?page=${page}&search=${search}`, {
            credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
            setEventsOrg(response.data);
            }
        } catch (err) {
            console.error("Fetch Failed");
        }
    };

    const [debounceTimer, setDebounceTimer] = useState(null);
    
    const debounce = (callback, delay=500)  => {
        clearTimeout(debounceTimer);
        setDebounceTimer(setTimeout(callback, delay));
    }

    const searchEvents = (search) => {
        setSearchValue(search);
        debounce(() => {
            fetchEvents(currentUserData.organization_id, 1, search);
        }, 500);
    };
    
    useEffect(() => {
        fetchCurrentUser();
    }, []);
 
    return(
        <>
         {addEvent.isVisible &&(
            <>
                    {/* Add Event */}
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <AddEventListCard reloadEvents={fetchEvents} currentUserData={currentUserData} ref={addRef} addFee={addFee.toggle} onAnimationEnd={addEvent.handleEnd} animate={addEvent.animation} onClose={() => addEvent.setAnimation("fade-out")} />
                </div>
            </>
         )
            
        }
        {updateEvent.isVisible &&(
            <>
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <UpdateEventCard reloadEvents={fetchEvents} currentUserData={currentUserData} ref={updateRef} data={selectedEvent} onAnimationEnd={updateEvent.handleEnd} animate={updateEvent.animation} onClose={() => updateEvent.setAnimation("fade-out")} />
                </div>
            </>
        )
            
        }
        {viewEventDetails.isVisible &&(
            <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                <EventDetails reloadEvents={fetchEvents} formatDateStr={formatDateStr} ref={viewDetailsRef} data={selectedEvent} onAnimationEnd={viewEventDetails.handleEnd} animate={viewEventDetails.animation} onClose={() => viewEventDetails.setAnimation("fade-out")}/>
            </div>
            
        )}
        {selectedType === "Event Contribution" ?(
            <Navigate to="/org/eventcontribution" replace/>
        ):
        selectedType === "Event Attendance" ?(
            <Navigate to="/org/attendance" replace/> 
        ): null}
    
            <CITHeader code={currentUserData?.department_code} titleCouncil = {currentUserData?.organization_name} abb="CIT Council" />
             <div className="w-screen hide-scrollbar h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                    <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Manage Events</h2>
                    <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                    <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4   border-[#8A2791] block' type="text" onKeyUp={(e) => { searchEvents(e.target.value) }} placeholder='Search Events' />
                    </div>
                </div>
                <div className=' w-[100%] mt-3 '>
                    <div className={`lg:ml-70 ${animateL} flex lg:justify-start md:justify-start font-[family-name:Arial]  justify-start gap-2.5`}>
                         <select title="Select Event Type" className='bg-white lg:w-25 w-20 text-xs transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white cursor-pointer border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center' value={selectedType} onChange={(e)=>setSelectedType(e.target.value)}  name="" id="">
                            <option value="">Event Type</option>
                            <option value="Event Contribution">Event Contribution</option>
                            <option value="Event Attendance">Event Attendance</option>
                        </select>  
                        
                        {/*<select className='bg-white lg:w-25 w-20 text-xs transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white cursor-pointer border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  title='Sort by Date' name="" id="">
                            <option value="">Date</option>
                            <option value="">hey</option>
                        </select>
                          <select title='Sort by Target Year' className='bg-white lg:w-25 w-20 text-xs transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white cursor-pointer border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
                            <option value="">Year</option>
                            <option value="">hey</option>
                        </select>
                        */}
                        <button title='Print Event List' onClick={()=>{window.print()}} className='bg-white lg:w-25 w-20 transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white text-xs cursor-pointer flex justify-center gap-1 border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'><i className="fa-solid fa-print"></i>Print</button>
                        
                    </div>

                <TableEventList code={currentUserData?.department_code} formatDateStr={formatDateStr} events={eventsOrg} reloadEvents={fetchEvents} addEvent={addEvent.toggle} 
                view={(row) =>{
                    viewEventDetails.toggle();
                    setSelectedEvent(row);
                }} updateEvent={(row) =>{
                    updateEvent.toggle();
                    setSelectedEvent(row);
                }}/>
                </div>
            </div>
            <div className='hidden lg:block'>
                <CITSidebar code={currentUserData?.department_code} />
            </div>
        </>
       

    );
}
export default CITEventList;