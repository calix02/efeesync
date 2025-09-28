import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import CardStudent from "../student_components/CardStudent.jsx";
import Announcement from '../student_components/Announcement.jsx';
import UpcomingEvents from "../student_components/UpcomingEvents.jsx";
import SendPayment from "../student_components/SendPayment.jsx";
import SendExcuse from "../student_components/SendExcuse.jsx";
import useAnimatedToggle from "../hooks/useAnimatedToggle.js";
import { useState, useEffect, useRef } from "react";
import "../animate.css";


function Dashboard(){
    const animateL = "left-In";
    const animateR = "right-In";
    const animate = "card-In";

    const sendPayment = useAnimatedToggle();
    const paymentRef = useRef(null);

    const sendExcuse = useAnimatedToggle();
    const excuseRef = useRef(null);


    const calendar = <i className="fa-solid fa-calendar-days z-[-1] opacity-50"></i>
    const coin = <i className="fa-solid fa-coins z-[-1] opacity-50"></i>
    const cash = <i className="fa-solid fa-money-bills z-[-1] opacity-50"></i>

    const [currentUserData, setCurrentUserData] = useState([]);
    const [dashboardData, setDashboardData] = useState({
        "num_paid_contributions": "-",
        "num_unpaid_contributions": "-",
        "num_unsettled_contributions": "-",
        "num_active_sanctions": "-",
        "upcoming_events": []
    });
        
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

        const fetchDashboardData = async () => {
            try {
                const res = await fetch("/api/student/dashboard", {
                    credentials: "include"
                });
                const response = await res.json();
                if (response.status === "success") {
                    setDashboardData(response.data);
                }
            } catch (err) {
                errorAlert("Fetch Failed");
            }
        }

        const getOrdinal = (n) => {
            if (n === 1) return "1st";
            if (n === 2) return "2nd";
            if (n === 3) return "3rd";
            return `${n}th`;
        };

        const formatYearLevels = (levels) => {
            if (!levels) return "";
                const arr = levels.split(",").map(Number).sort((a, b) => a - b);
                const isContinuous = arr.every((val, i) => i === 0 || val === arr[i - 1] + 1);
            if (isContinuous) {
                return `${getOrdinal(arr[0])} to ${getOrdinal(arr[arr.length - 1])} Year`;
            }
            return arr.map((n) => `${getOrdinal(n)} Year`).join(" - ");
        };


        useEffect(() => {
            fetchCurrentUser();
            fetchDashboardData();
        }, []);
    
    
    return(
        <>
        {sendPayment.isVisible &&(
             <div className="fixed lg:z-40 md:z-50 z-70 flex justify-center items-center  inset-0 bg-[#00000062] pointer-events-auto">
                <SendPayment ref={paymentRef} onAnimationEnd={sendPayment.handleEnd} onClose={()=> sendPayment.setAnimation("fade-out")} animate={sendPayment.animation} />  
            </div>
        )}
        {sendExcuse.isVisible &&(
            <div className="fixed flex justify-center items-center inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                <SendExcuse ref={excuseRef} onAnimationEnd={sendExcuse.handleEnd} onClose={()=> sendExcuse.setAnimation("fade-out")} animate={sendExcuse.animation} />  
            </div>
        )}

        <Header code={currentUserData?.department_code} title ={currentUserData?.organization_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="lg:mt-30 mt-25 lg:ml-70">
                <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Welcome, {currentUserData?.full_name}!</h2>
            </div>
            <div className={` ${animate} lg:ml-70 lg:flex lg:justify-center grid grid-cols-2 gap-6 mt-6`}>
                <CardStudent title="Number of Paid Contributions" value={dashboardData?.num_paid_contributions} icon ={calendar}/>
                <CardStudent title="Number of Unpaid Contributions" value={dashboardData?.num_unpaid_contributions} icon ={coin}/>
                <CardStudent title="Number of Unsettled Contributions" value={dashboardData?.num_unsettled_contributions} icon ={cash}/>
                <CardStudent title="Number of Active Sanctions" value={dashboardData?.num_active_sanctions} icon ={calendar}/>
            </div>
            <div className={`  lg:ml-70 lg:flex lg:justify-center gap-6`}>
                 <div className={` ${animateL} w-[100%] h-100 bg-white shadow-[2px_2px_3px_#434343,-2px_-2px_3px_#ebe4e4] px-5 border-[#ebe4e4] mt-8 rounded-lg overflow-y-scroll hide-scrollbar`}>
                    <h2 className="font-[family-name:Verdana] text-md font-semibold mt-3">Upcoming Events</h2>
                    {dashboardData?.upcoming_events?.length > 0 ? (
                        dashboardData.upcoming_events.map((ev) => {
                            const date = new Date(ev.event_end_date);
                            const month = date.toLocaleString("default", { month: "short" });
                            const day = date.getDate();

                            return (
                            <UpcomingEvents
                                excuse={sendExcuse.toggle}
                                pay ={sendPayment.toggle}
                                key={ev.event_id}
                                month={month}
                                day={day}
                                event={ev.event_name}
                                desc={ev.event_description}
                                target={`Open to: ${formatYearLevels(ev.event_target_year_levels)}`}
                                type={ev.event_type}
                            />
                            );
                        })
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No upcoming events</p>
                    )}
                </div>
                <div className={` ${animateR}  w-[100%] h-100 bg-white shadow-[2px_2px_3px_#434343,-2px_-2px_3px_#ebe4e4] px-5 border-[#ebe4e4] mt-8 rounded-lg overflow-y-scroll hide-scrollbar`}>
                    <h2 className="font-[family-name:Verdana] text-md font-semibold mt-3 ml-2">Announcements</h2>
                    <Announcement announcement= "General Assembly: All IT students are required to attend. Attendance is a must!"/>
                    <Announcement announcement= "General Assembly: All IT students are required to attend. Attendance is a must!"/>
                    <Announcement announcement= "General Assembly: All IT students are required to attend. Attendance is a must!"/>
                </div>
            </div>
        </div>
             <div className='lg:block hidden' >
                 <Sidebar code={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default Dashboard;