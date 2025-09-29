import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import EventAttended from "../student_components/EventAttended.jsx";
import EventExcuse from "../student_components/EventExcuse.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import {useState, useEffect} from 'react';
import it from '../assets/it.png';


function Attendance(){

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

            const [attendanceStatus, setAttendanceStatus] = useState({"attended_events": [], "excused_events": []})

            const fetchAttendanceStatus = async () => {
                    try {
                        const res = await fetch(`/api/students/current/attendance/status`, {
                            credentials: "include"
                        });
                        const response = await res.json();
                        if (response.status === "success") {
                            setAttendanceStatus(response.data);
                        }
                    } catch (err) {
                        errorAlert("Fetch Failed");
                    }
                }
            
            useEffect(() => {
                fetchCurrentUser();
                fetchAttendanceStatus();
            }, []);
       
    return(
        <>
        <Header code={currentUserData?.department_code} title = {currentUserData?.organization_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-semibold ml-6">My Attendance</h2>
            </div>
            
            <div className="lg:ml-70 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 px-8 justify-center gap-6 mt-6">
                <EventAttended eventAttended={attendanceStatus?.attended_events}/>
                <EventExcuse attendanceExcuse={attendanceStatus?.excused_events}/>
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar  code={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default Attendance;