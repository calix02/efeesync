import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import EventAttended from "../student_components/EventAttended.jsx";
import EventExcuse from "../student_components/EventExcuse.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import SkeletonHeader from "../skeletons/SkeletonHeader.jsx";
import SkeletonBox from "../skeletons/SkeletonBox.jsx";
import SkeletonSideBar from "../skeletons/SkeletonSidebar.jsx";
import {useState, useEffect} from 'react';
import it from '../assets/it.png';
import { errorAlert } from '../utils/alert.js';



function Attendance(){

    const [currentUserData, setCurrentUserData] = useState(() => {
    const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });
    
    const [userLoading, setUserLoading] = useState(true);
    const [attendanceLoading, setAttendanceLoading] = useState(true);

    const fetchCurrentUser = async () => {
        setUserLoading(true);
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
           // errorAlert("Fetch Failed");
        }finally{
            setUserLoading(false);
        }
    }

            const [attendanceStatus, setAttendanceStatus] = useState({"attended_events": [], "excused_events": []})

            const fetchAttendanceStatus = async () => {
                setAttendanceLoading(true);
                    try {
                        const res = await fetch(`/api/students/current/attendance/status`, {
                            credentials: "include"
                        });
                        const response = await res.json();
                        if (response.status === "success") {
                            setAttendanceStatus(response.data);
                        }
                    } catch (err) {
                       // errorAlert("Fetch Failed");
                    }finally{
                        setAttendanceLoading(false);
                    }
                }
            
            useEffect(() => {
                fetchCurrentUser();
                fetchAttendanceStatus();
            }, []);
       
    return(
        <>
        {userLoading ? (
            <SkeletonHeader/>
        ) : (
            <Header code={currentUserData?.organization_code} title = {currentUserData?.department_name}/>
        )}
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-poppins font-semibold ">My Attendance</h2>
            </div>
            
            <div className="lg:ml-70 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1  justify-center gap-6 mt-6">
                {attendanceLoading ? (
                    <>
                        <SkeletonBox height="h-130" mt="mt-0"/>
                        <SkeletonBox height="h-130" mt="mt-0"/>
                    </>
                ) :(
                <>
                <EventAttended eventAttended={attendanceStatus?.attended_events}/>
                <EventExcuse attendanceExcuse={attendanceStatus?.excused_events}/>
                </>
                )}
            </div>
            
        </div>
             <div className='lg:block hidden' >
                {userLoading ?(
                    <SkeletonSideBar/>
                ) : (
                    <Sidebar  code={currentUserData?.organization_code} />
                 )}
            </div>

        </>
    );
}
export default Attendance;