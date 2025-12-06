import CITHeader from '../other_components/Header_Council.jsx';
import { Navigate } from 'react-router-dom';
import CITSidebar from './Sidebar.jsx';
import TableEventList from '../other_components/TableEventList.jsx';
import EventDetails from '../treasurer_components/EventDetails.jsx';
import AddEventListCard from '../other_components/AddEventListCard.jsx';
import UpdateEventCard from '../other_components/UpdateEventCard.jsx';
import React, { useRef, useState, useEffect } from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import SkeletonTable from '../skeletons/SkeletonTable.jsx';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonSideBar from '../skeletons/SkeletonSidebar.jsx';
import SkeletonModal from '../skeletons/SkeletonModal.jsx';
import EfeeViolet from '../assets/violetlogo.png';
import "../animate.css";
import { errorAlert } from "../utils/alert.js";

function CITEventList() {
    document.title="Event List";
    const animateR = "right-In";
    const animateL = "left-In";

    const addEvent = useAnimatedToggle();
    const updateEvent = useAnimatedToggle();
    const viewEventDetails = useAnimatedToggle();

    const addRef = useRef(null);
    const updateRef = useRef(null);
    const viewDetailsRef = useRef(null);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedType, setSelectedType] = useState("");
    const [searchValue, setSearchValue] = useState("");

    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingEvent, setLoadingEvents] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);

    const [currentUserData, setCurrentUserData] = useState(() => {
        const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });

    const fetchCurrentUser = async () => {
        try {
            setLoadingUser(true);
            const res = await fetch("/api/users/current", { credentials: "include" });
            const response = await res.json();
            if (response.status === "success") {
                setCurrentUserData(response.data);
                localStorage.setItem("currentUserData", JSON.stringify(response.data));
            }
        } catch (err) {
            //errorAlert("Fetch Failed");
        } finally {
            setLoadingUser(false);
        }
    };

    const [eventsOrg, setEventsOrg] = useState([]);

    const formatDateStr = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const fetchEvents = async (
        page = 1,
        search = "",
        organizationId = currentUserData?.organization_id
    ) => {
        if (!organizationId) {
            setLoadingEvents(false);
            return;
        }

        setLoadingEvents(true);

        try {
            const res = await fetch(
                `/api/organizations/${organizationId}/events?page=${page}&search=${encodeURIComponent(search)}`,
                { credentials: "include" }
            );

            const response = await res.json();

            if (response.status === "success") {
                setEventsOrg(response.data);
                setPaginate(response.meta);
            }
        } catch (err) {
            console.error("Fetch Failed");
        } finally {
            setLoadingEvents(false);
        }
    };

    const debounceRef = useRef(null);
    const debounce = (callback, delay = 500) => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(callback, delay);
    };

    const searchEvents = (value) => {
        setSearchValue(value);
        debounce(() => {
            setCurrentPage(1);
            fetchEvents(1, value, currentUserData?.organization_id);
        }, 500);
    };

    const [paginate, setPaginate] = useState({
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 1
    });

    const handlePageChange = (page) => {
        if (page < 1 || page > paginate.total_pages) return;
        setCurrentPage(page);
        fetchEvents(page, searchValue, currentUserData?.organization_id);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUserData) {
            fetchEvents(1, searchValue, currentUserData?.organization_id);
        }
    }, [currentUserData]);

    const hoverColors = {
        CITSC: "hover:bg-[#621668]",
        CESC: "hover:bg-[#020180]",
        CCSC: "hover:bg-[#660A0A]",
        COTSC: "hover:bg-[#847714]",
        SCEAP: "hover:bg-[#6F3306]",
        SSC: "hover:bg-[#174515]"
    };

    const hoverColor = hoverColors[currentUserData?.organization_code] || "hover:bg-[#174515]";

    return (
        <>
            {addEvent.isVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] z-50">
                    <AddEventListCard
                        code={currentUserData?.organization_code}
                        reloadEvents={fetchEvents}
                        currentUserData={currentUserData}
                        ref={addRef}
                        onAnimationEnd={addEvent.handleEnd}
                        animate={addEvent.animation}
                        onClose={() => addEvent.setAnimation("fade-out")}
                    />
                </div>
            )}

            {updateEvent.isVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] z-50">
                    {loadingEvent ? (
                        <SkeletonModal />
                    ) : (
                        <UpdateEventCard
                            code={currentUserData?.organization_code}
                            reloadEvents={fetchEvents}
                            currentUserData={currentUserData}
                            ref={updateRef}
                            data={selectedEvent}
                            onAnimationEnd={updateEvent.handleEnd}
                            animate={updateEvent.animation}
                            onClose={() => updateEvent.setAnimation("fade-out")}
                        />
                    )}
                </div>
            )}

            {viewEventDetails.isVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] z-50">
                    <EventDetails
                        code={currentUserData?.department_code}
                        reloadEvents={fetchEvents}
                        formatDateStr={formatDateStr}
                        ref={viewDetailsRef}
                        data={selectedEvent}
                        onAnimationEnd={viewEventDetails.handleEnd}
                        animate={viewEventDetails.animation}
                        onClose={() => viewEventDetails.setAnimation("fade-out")}
                    />
                </div>
            )}

            {selectedType === "Event Contribution" && <Navigate to="/org/eventcontribution" replace />}
            {selectedType === "Event Attendance" && <Navigate to="/org/attendance" replace />}

            {loadingUser ? (
                <SkeletonHeader />
            ) : (
                <CITHeader
                    code={currentUserData?.organization_code}
                    titleCouncil={currentUserData?.organization_name}
                    abb="CIT Council"
                />
            )}

            <div className="w-screen hide-scrollbar h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex md:justify-between lg:justify-between">
                    <h2 className="text-2xl font-semibold">Manage Events</h2>

                    <div className={`flex ${animateR} items-center`}>
                        <input
                            className="lg:w-120 md:w-85 w-full h-12 bg-white text-sm rounded-xl shadow px-8 border"
                            type="text"
                            placeholder="Search Events"
                            onKeyUp={(e) => searchEvents(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full mt-3">
                    <div className={`lg:ml-70 ${animateL} flex gap-2.5`}>
                        <select
                            className={`bg-white ${hoverColor} lg:w-60 w-50 lg:text-sm text-xs  font-poppins cursor-pointer hover:text-white font-semibold border h-10 shadow rounded-2xl text-center`}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="">-- Event Type --</option>
                            <option value="Event Contribution">Event Contribution</option>
                            <option value="Event Attendance">Event Attendance</option>
                        </select>
                    </div>

                    {loadingEvent ? (
                        <SkeletonTable />
                    ) : (
                        <TableEventList
                            paginate={paginate}
                            onPageChange={handlePageChange}
                            code={currentUserData?.organization_code}
                            formatDateStr={formatDateStr}
                            events={eventsOrg}
                            reloadEvents={fetchEvents}
                            addEvent={addEvent.toggle}
                            view={(row) => {
                                viewEventDetails.toggle();
                                setSelectedEvent(row);
                            }}
                            updateEvent={(row) => {
                                updateEvent.toggle();
                                setSelectedEvent(row);
                            }}
                        />
                    )}
                </div>
            </div>

            <div className="hidden lg:block">
                {loadingUser ? (
                    <SkeletonSideBar />
                ) : (
                    <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.organization_code} />
                )}
            </div>
        </>
    );
}

export default CITEventList;
