import {Link} from 'react-router-dom';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableAttendance from '../other_components/TableAttendance.jsx';
import AddEventListCard from '../other_components/AddEventListCard.jsx';
import UpdateEventCard from '../other_components/UpdateEventCard.jsx';
import AttendanceCard from '../treasurer_components/AttendanceCard.jsx';
import ScanAttendance from '../treasurer_components/ScanAttendance.jsx';
import UpdateAttendanceCard from '../treasurer_components/UpdateAttendanceCard.jsx';
import AttendanceTable from '../treasurer_components/AttendanceTable.jsx';
import React, {useRef,useState,useEffect} from 'react';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import EfeeViolet from '../assets/violetlogo.png'
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";
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

    const [showSelectedEvents, setShowSelectedEvents] = useState(false);
    
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedAttendee, setSelectedAttendee] = useState(null);
    const [selectedAttendanceDate, setSelectedAttendanceDate] = useState("");
    const [searchValue, setSearchValue] = useState("");
    // const [searchValueForAtt, setSearchValueForAtt] = useState("");

    const [currentUserData, setCurrentUserData] = useState([]);
        
    const [eventAttendanceData, setEventAttendanceData] = useState([]);
    
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
      };

      const fetchEventAttendance =  async (page=1, search="", org_code=currentUserData?.organization_code) => {
        const anotherRes = await fetch(`/api/organizations/code/${org_code}/events?type=attendance&page=${page}&search=${search}`, {
              credentials: "include"
            });
            const anotherResponse = await anotherRes.json();
            if (anotherResponse.status === "success") {
              setEventAttendanceData(anotherResponse.data);
            }
      }
    
    useEffect(() => {
        fetchCurrentUser();
        if (selectedEvent && selectedEvent.attendance.length > 0) {
            setSelectedAttendanceDate(selectedEvent.attendance[0].event_attend_date);
        }
    }, [selectedEvent]);

    useEffect(()=> {
        fetchEventAttendance();
    }, [currentUserData]);

    const clickedView = (event) => {
        setSelectedEvent(event);
        setShowSelectedEvents(true);
    };

    const formatDateStr = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
    }

    const [paginateForStudents, setPaginateForStudents] = useState({
            page: 1,
            per_page: 10,
            total: 0,
            total_pages: 1
        });

        const [debounceTimer, setDebounceTimer] = useState(null);
        
        function debounce(callback, delay=500) {
            clearTimeout(debounceTimer);
            setDebounceTimer(setTimeout(callback, delay));
        }
    
        const searchEventAttendance = (search) => {
            setSearchValue(search);
            debounce(() => {
                fetchEventAttendance(1, search);
            }, 500);
        };
    
      const [studentAttendees, setStudentAttendees] = useState([]);
      const [attendanceKeys, setAttendanceKeys] = useState([]);
    
      const fetchStudentAttendees = async (page=1, search="") => {
        if (!selectedAttendanceDate) return;
        try {
          const res = await fetch(`/api/events/${selectedEvent.event_id}/attendance/made/date/${selectedAttendanceDate}?page=${page}&search=${search}`, {
            credentials: "include"
          });
          const response = await res.json();
          if (response.status === "success") {
            setPaginateForStudents(response.meta);
            setStudentAttendees(response.data);
            if (response.data.length > 0) {
              setAttendanceKeys(Object.keys(response.data[0].attendance));
            }
          }
        } catch (err) {
          errorAlert("Fetch Failed" + err);
        }
      };

      const searchStudentAttendees = (search) => {
            debounce(() => {
                fetchStudentAttendees(1, search);
            }, 500);
        };
    const colors = {
            CIT: "border-[#621668] text-[#621668] bg-[#621668]",
            COE: "border-[#020180] text-[#020180] bg-[#020180]",
            COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COT: "border-[#847714] text-[#847714] bg-[#847714]",
            ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]"
        };
    const color = colors[currentUserData?.department_code] || "border-[#174515] text-[#174515] bg-[#174515]";

    const hoverColors = {
            CIT: "hover:text-[#621668] ",
            COE: " hover:text-[#020180] ",
            COC: " hover:text-[#660A0A] ",
            COT: "hover:text-[#847714] ",
            ESAF: "hover:text-[#6F3306] ",
            SSC: "hover:text-[#174515] "
        };
    const hoverColor = hoverColors[currentUserData?.department_code] || " hover:text-[#174515] ";

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
            <ScanAttendance ref={scanRef} fetchStudentAttendees={fetchStudentAttendees} selectedEvent={selectedEvent} selectedEventDate={selectedAttendanceDate} code={currentUserData?.department_code} onAnimationEnd={scanAttendee.handleEnd} animate={scanAttendee.animation} onClose={() => scanAttendee.setAnimation("fade-out")}/>
            </div>
        )

        }
            <CITHeader 
            code={currentUserData?.department_code} 
            titleCouncil = {currentUserData?.organization_name} 
            abb="CIT Council" />
           
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
                {!showSelectedEvents &&(
                <>
                     <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  justify-between">
                        <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Manage Attendance</h2>
                        <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                            <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4   block' type="text" placeholder='Search Events' onKeyUp={(e) => {searchEventAttendance(e.target.value)} } />
                        </div>
                    </div>
                    <div className=' w-[100%] mt-3 '>
                        <div className={`lg:ml-70 ${animateL} flex lg:justify-start md:justify-start font-[family-name:Arial]  justify-center gap-2.5`}>
                            {/*<select className='bg-white lg:w-25  w-20 text-xs transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white cursor-pointer border-1 border-[#8A2791] py-1  text-[#8A2791] rounded-md text-center'  name="" id="">
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
                            */}
                        </div>
                        <div className="lg:ml-70 text-[font-family:Arial] lg:text-sm text-xs mt-3 flex justify-end">
                            <Link to="/org/eventlist">
                                    <button className={` ${color} ${hoverColor} text-center hover:bg-white  hover:scale-102 hover:shadow-[2px_2px_3px_grey] duration-200 transition py-1 rounded-md cursor-pointer px-3 text-white border-1 border-[#804d84`}>Back to Eventlist</button>
                            </Link>
                        </div>
                        <TableAttendance
                            formatDateStr={formatDateStr}
                            events={eventAttendanceData}
                            searchValue={searchValue}
                            code={currentUserData?.department_code}  
                            updateEvent={updateEvent.toggle} 
                            view={(row) => clickedView(row)} />
                        
                    </div>
                </>
                )}
                {showSelectedEvents &&(
                <>
                    <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex justify-between">
                        <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">
                            {selectedEvent?.event_name || "Event Details"}
                        </h2>
                        <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                            <input className="lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4 border-black block"
                            type="text"
                            onKeyUp={(e) => {searchStudentAttendees(e.target.value)} }
                            placeholder="Search Student Attendees"/>
                        </div>
                    </div>
                    <div className="lg:ml-70 flex justify-between mt-3">
                        <span className='flex gap-2 items-center'>
                            <label className='font-[family-name:Arial] text-sm font-medium' htmlFor="">Select Date: </label>
                            <select value={selectedAttendanceDate} name="" className=' py-0.5 px-2 border-1  border-black rounded-md bg-white text-sm' onChange={(e) => {setSelectedAttendanceDate(e.target.value)}}>
                                {selectedEvent.attendance.map((day) => (
                                    <option key={day.event_attend_date} value={day.event_attend_date}>
                                    {selectedEvent.attendance.length>1 ? "Day "+day.day_num+": ": ""} {formatDateStr(day.event_attend_date)}
                                    </option>
                                ))}
                            </select>
                        </span>
                        <button className={`${color} ${hoverColor} px-6 text-white rounded-md cursor-pointer hover:scale-102 hover:bg-white border-1 hover:shadow-[2px_2px_3px_grey] transition duration-200`}
                            onClick={() => setShowSelectedEvents(false)}>
                            Back
                        </button>
                    </div>
                    <AttendanceTable
                        code={currentUserData?.department_code}
                        paginate={paginateForStudents}
                        studentAttendees={studentAttendees}
                        setStudentAttendees={setStudentAttendees}
                        attendanceKeys={attendanceKeys}
                        fetchStudentAttendees={fetchStudentAttendees}
                        selectedEvent={selectedEvent}
                        selectedEventDate={selectedAttendanceDate}
                        scanAttendee={scanAttendee.toggle}
                    />
                </>
                )}
               
            </div>
            <div className='hidden lg:block'>
                <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.department_code} />
            </div>
        </>
    );
}
export default Attendance;