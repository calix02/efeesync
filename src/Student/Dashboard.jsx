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

    const [currentUserData, setCurrentUserData] = useState([]);
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
                console.error("Fetch Failed");
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
                console.error("Fetch Failed");
            }
        }

        const fetchSanctionData = async () => {
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
            CIT: "border-[#621668] text-[#621668] bg-[#621668]",
            COE: "border-[#020180] text-[#020180] bg-[#020180]",
            COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COT: "border-[#847714] text-[#847714] bg-[#847714]",
            ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]",
        };

    const color = colors[currentUserData?.department_code] || "border-[#174515] text-[#174515] bg-[#174515]";
    
    return(
        <>
        {sendPayment.isVisible &&(
             <div className="fixed lg:z-40 md:z-50 z-70 flex justify-center items-center  inset-0 bg-[#00000062] pointer-events-auto">
                <SendPayment code={currentUserData?.department_code} ref={paymentRef} onAnimationEnd={sendPayment.handleEnd} onClose={()=> sendPayment.setAnimation("fade-out")} animate={sendPayment.animation} />  
            </div>
        )}
        {sendExcuse.isVisible &&(
            <div className="fixed flex justify-center items-center inset-0 bg-[#00000062] lg:z-40 md:z-50 z-70 pointer-events-auto">
                <SendExcuse code={currentUserData?.department_code} ref={excuseRef} onAnimationEnd={sendExcuse.handleEnd} onClose={()=> sendExcuse.setAnimation("fade-out")} animate={sendExcuse.animation} />  
            </div>
        )}

        <Header code={currentUserData?.department_code} title ={currentUserData?.department_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="lg:mt-30 mt-25 lg:ml-70">
                <h2 className="text-2xl font-poppins  font-semibold">Welcome, {currentUserData?.full_name}!</h2>
            </div>
            <div className={` ${animate} lg:ml-70 lg:flex lg:justify-center grid grid-cols-2 gap-6 mt-6`}>
                <CardStudent link="/student/contribution" title="Number of Paid Contributions" value={dashboardData?.num_paid_contributions} icon ={calendar}/>
                <CardStudent link="/student/contribution" title="Number of Unpaid Contributions" value={dashboardData?.num_unpaid_contributions} icon ={coin}/>
                <CardStudent link="/student/contribution" title="Number of Unsettled Contributions" value={dashboardData?.num_unsettled_contributions} icon ={cash}/>
                <CardStudent link="/student/sanction" title="Number of Active Sanctions" value={dashboardData?.num_active_sanctions} icon ={calendar}/>
            </div>
            <div className={`  lg:ml-70 lg:flex lg:justify-center gap-6`}>
                 <div className={` ${animateL} w-[100%] h-100 bg-[#F8F8F8] shadow-[2px_2px_3px_#434343,-2px_-2px_3px_#ebe4e4] px-5 border-[#ebe4e4] mt-8 rounded-lg overflow-y-scroll hide-scrollbar`}>
                    <h2 className="font-[family-name:Verdana] text-md font-semibold mt-6">Upcoming Events</h2>
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
                                code={currentUserData?.department_code}
                            />
                            );
                        })
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No upcoming events</p>
                    )}
                </div>
                <div className={` ${animateR}  w-[100%]  h-100  shadow-[2px_2px_3px_#434343,-2px_-2px_3px_#ebe4e4] px-5 border-[#ebe4e4] mt-8 rounded-lg overflow-y-scroll hide-scrollbar`}>
                    <h2 className="font-[family-name:Verdana]  gap-3 flex text-md font-semibold mt-6 ml-2">
                        <span onClick={chooseSanction} className={` bg-[#fff0] border-b-2 cursor-pointer ${isMonetary? (color) : "text-[#000] border-none"}`}>Monetary</span>
                        <span onClick={chooseSanction} className={` bg-[#fff0] border-b-2 cursor-pointer ${isMonetary? "text-[#000] border-none" : (color)}`}>Community Service</span>
                    </h2>
                    {isMonetary === true && (
                        <>
                        <div className=" flex justify-start items-center ">
                            <h2 className={` ${color} bg-[#fff0] font-semibold ml-2 mt-3 font-inter text-md`}>Total Sanctions: P {sanctionData?.total_sanction_balance}</h2>
                        </div>

                        <MonetarySanction formatDateStr={formatDateStr} monetarySanctions={sanctionData?.monetary_sanctions} code={currentUserData?.department_code} />
                        </>
                    )}
                    {isMonetary === false &&(
                        <>
                        <h2 className={` ${color} bg-[#fff0] font-semibold ml-2 mt-3 font-inter text-md`}>Total Number of Service: {sanctionData?.community_service?.length}</h2>
                        <CommunitySanction formatDateStr={formatDateStr} communityService={sanctionData?.community_service} code={currentUserData?.department_code} />
                        </>
                    )}
                    
                </div>
            </div>
            <div className="lg:ml-70">
                <Footer/>
            </div>
        </div>
             <div className='lg:block hidden' >
                 <Sidebar code={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default Dashboard;