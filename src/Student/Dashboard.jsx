import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import CardStudent from "../student_components/CardStudent.jsx";
import Announcement from '../student_components/Announcement.jsx';
import UpcomingEvents from "../student_components/UpcomingEvents.jsx";
import { useState, useEffect } from "react";
import "../animate.css";


function Dashboard(){
    const animateL = "left-In";
    const animateR = "right-In";
    const animate = "card-In";


    const calendar = <i className="fa-solid fa-calendar-days z-[-1] opacity-50"></i>
    const coin = <i className="fa-solid fa-coins z-[-1] opacity-50"></i>
    const cash = <i className="fa-solid fa-money-bills z-[-1] opacity-50"></i>

    const [currentUserData, setCurrentUserData] = useState([]);
        
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
        useEffect(() => {
            fetchCurrentUser();
            console.log(currentUserData);
        }, []);
    
    
    return(
        <>
        <Header code={currentUserData?.department_code} titleCouncil ={currentUserData?.organization_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="lg:mt-30 mt-25 lg:ml-70">
                <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Welcome Yummy Bobis!</h2>
            </div>
            <div className={` ${animate} lg:ml-70 lg:flex lg:justify-center grid grid-cols-2 gap-6 mt-6`}>
                <CardStudent title="Number of Paid Contributions" value="5" icon ={calendar}/>
                <CardStudent title="Number of Unpaid Contributions" value="3" icon ={coin}/>
                <CardStudent title="Number of Unsettled Contributions" value="7" icon ={cash}/>
                <CardStudent title="Number of Active Sanctions" value="2" icon ={calendar}/>
            </div>
            <div className={`  lg:ml-70 lg:flex lg:justify-center gap-6`}>
                 <div className={` ${animateL} w-[100%] h-100 bg-white shadow-[2px_2px_3px_#434343,-2px_-2px_3px_#ebe4e4] px-5 border-[#ebe4e4] mt-8 rounded-lg overflow-y-scroll hide-scrollbar`}>
                    <h2 className="font-[family-name:Verdana] text-md font-semibold mt-3">Upcoming Events</h2>
                    <UpcomingEvents month="Dec" day="25" event="Year-End Party" desc="Christmas Celebration of IT Department" target="1st Year - 4th Year" type="Attendance - Contribution"/>
                    <UpcomingEvents month="May" day="5" event="Tribute To Senior" desc="A tribute to the graduates." target="1st Year - 4th Year" type="Attendance - Contribution"/>
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