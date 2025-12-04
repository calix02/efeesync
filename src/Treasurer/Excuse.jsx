import React, { useRef, useState, useEffect } from 'react';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableExcuse from '../treasurer_components/TableExcuse.jsx';
import Letter from '../treasurer_components/Letter.jsx';
import SkeletonTable from '../skeletons/SkeletonTable.jsx';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonSidebar from '../skeletons/SkeletonSidebar.jsx';
import SkeletonModal from '../skeletons/SkeletonModal.jsx';
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";
import "../animate.css";
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';

function CITExcuse() {
    const animateR = "right-In";
    const animateL = "left-In";

    const viewLetter = useAnimatedToggle();
    const viewLetterRef  = useRef(null);

    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingExcuse, setLoadingExcuse] = useState(true);
    const [program, setProgram] = useState("");
    const [year, setYear] = useState("");
    

    const [currentUserData, setCurrentUserData] = useState(() => {
        const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });

    const [status, setStatus] = useState("");

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
        // do not setLoading(false) here — fetchAttendanceExcuse will clear loading when data arrives
    }

    const [attendanceExcuses, setAttendanceExcuses] = useState([]);
    const fetchAttendanceExcuse = async (statusArg = "", page = 1, search = "") => {
        if (!currentUserData) return;
        setLoadingExcuse(true);
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
            setLoadingExcuse(false);
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
            CITSC: " hover:bg-[#621668]",
            CESC: "hover:bg-[#020180]",
            CCSC: "hover:bg-[#660A0A]",
            COTSC: "hover:bg-[#847714]",
            SCEAP: "hover:bg-[#6F3306]",
            SSC: "hover:bg-[#174515]"
    };
    const hoverColor = hoverColors[currentUserData?.organization_code] || "hover:bg-[#174515]";
    const [selectedStudent, setSelectedStudent] = useState(null);

    const formatDateStr = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
    }

   

    
    return (
        <>
        {viewLetter.isVisible &&(
            <>
                <div className="fixed inset-0 flex justify-center items-center bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {loadingExcuse ? (
                        <SkeletonModal ref={viewLetterRef}  onAnimationEnd={viewLetter.handleEnd} animate={viewLetter.animation} onClose={() => viewLetter.setAnimation("fade-out")} />
                    ) : (
                    <Letter code={currentUserData?.organization_code} formatDateStr={formatDateStr} ref={viewLetterRef} data={selectedStudent}  onAnimationEnd={viewLetter.handleEnd} animate={viewLetter.animation} onClose={() => viewLetter.setAnimation("fade-out")} />
                    )}
                </div>
            </>
        )}


            <>
            {loadingUser ? (
                <SkeletonHeader/>
            ) :(
                <CITHeader code={currentUserData?.organization_code} titleCouncil={currentUserData?.organization_name} abb="CIT Council" />
            )}
            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                    <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Manage Excuse Approval</h2>
                    <div className={`flex ${animateR} items-center lg:px-0 md:px-0`}>
                        <input className='lg:w-120 h-12 w-[100%] text-sm bg-white rounded-2xl border-2 border-[#e0e0e0] px-8 shadow-[2px_2px_1px_gray] font-poppins lg:mt-0 md:mt-0 mt-4 block' type="text" onKeyUp={(e)=>{searchAttendanceExcuse(e.target.value)}} placeholder='Search Student' />
                    </div>
                </div>

                <div className=' w-[100%] mt-3 '>
                    <div className={`lg:ml-70 ${animateL} flex justify-start font-[family-name:Arial] gap-2.5`}>
                        <select className={`bg-white ${hoverColor} w-40 lg:text-sm text-xs font-poppins rounded-2xl font-semibold transition duration-200 hover:scale-107 hover:text-white cursor-pointer border border-[#e0e0e0] shadow-[2px_2px_1px_gray]  py-2   text-center`} onChange={(e)=>{setStatus(e.target.value)}}   name="" id="">
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <select className={`bg-white ${hoverColor} w-40 lg:text-sm text-xs font-poppins rounded-2xl font-semibold transition duration-200 hover:scale-107 hover:text-white cursor-pointer border border-[#e0e0e0] shadow-[2px_2px_1px_gray]  py-2   text-center`}    name="" id="" onChange={(e) => setProgram(e.target.value)}>
                            <option value="">-- Program --</option>
                            <option value="Okieee">Okieee</option>
                        </select>
                        <select className={`bg-white ${hoverColor} w-40 lg:text-sm text-xs font-poppins rounded-2xl font-semibold transition duration-200 hover:scale-107 hover:text-white cursor-pointer border border-[#e0e0e0] shadow-[2px_2px_1px_gray]  py-2   text-center`}    name="" id="" onChange={(e) => setYear(e.target.value)}>
                            <option value="">-- Year --</option>
                            <option value="Okieee">Okieee</option>
                        </select>
                        
                    </div>
                    {loadingUser ? (
                        <SkeletonTable/>
                    ) : (
                        <TableExcuse formatDateStr={formatDateStr} fetchAttendanceExcuse={fetchAttendanceExcuse} searchValue={searchValue} status={status} paginate={paginate} excuses={attendanceExcuses} viewLetter={(row) =>{
                            viewLetter.toggle();
                            setSelectedStudent(row);
                        }}  code={currentUserData?.organization_code} />
                    )}
                </div>
            </div>
             <div className="hidden lg:block">
                {loadingUser ? (
                    <SkeletonSidebar/>
                ) : (
                    <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.organization_code} />
                )}
            </div>
            </>
        </>
    );
}

export default CITExcuse;
