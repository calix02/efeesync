import TreasurerCard from './TreasurerCard.jsx';
import StudentGraph from '../other_components/Graph.jsx';
import EventChart from './EventChart.jsx';
import EventsCalendarView from "./EventsCalendarView.jsx";
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import Footer from '../other_components/Footer.jsx';
import '../animate.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

function CITDashboard({ currentUserData }) {
  const eventCalendar = useAnimatedToggle();
  const calendarRef = useRef(null);
  const navigate = useNavigate();

  const animateGraph = "left-In";
  const animateChart = "right-In";

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    total_events: 0,
    total_students: 0,
    total_fees_collected: "0.00",
    total_sanctions_collected: "0.00",
    student_population: {
      total_first_year: "0",
      total_second_year: "0",
      total_third_year: "0",
      total_fourth_year: "0",
    },
    event_summary: [],
  });

  const [eventsOrg, setEventsOrg] = useState([]);

  const fetchDashboard = async () => {
    if (!currentUserData) return;
    try {
      const res = await fetch(`/api/organizations/code/${currentUserData?.organization_code}/dashboard`, {
        credentials: "include",
      });
      const response = await res.json();
      if (response.status === "success") {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.error("Dashboard fetch failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async (organizationId = currentUserData?.organization_id) => {
    if (!organizationId) return;
    try {
      const res = await fetch(`/api/organizations/${organizationId}/events`, {
        credentials: "include",
      });
      const response = await res.json();
      if (response.status === "success") {
        setEventsOrg(response.data);
      }
    } catch (err) {
      console.error("Events fetch failed");
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchEvents();
  }, [currentUserData]);

  const studentPopulation = dashboardData.student_population;
  const departmentColors = {
    CIT: ['#e0b3ff', '#c480ff', '#9d4edd', '#5a189a'],
    COE: ['#99ccff', '#4da6ff', '#0059b3', '#003366'],
    COC: ['#ff9999', '#ff6666', '#cc0000', '#800000'],
    COT: ['#fff799', '#ffe066', '#ccaa00', '#665c00'],
    ESAF: ['#ffcc99', '#ff9966', '#cc5200', '#663300'],
    SSC: ['#99e699', '#33cc33', '#248f24', '#145214'],
  };

  const colors =
    departmentColors[currentUserData?.department_code] ||
    ['#99e699', '#33cc33', '#248f24', '#145214'];

  const data = {
    labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    datasets: [
      {
        label: 'students',
        data: [
          studentPopulation.total_first_year,
          studentPopulation.total_second_year,
          studentPopulation.total_third_year,
          studentPopulation.total_fourth_year,
        ],
        backgroundColor: colors,
        borderWidth: 0,
        cutout: '50%',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.formattedValue}`;
          },
        },
      },
    },
    onHover: (event, elements) => {
      event.native.target.style.cursor = elements.length ? "pointer" : "default";
    },
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const year = index + 1;
        navigate(`/org/student?year=${year}`);
      }
    },
  };

  const calendar = <i className="fa-solid fa-calendar-days z-[-1]"></i>;
  const cap = <i className="fa-solid fa-graduation-cap z-[-1]"></i>;
  const coin = <i className="fa-solid fa-coins z-[-1]"></i>;
  const sanc = <i className="fa-solid fa-money-check z-[-1]"></i>;

  //  Reusable Skeleton Component
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md ${className}`}>

    </div>
  );

  return (
    <>
      {eventCalendar.isVisible && (
        <div className="fixed inset-0 bg-[#00000062] flex justify-center items-center lg:z-40 md:z-50 z-70 pointer-events-auto">
          <EventsCalendarView
            events={eventsOrg}
            code={currentUserData?.department_code}
            ref={calendarRef}
            onAnimationEnd={eventCalendar.handleEnd}
            onClose={() => eventCalendar.setAnimation("fade-out")}
            animate={eventCalendar.animation}
          />
        </div>
      )}

      <div className="w-screen h-screen bg-[#ecececa4] absolute z-[-1] overflow-y-auto overflow-x-auto">
        

        {loading ? (
        <>
           <div className="lg:mt-30 mt-25 lg:ml-70">
              <div className="w-80 h-8 rounded-md animate-pulse bg-gray-200 ml-6"></div>
            </div>
            <div className="grid grid-cols-2 lg:flex lg:flex-row lg:justify-center lg:items-center lg:px-6 md:px-10 px-3 mt-4 lg:ml-70 lg:gap-6 gap-4">
            {[...Array(4)].map((_, i) => (
                <div
                key={i}
                className="animate-pulse border border-gray-200 rounded-2xl shadow-sm p-4 bg-white w-full  h-32 flex flex-col justify-between"
                >
                {/* Text lines */}
                <div className="space-y-2">
                    <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
                </div>
                {/* Icon placeholder */}
                <div className="h-10 w-10 bg-gray-200 rounded-full self-end"></div>
                </div>
            ))}
            </div>

            {/*  Skeleton for Graph and Chart */}
            <div className="lg:flex lg:ml-70 mt-8 px-3 md:px-10 lg:px-6 lg:gap-6">
            {/* Left Graph (Donut shape) */}
            <div className="animate-pulse bg-white border border-gray-200 rounded-xl h-96 lg:w-[40%] w-full flex items-center justify-center">
                <div className="relative w-60 h-60">
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                <div className="absolute inset-6 bg-white rounded-full"></div>
                </div>
            </div>

            {/* Right Chart (Bars) */}
            <div className="animate-pulse bg-white border border-gray-200 rounded-xl h-96 lg:w-[60%] w-full mt-6 lg:mt-0 flex items-end justify-around p-6">
                {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="bg-gray-300 rounded-t-md w-6"
                    style={{ height: `${30 + i * 60}px` }}
                ></div>
                ))}
            </div>
            </div>

            {/*  Skeleton for Footer */}
            <div className="lg:ml-70 mt-8 px-3 md:px-10 lg:px-6">
            <div className="animate-pulse h-12 w-full bg-gray-300 rounded-md"></div>
            </div>
        </>
        )  : (
          <>
            <div className="lg:mt-30 mt-25 lg:ml-70">
              <h2 className="text-2xl font-poppins font-semibold ml-6">Dashboard</h2>
            </div>
            {/* Real Dashboard */}
            <div className="lg:flex lg:flex-row lg:justify-center lg:items-center lg:px-6 md:px-10 px-3 grid grid-cols-2 mt-4 lg:ml-70 lg:gap-6 gap-4">
              <TreasurerCard show={eventCalendar.toggle} code={currentUserData?.department_code} desc="Number of Events" value={dashboardData.total_events} icon={calendar} />
              <TreasurerCard link="/org/student" code={currentUserData?.department_code} desc="Number of Students" value={dashboardData.total_students} icon={cap} />
              <TreasurerCard link="/org/financial" code={currentUserData?.department_code} desc="Fees Collected" value={"P " + dashboardData.total_fees_collected} icon={coin} />
              <TreasurerCard link="/org/financial" code={currentUserData?.department_code} desc="Sanction Collected" value={"P " + dashboardData.total_sanctions_collected} icon={sanc} />
            </div>

            <div className="lg:flex lg:ml-70 mt-8 px-3 md:px-10 lg:px-6 lg:gap-6">
              <div className={`bg-[#ffffff] ${animateGraph} border-1 border-[#d8d8d8] transition duration-300 hover:shadow-[3px_3px_3px_#000] hover:scale-102 lg:w-[40%] h-96 rounded-xl grid justify-center shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]`}>
                <StudentGraph graphTitle="Summary of Students" data={data} options={options} />
              </div>
              <div className={`bg-white border-1 ${animateChart} p-5 transition duration-300 hover:shadow-[3px_3px_5px_#000] hover:scale-102 border-[#d8d8d8] lg:w-[60%] h-96 lg:my-0 my-8 flex items-center justify-center lg:mx-0 mx-3 rounded-xl shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]`}>
                <EventChart code={currentUserData?.department_code} eventSummary={dashboardData?.event_summary || []} />
              </div>
            </div>

            <div className="lg:ml-70">
              <Footer />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CITDashboard;
