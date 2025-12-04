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

    const [searchValue, setSearchValue] = useState("");

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

    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [program, setProgram] = useState("");
    const [year, setYear] = useState("");
    
    const fetchCurrentUser = async () => {
        try {
            setLoadingUser(true);
            const res = await fetch("/api/users/current", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
               setCurrentUserData(response.data);
               localStorage.setItem("currentUserData", JSON.stringify(response.data));
            }
        } catch (err) {
            //errorAlert("Fetch Failed");
        }finally{
            setLoadingUser(false);
        }
    }

    const fetchComservData = async (page=1, search="") => {
        if (!currentUserData) return;
        setLoadingData(true);
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
            //errorAlert("Fetch Failed");
        } finally {
            setLoadingData(false);
        }
    }

    const searchStudentsWithComserv = (search) => {
        setSearchValue(search);
        setLoadingData(true);
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
           // errorAlert("Fetch Failed");
        }
    }
         
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUserData) fetchComservData();
    }, [currentUserData]);
        
    const hoverColors = {
            CITSC: " hover:bg-[#621668]",
            CESC: "hover:bg-[#020180]",
            CCSC: "hover:bg-[#660A0A]",
            COTSC: "hover:bg-[#847714]",
            SCEAP: "hover:bg-[#6F3306]",
            SSC: "hover:bg-[#174515]"
        };
    const hoverColor = hoverColors[currentUserData?.organization_code] || "hover:bg-[#174515']";


    return (
        <>  
        {loadingUser ? ( 
            <SkeletonHeader/>
        ) : (  
            <CITHeader code={currentUserData?.organization_code} titleCouncil= {currentUserData?.organization_name} abb="CIT Council" />
        )} 
        <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
            <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Manage Community Service</h2>
                <div className={`flex ${animateR} items-center lg:px-0 md:px-0`}>
                <input className='lg:w-120  w-[100%] h-12 bg-white rounded-2xl border lg:mt-0 md:mt-0 mt-4 shadow-[2px_2px_1px_gray] px-8 border-[#e0e0e0] block' type="text" onKeyUp={(e)=>{searchStudentsWithComserv(e.target.value)}} placeholder='Search Student' />
                </div>
            </div>
            <div className={`lg:ml-70 flex ${animateL} justify-start gap-3 mt-5`}>
                <select className={`bg-white ${hoverColor} w-40 lg:text-sm text-xs font-poppins rounded-2xl font-semibold transition duration-200 hover:scale-107 hover:text-white cursor-pointer border border-[#e0e0e0] shadow-[2px_2px_1px_gray]  py-2   text-center`}    name="" id="" onChange={(e) => setProgram(e.target.value)}>
                    <option value="">-- Program --</option>
                    <option value="Okieee">Okieee</option>
                </select>
                <select className={`bg-white ${hoverColor} w-40 lg:text-sm text-xs font-poppins rounded-2xl font-semibold transition duration-200 hover:scale-107 hover:text-white cursor-pointer border border-[#e0e0e0] shadow-[2px_2px_1px_gray]  py-2   text-center`}    name="" id="" onChange={(e) => setYear(e.target.value)}>
                    <option value="">-- Year --</option>
                    <option value="Okieee">Okieee</option>
                </select>
            </div>
            <div className="w-100% mt-3">
            {loadingData ? (
                <SkeletonTable/>
             ) : (   
                <TableCommunityService 
                searchValue={searchValue}
                paginate={paginate}
                fetchComservData={fetchComservData}
                code={currentUserData?.organization_code}
                communityService={comservData}
                done={(row) =>{
                setSelectedStudent(row);
                addComserv(row.event_id, row.student_id);}}/>
            )}
            </div>
        </div>
        <div className="hidden lg:block">
            {loadingUser ? (
                <SkeletonSideBar/>
            ) : (
                <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.organization_code} />
            )}
        </div>
        </>
    );
}

export default CommunityService;