import CITHeader from '../other_components/Header_Council.jsx';
import {Navigate} from 'react-router-dom';
import CITSidebar from './Sidebar.jsx';
import TableEventList from '../other_components/TableEventList.jsx';
import EventDetails from '../treasurer_components/EventDetails.jsx';
import AddEventListCard from '../other_components/AddEventListCard.jsx';
import UpdateEventCard from '../other_components/UpdateEventCard.jsx';
import Footer from '../other_components/Footer.jsx';
import React, {useRef, useState, useEffect} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import EfeeViolet from '../assets/violetlogo.png';
import "../animate.css";
import { errorAlert } from "../utils/alert.js";

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
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true);

    const [currentUserData, setCurrentUserData] = useState(() => {
        const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });

    const fetchCurrentUser = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/users/current", { credentials: "include" });
            const response = await res.json();
            if (response.status === "success") {
                setCurrentUserData(response.data);
                localStorage.setItem("currentUserData", JSON.stringify(response.data));
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        }
        // do not setLoading(false) here — fetchEvents will clear loading when events arrive
    };

    const [eventsOrg, setEventsOrg] = useState([]);

    const formatDateStr = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
    };

    const fetchEvents = async (organizationId = currentUserData?.organization_id, page = 1, search = "") => {
        if (!organizationId) {
            // if we don't have org id, ensure loading stops to avoid infinite spinner
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`/api/organizations/${organizationId}/events?page=${page}&search=${encodeURIComponent(search)}`, { credentials: "include" });
            const response = await res.json();
            if (response.status === "success") setEventsOrg(response.data);
        } catch (err) {
            console.error("Fetch Failed");
        } finally {
            setLoading(false);
        }
    };

    const [debounceTimer, setDebounceTimer] = useState(null);
    const debounce = (callback, delay=500)  => {
        clearTimeout(debounceTimer);
        setDebounceTimer(setTimeout(callback, delay));
    };

    const searchEvents = (search) => {
        setSearchValue(search);
        setLoading(true);
        debounce(() => {
            fetchEvents(currentUserData?.organization_id, 1, search);
        }, 500);
    };

    const [paginate, setPaginate] = useState({
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 1
    });

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUserData) fetchEvents(currentUserData.organization_id);
    }, [currentUserData]);

    const hoverColors = {
        CIT: " hover:bg-[#621668]",
        COE: "hover:bg-[#020180]",
        COC: "hover:bg-[#660A0A]",
        COT: "hover:bg-[#847714]",
        ESAF: "hover:bg-[#6F3306]",
        SSC: "hover:bg-[#174515]"
    };
    const hoverColor = hoverColors[currentUserData?.department_code] || "hover:bg-[#174515]";

    /* ------------------------- Skeleton Loader ----------------------------- */
    const SkeletonRow = () => (
        <div className="w-full flex items-center justify-between gap-4 p-3 border-b border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
    );

    const SkeletonLoader = () => (
        <div className="px-4 lg:ml-70 mt-6 space-y-4">
            <div className="h-12 bg-gray-300 rounded-md w-1/3 animate-pulse"></div>
            <div className="h-10 bg-gray-300 rounded-md w-full animate-pulse"></div>
            <div className="flex gap-2">
                <div className="h-8 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 mt-4 overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-gray-50">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
                <div className="space-y-2 p-2">
                    {[...Array(6)].map((_, i) => <SkeletonRow key={i} />)}
                </div>
            </div>
        </div>
    );

    return(
        <>
            {addEvent.isVisible &&(
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    <AddEventListCard code={currentUserData?.department_code} reloadEvents={fetchEvents} currentUserData={currentUserData} ref={addRef} addFee={addFee.toggle} onAnimationEnd={addEvent.handleEnd} animate={addEvent.animation} onClose={() => addEvent.setAnimation("fade-out")} />
                </div>
            )}

            {updateEvent.isVisible &&(
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    <UpdateEventCard code={currentUserData?.department_code} reloadEvents={fetchEvents} currentUserData={currentUserData} ref={updateRef} data={selectedEvent} onAnimationEnd={updateEvent.handleEnd} animate={updateEvent.animation} onClose={() => updateEvent.setAnimation("fade-out")} />
                </div>
            )}

            {viewEventDetails.isVisible &&(
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                    <EventDetails code={currentUserData?.department_code} reloadEvents={fetchEvents} formatDateStr={formatDateStr} ref={viewDetailsRef} data={selectedEvent} onAnimationEnd={viewEventDetails.handleEnd} animate={viewEventDetails.animation} onClose={() => viewEventDetails.setAnimation("fade-out")}/>
                </div>
            )}

            {selectedType === "Event Contribution" ? <Navigate to="/org/eventcontribution" replace/> : null}
            {selectedType === "Event Attendance" ? <Navigate to="/org/attendance" replace/> : null}

            <CITHeader code={currentUserData?.department_code} titleCouncil={currentUserData?.organization_name} abb="CIT Council" />

            {loading ? (
                <SkeletonLoader />
            ) : (
                <div className="w-screen hide-scrollbar h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                    <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex md:justify-between lg:justify-between">
                        <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Manage Events</h2>
                        <div className={`flex ${animateR} items-center lg:px-0 md:px-0`}>
                            <input className='lg:w-85 md:w-85 w-[100%] border-black p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4 block' type="text" onKeyUp={(e) => { searchEvents(e.target.value) }} placeholder='Search Events' />
                        </div>
                    </div>
                    <div className=' w-[100%] mt-3'>
                        <div className={`lg:ml-70 ${animateL} flex lg:justify-start md:justify-start font-[family-name:Arial] justify-start gap-2.5`}>
                            <select title="Select Event Type" className={`bg-white ${hoverColor} w-35 text-xs transition duration-100 hover:scale-100 hover:text-white cursor-pointer border-1 py-1.5 rounded-sm text-center`} value={selectedType} onChange={(e)=>setSelectedType(e.target.value)}  name="" id="">
                                <option value="">Event Type</option>
                                <option value="Event Contribution">Event Contribution</option>
                                <option value="Event Attendance">Event Attendance</option>
                            </select>  
                        </div>

                        <TableEventList paginate={paginate} code={currentUserData?.department_code} formatDateStr={formatDateStr} events={eventsOrg} reloadEvents={fetchEvents} addEvent={addEvent.toggle} 
                        view={(row) =>{
                            viewEventDetails.toggle();
                            setSelectedEvent(row);
                        }} updateEvent={(row) =>{
                            updateEvent.toggle();
                            setSelectedEvent(row);
                        }}/>
                    </div>
                </div>
            )}

            <div className='hidden lg:block'>
                <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.department_code} />
            </div>
        </>
    );
}
export default CITEventList;