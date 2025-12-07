// ...existing code...
import { Link } from 'react-router-dom';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableEventContribution from '../other_components/TableEventContribution.jsx';
import UpdateSpecificEventContribution from '../treasurer_components/UpdateSpecificEventContribution.jsx';
import React, { useState, useRef, useEffect } from 'react';
import ContributionTable from '../treasurer_components/ContributionTable.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonTable from '../skeletons/SkeletonTable.jsx';
import SkeletonSidebar from '../skeletons/SkeletonSidebar.jsx';
import "../animate.css";
import EfeeViolet from '../assets/violetlogo.png';
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";
// ...existing code...

function EventContribution({ data }) {
  /* --------------------------------- animation -------------------------------- */
  document.title="Event Contributions";
  const animateR = "right-In";
  const animateL = "left-In";

  /* ------------------------- Animated States ----------------------------- */
  const specificContribution = useAnimatedToggle();

  const [showSelectedEvents, setShowSelectedEvents] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(true);

  const specificRef = useRef(null);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [eventContributionsData, setEventContributionsData] = useState([]);

  const [currentUserData, setCurrentUserData] = useState(() => {
    const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });
    
    const fetchCurrentUser = async () => {
        setLoadingUser(true);
        try {
            const res = await fetch("/api/users/current", {
                credentials: "include"
            });
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
    }

  const [searchValueEvents, setSearchValueEvents] = useState("");
  const [searchValueStudents, setSearchValueStudentss] = useState("");

  const fetchEventContributions = async (page=1, search="", org_code=currentUserData?.organization_code) => {
    setLoadingEvent(true);
    try {
      const anotherRes = await fetch(`/api/organizations/code/${org_code}/events?type=contribution&page=${page}&search=${search}`, {
            credentials: "include"
          });
          const anotherResponse = await anotherRes.json();
          if (anotherResponse.status === "success") {
            setEventContributionsData(anotherResponse.data);
          }
    } catch (err) {
      //errorAlert("Fetch Failed");
    }finally{
      setLoadingEvent(false);
    } 
  }

  const [debounceTimer, setDebounceTimer] = useState(null);
          
          function debounce(callback, delay=500) {
              clearTimeout(debounceTimer);
              setDebounceTimer(setTimeout(callback, delay));
          }
      
          const searchEventContributions = (search) => {
              setSearchValueEvents(search);
              debounce(() => {
                  fetchEventContributions(1, search);
              }, 500);
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
  
 

  const searchStudentsToContribute = (search) => {
      setSearchValueStudentss(search);
      debounce(() => {
          fetchStudentsToContribute(1, search);
      }, 500);
  };

  const [studentsToContribute, setStudentsToContribute] = useState([]);

  const fetchStudentsToContribute = async (page=1, search="") => {
      if (!selectedEvent) return;

      try {
        const res = await fetch(`/api/events/${selectedEvent.event_id}/contributions/made?page=${page}&search=${search}`, {
          credentials: "include"
        });
        const response = await res.json();
        if (response.status === "success") {
          setPaginateForStudents(response.meta);
          setStudentsToContribute(response.data);
        } else {
         // errorAlert(response.message);
        }
      } catch (err) {
       // errorAlert(err);
      } finally {
        setLoadingStudents(false);
      }
    };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    fetchEventContributions();
  }, [currentUserData]);

  /* ------------------ handle view event ------------------ */
  const clickedView = (event) => {
    setSelectedEvent(event);
    setShowSelectedEvents(true);
    // fetch students for this event
    fetchStudentsToContribute(1, "");
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
    const hoverColor = hoverColors[currentUserData?.organization_code] || " hover:text-[#174515] ";

  return (
    <>
      {/* Specific Contribution */}
      {specificContribution.isVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
          <UpdateSpecificEventContribution
            ref={specificRef}
            data={selectedAttendee}
            onAnimationEnd={specificContribution.handleEnd}
            animate={specificContribution.animation}
            onClose={() => specificContribution.setAnimation("fade-out")}
          />
        </div>
      )}

      {loadingUser ? (
        <SkeletonHeader />
      ) : (
        <CITHeader
          code={currentUserData?.organization_code}
          titleCouncil={currentUserData?.organization_name}
          abb="CIT Council"
        />
      )}

      <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">

        {!showSelectedEvents && (
          <>
         
              <>
               <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex justify-between">
              <h2 className="text-2xl font-semibold font-poppins">
                Event Contribution
              </h2>
              <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                <input
                  className="lg:w-120 px-8 relative text-sm  md:w-85 shadow-[2px_2px_1px_gray]  w-[100%] h-12 bg-white rounded-xl border-1 lg:mt-0 md:mt-0 mt-4 border-[#e0e0e0] block"
                  type="text"
                  onKeyUp={(e) => {searchEventContributions(e.target.value)}}
                  placeholder="Search Events"
                />
              </div>
            </div>

            <div className=" w-[100%] mt-3 ">
              <div className={`lg:ml-70 ${animateL} flex lg:justify-between md:justify-start font-[family-name:Arial] justify-center `}>
              </div>

              <div className="lg:ml-70 text-[font-family:Arial] lg:text-sm text-xs mt-3 flex justify-end">
                <Link to="/org/eventlist">
                  <button className={`text-center ${color} ${hoverColor} hover:text-white lg:text-sm text-xs h-8 hover:scale-107 shadow-[2px_2px_1px_grey] duration-200 transition  rounded-2xl cursor-pointer px-3 font-semibold font-poppins bg-white border border-[#e0e0e0]`}>
                    Back to Eventlist
                  </button>
                </Link>
              </div>
            </div>
            {loadingEvent ? (
              <SkeletonTable/>
            ) : (
              <TableEventContribution
                searchValueEvents={searchValueEvents}
                code={currentUserData?.organization_code}
                formatDateStr={formatDateStr}
                selectedEvent={selectedEvent}
                events={eventContributionsData}
                view={(row) => clickedView(row)}
                updateContribution={(row) => {
                  setSelectedAttendee(row);
                  specificContribution.toggle();
                }}/>
                )}
              </>
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
                  className="lg:w-120 relative px-8 w-[100%] text-sm h-12 bg-white rounded-2xl border border-[#e0e0e0] shadow-[2px_2px_1px_gray] lg:mt-0 md:mt-0 mt-4  block"
                  type="text"
                  onKeyUp={(e) => {searchStudentsToContribute(e.target.value)}}
                  placeholder="Search Student"
                />

              </div>
            </div>

            <div className="lg:ml-70 flex justify-end mt-3">
              <button
                className={`${color} ${hoverColor} px-8 h-8 lg:text-sm text-xs bg-white font-poppins font-semibold hover:scale-107 cursor-pointer hover:text-white  border-1 border-[#e0e0e0] rounded-2xl shadow-[2px_2px_1px_grey] transition duration-200`}
                onClick={() => setShowSelectedEvents(false)}
              >
                Back to Event
              </button>
            </div>
              {loadingStudents ? (
                <SkeletonTable/>
              ) :(
                <ContributionTable
                  searchValueStudents={searchValueStudents}
                  paginate={paginateForStudents}
                  fetchStudentsToContribute={fetchStudentsToContribute}
                  studentsToContribute={studentsToContribute}
                  selectedEvent={selectedEvent}
                  code={currentUserData?.organization_code}/>
              )}
          </>
        )}
      </div>
      {loadingUser ? (
        <SkeletonSidebar />
      ) :(
      <div className="hidden lg:block">
        <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.organization_code} />
      </div>
      )
    }
    </>
  );
}

export default EventContribution;
