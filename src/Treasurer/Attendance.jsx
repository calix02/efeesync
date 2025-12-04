import { Link } from 'react-router-dom';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableAttendance from '../other_components/TableAttendance.jsx';
import AddEventListCard from '../other_components/AddEventListCard.jsx';
import UpdateEventCard from '../other_components/UpdateEventCard.jsx';
import AttendanceCard from '../treasurer_components/AttendanceCard.jsx';
import ScanAttendance from '../treasurer_components/ScanAttendance.jsx';
import UpdateAttendanceCard from '../treasurer_components/UpdateAttendanceCard.jsx';
import AttendanceTable from '../treasurer_components/AttendanceTable.jsx';
import React, { useRef, useState, useEffect } from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import EfeeViolet from '../assets/violetlogo.png';
import { confirmAlert, successAlert, errorAlert, okAlert } from "../utils/alert.js";
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonTable from '../skeletons/SkeletonTable.jsx';
import SkeletonSidebar from '../skeletons/SkeletonSidebar.jsx';
import "../animate.css";

function Attendance() {
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

  const [showSelectedEvents, setShowSelectedEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState("");
  const [searchValueEvents, setSearchValueEvents] = useState("");
  const [searchValueStudents, setSearchValueStudents] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const [eventAttendanceData, setEventAttendanceData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(() => {
    const saved = localStorage.getItem("currentUserData");
    return saved ? JSON.parse(saved) : null;
  });

  const fetchCurrentUser = async () => {
    setLoadingUser(true);
    try {
      const res = await fetch("/api/users/current", { credentials: "include" });
      const response = await res.json();
      if (response.status === "success") {
        setCurrentUserData(response.data);
        localStorage.setItem("currentUserData", JSON.stringify(response.data));
      }
    } catch (err) {
      errorAlert("Fetch Failed");
    }finally{
      setLoadingUser(false);
    } 
  };

  const fetchEventAttendance = async (page = 1, search = "", org_code = currentUserData?.organization_code) => {
    setLoadingEvent(true);
    try {
      const res = await fetch(`/api/organizations/code/${org_code}/events?type=attendance&page=${page}&search=${search}`, {
        credentials: "include"
      });
      const response = await res.json();
      if (response.status === "success") {
        setEventAttendanceData(response.data);
      }
    } catch (err) {
      errorAlert("Fetch Failed");
    }finally{
      setLoadingEvent(false);
    } 
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserData) fetchEventAttendance();
  }, [currentUserData]);

  useEffect(() => {
    if (selectedEvent && selectedEvent.attendance.length > 0) {
      setSelectedAttendanceDate(selectedEvent.attendance[0].event_attend_date);
    }
  }, [selectedEvent]);

  const clickedView = (event) => {
    setSelectedEvent(event);
    setShowSelectedEvents(true);
  };

  const formatDateStr = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const [paginateForStudents, setPaginateForStudents] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 1
  });

  const [debounceTimer, setDebounceTimer] = useState(null);
  function debounce(callback, delay = 500) {
    clearTimeout(debounceTimer);
    setDebounceTimer(setTimeout(callback, delay));
  }

  const searchEventAttendance = (search) => {
    setSearchValueEvents(search);
    debounce(() => {
      fetchEventAttendance(1, search);
    }, 500);
  };

  const [studentAttendees, setStudentAttendees] = useState([]);
  const [attendanceKeys, setAttendanceKeys] = useState([]);

  const fetchStudentAttendees = async (page = 1, search = "") => {
    if (!selectedAttendanceDate) return;
    try {
      const res = await fetch(
        `/api/events/${selectedEvent.event_id}/attendance/made/date/${selectedAttendanceDate}?page=${page}&search=${search}`,
        { credentials: "include" }
      );
      const response = await res.json();
      if (response.status === "success") {
        setPaginateForStudents(response.meta);
        setStudentAttendees(response.data);
        if (response.data.length > 0) {
          setAttendanceKeys(Object.keys(response.data[0].attendance));
        }
      }
    } catch (err) {
      errorAlert("Fetch Failed " + err);
    } finally {
      setLoadingStudents(false);
    }
  };

  const searchStudentAttendees = (search) => {
    setSearchValueStudents(search);
    debounce(() => {
      fetchStudentAttendees(1, search);
    }, 500);
  };

  const colors = {
    CITSC: "text-[#621668]",
    CESC: "text-[#020180] ",
    CCSC: "text-[#660A0A] ",
    COTSC: "text-[#847714] ",
    SCEAP: "text-[#6F3306] ",
    SSC: " text-[#174515] ",
  };
  const color = colors[currentUserData?.organization_code] || "border-[#174515] text-[#174515] bg-[#174515]";

  const hoverColors = {
    CITSC: "hover:bg-[#621668] ",
    CESC: " hover:bg-[#020180] ",
    CCSC: " hover:bg-[#660A0A] ",
    COTSC: "hover:bg-[#847714] ",
    SCEAP: "hover:bg-[#6F3306] ",
    SSC: "hover:bg-[#174515] "
  };
  const hoverColor = hoverColors[currentUserData?.organization_code] || "hover:text-[#174515]";

  return (
    <>
      {/* Update Event Modal */}
      {updateEvent.isVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
          <UpdateEventCard ref={updateRef} onAnimationEnd={updateEvent.handleEnd} animate={updateEvent.animation} onClose={() => updateEvent.setAnimation("fade-out")} />
        </div>
      )}

      {/* Update Attendee Modal */}
      {updateAttendee.isVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
          <UpdateAttendanceCard ref={updateAttendeeRef} data={selectedAttendee} onAnimationEnd={updateAttendee.handleEnd} animate={updateAttendee.animation} onClose={() => updateAttendee.setAnimation("fade-out")} />
        </div>
      )}

      {/* Scan Attendance Modal */}
      {scanAttendee.isVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
          <ScanAttendance ref={scanRef} fetchStudentAttendees={fetchStudentAttendees} selectedEvent={selectedEvent} selectedEventDate={selectedAttendanceDate} code={currentUserData?.organization_code} onAnimationEnd={scanAttendee.handleEnd} animate={scanAttendee.animation} onClose={() => scanAttendee.setAnimation("fade-out")} />
        </div>
      )}

      {/* Header */}
        {loadingUser ? ( 
          <SkeletonHeader/>
        ) : (
          <CITHeader
            code={currentUserData?.organization_code}
            titleCouncil={currentUserData?.organization_name}
            abb="CIT Council"
          />
        )}
      {/* Page Content */}
      <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
        {!showSelectedEvents && (
              <>
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex justify-between">
                  <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Manage Attendance</h2>
                  <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                    <input
                      className="lg:w-120 px-8 h-12 text-sm relative w-[100%] p-1.5 bg-white rounded-md border border-[#e0e0e0] shadow-[2px_2px_1px_gray] lg:mt-0 md:mt-0 mt-4 block"
                      type="text"
                      placeholder="Search Events"
                      onKeyUp={(e) => searchEventAttendance(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-[100%] mt-3">
                  <div className="lg:ml-70 text-[font-family:Arial] lg:text-sm text-xs mt-3 flex justify-end">
                    <Link to="/org/eventlist">
                      <button className={`${color} ${hoverColor} text-center hover:scale-107 lg:text-sm text-xs font-semibold hover:text-white font-poppins  duration-200 transition h-8 rounded-2xl shadow-[2px_2px_1px_grey] border-[#e0e0e0] cursor-pointer px-3 bg-white border-1`}>
                        Back to Eventlist
                      </button>
                    </Link>
                  </div>
                  {loadingEvent ? (
                    <SkeletonTable/>
                  ) :(
                    <TableAttendance
                      formatDateStr={formatDateStr}
                      events={eventAttendanceData}
                      searchValueEvents={searchValueEvents}
                      code={currentUserData?.organization_code}
                      updateEvent={updateEvent.toggle}
                      view={(row) => clickedView(row)}
                    />
                  )}
                </div>
              </>
        )}

        {showSelectedEvents && (
          <>
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex justify-between">
                  <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">
                    {selectedEvent?.event_name || "Event Details"}
                  </h2>
                  <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                    <input
                      className="lg:w-120 text-sm relative w-[100%] h-12 px-8 shadow-[2px_2px_1px_gray] bg-white rounded-2xl border  lg:mt-0 md:mt-0 mt-4 border-[#e0e0e0] block"
                      type="text"
                      onKeyUp={(e) => searchStudentAttendees(e.target.value)}
                      placeholder="Search Student Attendees"
                    />

                  </div>
                </div>
                <div className="lg:ml-70 flex justify-between mt-3">
                  <span className="flex gap-2 font-poppins items-center">
                    <label className=" text-sm  font-medium">Select Date:</label>
                    <select
                      value={selectedAttendanceDate}
                      className="h-10 px-3 border-1 lg:text-sm text-xs  border-[#e0e0e0] shadow-[2px_2px_1px_gray] cursor-pointer rounded-2xl bg-white"
                      onChange={(e) => setSelectedAttendanceDate(e.target.value)}
                    >
                      {selectedEvent.attendance.map((day) => (
                        <option key={day.event_attend_date} value={day.event_attend_date}>
                          {selectedEvent.attendance.length > 1 ? "Day " + day.day_num + ": " : ""}
                          {formatDateStr(day.event_attend_date)}
                        </option>
                      ))}
                    </select>
                  </span>
                  <button
                    className={`${color} ${hoverColor} px-6 h-8 rounded-2xl shadow-[2px_2px_1px_gray] hover:text-white cursor-pointer hover:scale-107 bg-white border-1 font-poppins lg:text-sm text-xs font-semibold  hover:shadow-[2px_2px_3px_grey] transition duration-200`}
                    onClick={() => setShowSelectedEvents(false)}
                  >
                    Back to Event
                  </button>
                </div>
                {loadingStudents ? (
                  <SkeletonTable/>
                ) :(
                <AttendanceTable
                  searchValueStudents={searchValueStudents}
                  code={currentUserData?.organization_code}
                  paginate={paginateForStudents}
                  studentAttendees={studentAttendees}
                  setStudentAttendees={setStudentAttendees}
                  attendanceKeys={attendanceKeys}
                  fetchStudentAttendees={fetchStudentAttendees}
                  selectedEvent={selectedEvent}
                  selectedEventDate={selectedAttendanceDate}
                  scanAttendee={scanAttendee.toggle}
                />
                )}
          </>
        )}
      </div>

      {/* Sidebar */}
      {loadingUser ? ( 
      <div className='lg:block hidden'>
         <SkeletonSidebar />
      </div>)

      : (
        <div className="hidden lg:block">
          <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.organization_code} />
        </div>
      )}
    </>
  );
}

export default Attendance;
