import { Link } from 'react-router-dom';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableEventContribution from '../other_components/TableEventContribution.jsx';
import UpdateSpecificEventContribution from '../treasurer_components/UpdateSpecificEventContribution.jsx';
import React, { useState, useRef, useEffect } from 'react';
import ContributionTable from '../treasurer_components/ContributionTable.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import "../animate.css";
import EfeeViolet from '../assets/violetlogo.png';
import { errorAlert } from "../utils/alert";

function EventContribution({ data }) {
  /* --------------------------------- animation -------------------------------- */
  const animateR = "right-In";
  const animateL = "left-In";

  /* ------------------------- Animated States ----------------------------- */
  const specificContribution = useAnimatedToggle();

  const [showSelectedEvents, setShowSelectedEvents] = useState(false);

  const specificRef = useRef(null);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [eventContributionsData, setEventContributionsData] = useState([]);

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

  const [searchValue, setSearchValue] = useState("");

  const fetchEventContributions = async (page=1, search="", org_code=currentUserData?.organization_code) => {
    const anotherRes = await fetch(`/api/organizations/code/${org_code}/events?type=contribution&page=${page}&search=${search}`, {
          credentials: "include"
        });
        const anotherResponse = await anotherRes.json();
        if (anotherResponse.status === "success") {
          setEventContributionsData(anotherResponse.data);
        }
  }

  const [debounceTimer, setDebounceTimer] = useState(null);
          
          function debounce(callback, delay=500) {
              clearTimeout(debounceTimer);
              setDebounceTimer(setTimeout(callback, delay));
          }
      
          const searchEventContributions = (search) => {
              setSearchValue(search);
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
  
  function debounce(callback, delay=500) {
      clearTimeout(debounceTimer);
      setDebounceTimer(setTimeout(callback, delay));
  }

  const searchStudentsToContribute = (search) => {
      setSearchValue(search);
      debounce(() => {
          fetchStudentsToContribute(1, search);
      }, 500);
  };

  const [studentsToContribute, setStudentsToContribute] = useState([]);

  const fetchStudentsToContribute = async (page=1, search="") => {
      try {
        const res = await fetch(`/api/events/${selectedEvent.event_id}/contributions/made?page=${page}&search=${search}`, {
          credentials: "include"
        });
        const response = await res.json();
        if (response.status === "success") {
          setPaginateForStudents(response.meta);
          setStudentsToContribute(response.data);
        } else {
          errorAlert(response.message);
        }
      } catch (err) {
        errorAlert(err);
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
  };
  const colors = {
      CIT: "border-[#621668] text-[#621668] bg-[#621668]",
      COE: "border-[#020180] text-[#020180] bg-[#020180]",
      COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
      COT: "border-[#847714] text-[#847714] bg-[#847714]",
      SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
      SSC: "border-[#174515] text-[#174515] bg-[#174515]",
    };
    const color = colors[currentUserData?.department_code] || "border-[#174515] text-[#174515] bg-[#174515]";

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

      <CITHeader
        code={currentUserData?.department_code}
        titleCouncil={currentUserData?.organization_name}
        abb="CIT Council"
      />

      <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">

        {/* When NO event is selected */}
        {!showSelectedEvents && (
          <>
            <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex justify-between">
              <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">
                Event Contribution
              </h2>
              <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                <input
                  className="lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4 border-[#8A2791] block"
                  type="text"
                  onKeyUp={(e) => {searchEventContributions(e.target.value)}}
                  placeholder="Search Events"
                />
              </div>
            </div>

            <div className=" w-[100%] mt-3 ">
              <div className={`lg:ml-70 ${animateL} flex lg:justify-between md:justify-start font-[family-name:Arial] justify-center `}>
                {/*
                <span>
                  <select className="bg-white mx-1 lg:w-25 w-20 text-xs cursor-pointer transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white border-1 border-[#8A2791] py-1 text-[#8A2791] rounded-md text-center">
                  <option value="">S/Y</option>
                  <option value="">hey</option>
                </select>
                <select className="bg-white mx-1 lg:w-25 w-20 text-xs cursor-pointer transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white border-1 border-[#8A2791] py-1 text-[#8A2791] rounded-md text-center">
                  <option value="">Semester</option>
                  <option value="">hey</option>
                </select>
                <select className="bg-white mx-1 lg:w-25 w-20 text-xs cursor-pointer transition duration-100 hover:scale-100 hover:bg-[#621668] hover:text-white border-1 border-[#8A2791] py-1 text-[#8A2791] rounded-md text-center">
                  <option value="">Month</option>
                  <option value="">hey</option>
                </select>
                </span>
                */}
              </div>

              <div className="lg:ml-70 text-[font-family:Arial] lg:text-sm text-xs mt-3 flex justify-end">
                <Link to="/org/eventlist">
                  <button className={`text-center ${color} text-sm font-[family-name:Arial] h-6 hover:bg-white hover:scale-102 hover:shadow-[2px_2px_3px_grey] duration-200 transition  rounded-md cursor-pointer px-3 text-white border-1 `}>
                    Back to Eventlist
                  </button>
                </Link>
              </div>
            </div>

            <TableEventContribution
              code={currentUserData?.department_code}
              formatDateStr={formatDateStr}
              selectedEvent={selectedEvent}
              events={eventContributionsData}
              view={(row) => clickedView(row)}
              updateContribution={(row) => {
                setSelectedAttendee(row);
                specificContribution.toggle();
              }}
             
            />
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
                  className="lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4 border-[#8A2791] block"
                  type="text"
                  onKeyUp={(e) => {searchStudentsToContribute(e.target.value)}}
                  placeholder="Search Student"
                />
              </div>
            </div>

            <div className="lg:ml-70 flex justify-end mt-3">
              <button
                className="px-6 text-white rounded-md cursor-pointer hover:scale-102 hover:bg-white hover:text-[#621668] hover:border-[#621668] border-1 hover:shadow-[2px_2px_3px_grey] transition duration-200"
                onClick={() => setShowSelectedEvents(false)}
              >
                Back
              </button>
            </div>
            <ContributionTable
              paginate={paginateForStudents}
              fetchStudentsToContribute={fetchStudentsToContribute}
              studentsToContribute={studentsToContribute}
              selectedEvent={selectedEvent}
              code={currentUserData?.department_code}/>
          </>
        )}
      </div>

      <div className="hidden lg:block">
        <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.department_code} />
      </div>
    </>
  );
}

export default EventContribution;