import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import CardStudent from "../student_components/CardStudent.jsx";
import MonetarySanction from '../student_components/MonetarySanction.jsx';
import UpcomingEvents from "../student_components/UpcomingEvents.jsx";
import CommunitySanction from "../student_components/CommunitySanction.jsx";
import SendPayment from "../student_components/SendPayment.jsx";
import SendExcuse from "../student_components/SendExcuse.jsx";
import useAnimatedToggle from "../hooks/useAnimatedToggle.js";
import SkeletonHeader from "../skeletons/SkeletonHeader.jsx";
import SkeletonCard from "../skeletons/SkeletonCard.jsx";
import SkeletonBox from "../skeletons/SkeletonBox.jsx";
import SkeletonSideBar from "../skeletons/SkeletonSidebar.jsx";
import Footer from "../other_components/Footer.jsx";
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
    
    const [sanctionData, setSanctionData] = useState({
        "monetary_sanctions": [],
        "community_service": [],
        "total_sanction_balance": 0,
        "total_sanctions_paid": 0
    });
    const [dashboardData, setDashboardData] = useState({
        "num_paid_contributions": "-",
        "num_unpaid_contributions": "-",
        "num_unsettled_contributions": "-",
        "num_active_sanctions": "-",
        "upcoming_events": []
    });
    const [loadingUser, setLoadingUser] = useState(true);
    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [sanctionLoading, setSanctionLoading] = useState(true);

    const [excusedEvents, setExcusedEvents] = useState({});



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
                    errorAlert("Fetch Failed");
                }finally{
                    setLoadingUser(false);
                }
            }

        const fetchDashboardData = async () => {
            setDashboardLoading(true);
            try {
                const res = await fetch("/api/student/dashboard", {
                    credentials: "include"
                });
                const response = await res.json();
                if (response.status === "success") {
                    setDashboardData(response.data);
                }
            } catch (err) {
                console.error("Fetch Failed");
            }finally{
                setDashboardLoading(false);
            }
        }

        const fetchSanctionData = async () => {
            setSanctionLoading(true);
            try {
                const res = await fetch("/api/students/current/attendance/sanction", {
                    credentials: "include"
                });
                const response = await res.json();
                if (response.status === "success") {
                    setSanctionData(response.data);
                }
            } catch (err) {
                console.error("Fetch Failed");
            }finally{
                setSanctionLoading(false);
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

        const formatDateStr = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
        }

        useEffect(() => {
            fetchCurrentUser();
            fetchSanctionData();
            fetchDashboardData();
        }, []);
    
        const [isMonetary, setIsMonetary] = useState(true);
        const chooseSanction = () => setIsMonetary(!isMonetary);

        const colors = {
            CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
            CESC: "border-[#020180] text-[#020180] bg-[#020180]",
            CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
            SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]",
        };

        const [status, setStatus] = useState(null);

    const color = colors[currentUserData?.organization_code] || "border-[#174515] text-[#174515] bg-[#174515]";
    const [selectedEvent, setSelectedEvent] = useState(null);
    return(
        <>
        {sendPayment.isVisible &&(
             <div className="fixed lg:z-40 md:z-50 z-70 flex justify-center items-center  inset-0 bg-[#00000062] pointer-events-auto">
                <SendPayment fetchDashboardData={fetchDashboardData} data={selectedEvent} code={currentUserData?.organization_code} ref={paymentRef} onAnimationEnd={sendPayment.handleEnd} onClose={()=> sendPayment.setAnimation("fade-out")} animate={sendPayment.animation} />  
            </div>
        )}
        {sendExcuse.isVisible &&(
            <div className="fixed flex justify-center items-center inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                <SendExcuse formatDateStr={formatDateStr} onExcuseSent={(eventId) =>
    setExcusedEvents(prev => ({
      ...prev,
      [eventId]: true
    }))
  }   selectedEvent={selectedEvent} code={currentUserData?.organization_code} ref={excuseRef} onAnimationEnd={sendExcuse.handleEnd} onClose={()=> sendExcuse.setAnimation("fade-out")} animate={sendExcuse.animation} />  
            </div>
        )}
        {loadingUser ? (
            <SkeletonHeader/>
        ) : (
            <Header code={currentUserData?.organization_code} title ={currentUserData?.department_name}/>
        )}
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="lg:mt-30 mt-25 lg:ml-70">
                <h2 className="text-2xl font-poppins  font-semibold">Welcome, {currentUserData?.full_name}!</h2>
            </div>
            <div className={` ${animate} lg:ml-70 lg:flex lg:justify-center grid grid-cols-2 lg:gap-6 gap-3 mt-6`}>
                {dashboardLoading ? (
                    <>
                    <SkeletonCard/>
                    <SkeletonCard/>
                    <SkeletonCard/>
                    <SkeletonCard/>

                    </>

                ) : (
                <>
                <CardStudent link="/student/contribution" title="Number of Paid Contributions" value={dashboardData?.num_paid_contributions} icon ={calendar}/>
                <CardStudent link="/student/contribution" title="Number of Unpaid Contributions" value={dashboardData?.num_unpaid_contributions} icon ={coin}/>
                <CardStudent link="/student/contribution" title="Number of Unsettled Contributions" value={dashboardData?.num_unsettled_contributions} icon ={cash}/>
                <CardStudent link="/student/sanction" title="Number of Active Sanctions" value={dashboardData?.num_active_sanctions} icon ={calendar}/>
                </>
                )}
            </div>
            <div className={`  lg:ml-70 lg:flex lg:justify-center gap-6`}>
                {dashboardLoading ? (
                    <SkeletonBox/>

                ) :(
                 <div className={` ${animateL} w-[100%] font-poppins h-100 bg-white px-5 border-gray-300 border shadow-[4px_4px_2px_gray] mt-8 rounded-2xl overflow-y-scroll hide-scrollbar`}>
                    <h2 className="font-poppins text-xl font-bold mt-6">Upcoming Events</h2>
                    {dashboardData?.upcoming_events?.length > 0 ? (
                        dashboardData.upcoming_events.map((ev) => {
                            const date = new Date(ev.event_end_date);
                            const month = date.toLocaleString("default", { month: "short" });
                            const day = date.getDate();

                            return (
                            <UpcomingEvents
                                sent={excusedEvents}
                                data={ev}
                                excuse={(ev) =>{sendExcuse.toggle(); setSelectedEvent(ev)}}
                                pay ={(data)=>{sendPayment.toggle(); setSelectedEvent(data)}}
                                key={ev.event_id}
                                month={month}
                                id ={ev.event_id}
                                day={day}
                                event={ev.event_name}
                                desc={ev.event_description}
                                target={`Open to: ${formatYearLevels(ev.event_target_year_levels)}`}
                                type={ev.event_type}
                                code={currentUserData?.organization_code}
                            />
                            );
                        })
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No upcoming events</p>
                    )}
                </div>
                )}
                {sanctionLoading ? (
                    <SkeletonBox/>
                 ) : (

                <div className={` ${animateR} bg-white border-gray-300 border shadow-[4px_4px_2px_gray]   w-[100%] h-100  px-5 mt-8 rounded-2xl overflow-y-scroll hide-scrollbar`}>
                    <h2 className="font-poppins font-bold  gap-3 flex text-xl  mt-6 ml-2">
                        <span onClick={chooseSanction} className={` bg-[#fff0] border-b-2 cursor-pointer ${isMonetary? (color) : "text-[#000] border-none"}`}>Monetary</span>
                        <span onClick={chooseSanction} className={` bg-[#fff0] border-b-2 cursor-pointer ${isMonetary? "text-[#000] border-none" : (color)}`}>Community Service</span>
                    </h2>
                    {isMonetary === true && (
                        <>
                        <div className=" flex justify-start items-center ">
                            <h2 className={` ${color} bg-[#fff0] font-semibold ml-2 mt-3 font-inter text-md`}>Total Sanctions: P {sanctionData?.total_sanction_balance}</h2>
                        </div>

                        <MonetarySanction formatDateStr={formatDateStr} monetarySanctions={sanctionData?.monetary_sanctions} code={currentUserData?.organization_code} />
                        </>
                    )}
                    {isMonetary === false &&(
                        <>
                        <h2 className={` ${color} bg-[#fff0] font-semibold ml-2 mt-3 font-inter text-md`}>Total Number of Service: {sanctionData?.community_service?.length}</h2>
                        <CommunitySanction formatDateStr={formatDateStr} communityService={sanctionData?.community_service} code={currentUserData?.organization_code} />
                        </>
                    )}
                    
                </div>
                  )}
               
            </div>
           
            <div className="lg:ml-70">
                <Footer/>
            </div>
        </div>
             <div className='lg:block hidden' >
                {loadingUser ? (
                    <SkeletonSideBar/>
                ) : (
                    <Sidebar code={currentUserData?.organization_code} />
                 )}
            </div>

        </>
    );
}
export default Dashboard;