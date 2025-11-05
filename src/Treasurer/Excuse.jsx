import React, { useRef, useState, useEffect } from 'react';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableExcuse from '../treasurer_components/TableExcuse.jsx';
import Letter from '../treasurer_components/Letter.jsx';
import SkeletonTable from '../skeletons/SkeletonTable.jsx';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonSidebar from '../skeletons/SkeletonSidebar.jsx';
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";
import "../animate.css";
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';

function CITExcuse() {
    const animateR = "right-In";
    const animateL = "left-In";

    const viewLetter = useAnimatedToggle();
    const viewLetterRef  = useRef(null);

    const [loading, setLoading] = useState(true);

    const [currentUserData, setCurrentUserData] = useState(() => {
        const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });

    const [status, setStatus] = useState("");

    const fetchCurrentUser = async () => {
        try {
            setLoading(true);
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
        }
        // do not setLoading(false) here — fetchAttendanceExcuse will clear loading when data arrives
    }

    const [attendanceExcuses, setAttendanceExcuses] = useState([]);
    const fetchAttendanceExcuse = async (statusArg = "", page = 1, search = "") => {
        if (!currentUserData) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/organizations/code/${currentUserData?.organization_code}/attendance/excuses?page=${page}&search=${encodeURIComponent(search)}&status=${statusArg}`, {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setAttendanceExcuses(response.data);
                setPaginate(response.meta);
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        } finally {
            setLoading(false);
        }
    }

    const [searchValue, setSearchValue] = useState("");

    const [paginate, setPaginate] = useState({
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

    const searchAttendanceExcuse = (search) => {
        setSearchValue(search);
        debounce(() => {
            fetchAttendanceExcuse(status, 1, search);
        }, 500);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUserData) fetchAttendanceExcuse(status);
    }, [currentUserData, status]);

    const hoverColors = {
            CIT: " hover:bg-[#621668]",
            COE: "hover:bg-[#020180]",
            COC: "hover:bg-[#660A0A]",
            COT: "hover:bg-[#847714]",
            ESAF: "hover:bg-[#6F3306]",
            SSC: "hover:bg-[#174515]"
    };
    const hoverColor = hoverColors[currentUserData?.department_code] || "hover:bg-[#174515]";
    const [selectedStudent, setSelectedStudent] = useState(null);

    const formatDateStr = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
    }


    return (
        <>
        {viewLetter.isVisible &&(
            <>
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                    <Letter code={currentUserData?.department_code} formatDateStr={formatDateStr} ref={viewLetterRef} data={selectedStudent}  onAnimationEnd={viewLetter.handleEnd} animate={viewLetter.animation} onClose={() => viewLetter.setAnimation("fade-out")} />
                </div>
            </>
        )}


        {loading ? (
            <>
            <SkeletonHeader />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                    <div className="w-80 rounded-md bg-gray-200 animate-pulse"></div>
                    <div className={`flex items-center lg:px-0 md:px-0`}>
                        <div className="w-80 h-8 bg-gray-200 animate-pulse rounded-md"></div>
                    </div>
                </div>

                <div className=' w-[100%] mt-3 '>
                    <div className={`lg:ml-70  flex justify-start font-[family-name:Arial] gap-2.5`}>
                       <div className="w-50 h-4 animate-pulse bg-gray-200 rounded-md"></div>
                    </div>
                    <SkeletonTable/>
                </div>
            </div>
            <div className="lg:block hidden">
                <SkeletonSidebar />
            </div>  
            </>
        ) : (
            <>
            <CITHeader code={currentUserData?.department_code} titleCouncil={currentUserData?.organization_name} abb="CIT Council" />

            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                    <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Manage Excuse Approval</h2>
                    <div className={`flex ${animateR} items-center lg:px-0 md:px-0`}>
                        <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 border-black lg:mt-0 md:mt-0 mt-4 block' type="text" onKeyUp={(e)=>{searchAttendanceExcuse(e.target.value)}} placeholder='Search Student' />
                    </div>
                </div>

                <div className=' w-[100%] mt-3 '>
                    <div className={`lg:ml-70 ${animateL} flex justify-start font-[family-name:Arial] gap-2.5`}>
                        <select className={`bg-white ${hoverColor} w-25 text-xs transition duration-100 hover:scale-105 hover:text-white cursor-pointer border-1  py-1  rounded-md text-center`} onChange={(e)=>{setStatus(e.target.value)}}   name="" id="">
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <TableExcuse formatDateStr={formatDateStr} fetchAttendanceExcuse={fetchAttendanceExcuse} status={status} paginate={paginate} excuses={attendanceExcuses} viewLetter={(row) =>{
                        viewLetter.toggle();
                        setSelectedStudent(row);
                    }}  code={currentUserData?.department_code} />
                </div>
            </div>
             <div className="hidden lg:block">
                <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.department_code} />
            </div>
            </>
        )}

       
        </>
    );
}

export default CITExcuse;
