import React, { useRef, useState, useEffect } from 'react';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableCommunityService from '../treasurer_components/TableCommunityService.jsx';
import { errorAlert, successAlert, okAlert, confirmAlert } from '../utils/alert.js';
import SkeletonSideBar from '../skeletons/SkeletonSidebar.jsx';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonTable from '../skeletons/SkeletonTable.jsx';
import "../animate.css";

function  CommunityService() {
    const animateR = "right-In";
    const animateL = "left-In";
/* ------------------------- Animated States ----------------------------- */

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [comservData, setComservData] = useState([]);

    const [debounceTimer, setDebounceTimer] = useState(null);
        
    const debounce = (callback, delay=500)  => {
        clearTimeout(debounceTimer);
        setDebounceTimer(setTimeout(callback, delay));
    }

    const [paginate, setPaginate] = useState({
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 1
    });
        
    const [currentUserData, setCurrentUserData] = useState(() => {
        const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });

    const [loading, setLoading] = useState(true);
    
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
        // keep loading true until fetchComservData clears it
    }

    const fetchComservData = async (page=1, search="") => {
        if (!currentUserData) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/organizations/code/${encodeURIComponent(currentUserData?.organization_code)}/communityservice?page=${page}&search=${encodeURIComponent(search)}`, {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setComservData(response.data);
                setPaginate(response.meta);
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        } finally {
            setLoading(false);
        }
    }

    const searchStudentsWithComserv = (search) => {
        // setSearchValue(search);
        setLoading(true);
        debounce(() => {
            fetchComservData(1, search);
        }, 500);
    };

    const addComserv = async (event_id, student_id) => {
        if (!currentUserData) return;
        try {
            const res = await fetch(`/api/communityservice/events/${event_id}/student/${student_id}`, {
                method: "POST",
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                fetchComservData(); 
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        }
    }
         
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUserData) fetchComservData();
    }, [currentUserData]);
        
    const hoverColors = {
            CIT: " hover:bg-[#621668]",
            COE: "hover:bg-[#020180]",
            COC: "hover:bg-[#660A0A]",
            COT: "hover:bg-[#847714]",
            ESAF: "hover:bg-[#6F3306]",
            SSC: "hover:bg-[#174515]"
        };
    const hoverColor = hoverColors[currentUserData?.department_code] || "hover:bg-[#174515']";


    return (
        <>
           
                    {loading ? (
                        <>
                        <SkeletonHeader/>
                        <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                            <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                                <div className="w-60 h-8 rounded-md bg-gray-200 animate-pulse"></div>
                                <div className={`flex ${animateR} items-center lg:px-0 md:px-0`}>
                                    <div className='lg:w-85 md:w-85 h-8 w-[100%] p-1.5 bg-gray-200 rounded-md  lg:mt-0 md:mt-0 mt-4 border-black block' ></div>
                                </div>
                            </div>

                            <div className="w-100% mt-3">
                                <SkeletonTable/>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <SkeletonSideBar/>
                        </div>
                        </>

                    ) : (
                        <>
                        <CITHeader code={currentUserData?.department_code} titleCouncil= {currentUserData?.organization_name} abb="CIT Council" />
                        <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                            <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                                <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Manage Community Service</h2>
                                <div className={`flex ${animateR} items-center lg:px-0 md:px-0`}>
                                <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4   border-black block' type="text" onKeyUp={(e)=>{searchStudentsWithComserv(e.target.value)}} placeholder='Search Student' />
                                </div>
                            </div>

                            <div className="w-100% mt-3">
                            <TableCommunityService 
                            paginate={paginate}
                            fetchComservData={fetchComservData}
                            code={currentUserData?.department_code}
                            communityService={comservData}
                            done={(row) =>{
                                setSelectedStudent(row);
                                addComserv(row.event_id, row.student_id);}}/>
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

export default CommunityService;