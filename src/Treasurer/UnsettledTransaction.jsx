import React, { useRef, useState, useEffect } from 'react';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import TableMonetarySanction from '../treasurer_components/TableUnsettledTransaction.jsx';
import UnsettledTransactionsCard from '../treasurer_components/UnsettledTransactionCard.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonSideBar from '../skeletons/SkeletonSidebar.jsx';
import SkeletonTable from '../skeletons/SkeletonTable.jsx';
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";
import "../animate.css";

function  UnsettledTransaction() {
    const animateR = "right-In";
    const animateL = "left-In";
/* ------------------------- Animated States ----------------------------- */
    const unsettledCard = useAnimatedToggle();
    const unsettledCardRef = useRef(null);

    const [selectedStudent, setSelectedStudent] = useState(null);

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
        // keep loading true until fetchSanctionData clears it
    }

    const [sanctionData, setSanctionData] = useState([]);
    const [paginate, setPaginate] = useState({
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 1
    });
    
    const fetchSanctionData = async (page=1, search="") => {
        // ensure we have organization code
        if (!currentUserData?.organization_code) {
            setSanctionData([]);
            setPaginate({
                page: 1,
                per_page: 10,
                total: 0,
                total_pages: 1
            });
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/organizations/code/${encodeURIComponent(currentUserData.organization_code)}/unsettledandsanctions?page=${page}&search=${encodeURIComponent(search)}`, {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setSanctionData(response.data);
                setPaginate(response.meta);
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);
    
    useEffect(() => {
        if (currentUserData) fetchSanctionData();
    }, [currentUserData]);

    useEffect(() => {
        if (selectedStudent) {
            const updated = sanctionData.find(
                (s) => s.student_id === selectedStudent.student_id
            );
            if (updated) {
                setSelectedStudent(updated);
            } else {
                setSelectedStudent(null);
                unsettledCard.setAnimation("fade-out");
            }
        }
    }, [sanctionData]);

    const [debounceTimer, setDebounceTimer] = useState(null);
    const [searchValue, setSearchValue] = useState();
    const debounce = (callback, delay=500)  => {
        clearTimeout(debounceTimer);
        setDebounceTimer(setTimeout(callback, delay));
    }

    const searchSanctions = (search) => {
        setSearchValue(search);
        debounce(() => {
            fetchSanctionData(1, search);
        }, 500);
    };

    const hoverColors = {
        CIT: " hover:bg-[#621668]",
        COE: "hover:bg-[#020180]",
        COC: "hover:bg-[#660A0A]",
        COT: "hover:bg-[#847714]",
        ESAF: "hover:bg-[#6F3306]",
        SSC: "hover:bg-[#174515]"
    };
    const hoverColor = hoverColors[currentUserData?.department_code] || "hover:bg-[#174515]";


    return (
        <>
        {unsettledCard.isVisible &&(
            <>
            <div className="fixed flex justify-center items-center inset-0 bg-[#00000062] z-40 pointer-events-auto">
                <UnsettledTransactionsCard fetchSanctionData={fetchSanctionData} data={selectedStudent} code={currentUserData?.department_code} ref={unsettledCardRef}  onAnimationEnd={unsettledCard.handleEnd} animate={unsettledCard.animation} onClose={() => unsettledCard.setAnimation("fade-out")} />
            </div>
            </>
        )}

        
                {loading ? (
                    <>
                    <SkeletonHeader/>
                    <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                        <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                            <div className="bg-gray-200 animate-pulse w-60 h-8 rounded-md"></div>
                            <div className={`flex ${animateR} items-center lg:px-0 md:px-0 `}>
                                <div className='lg:w-85 md:w-85 w-[100%] animate-pulse p-1.5 bg-gray-200 h-8 rounded-md lg:mt-0 md:mt-0 mt-4  block' > </div>
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
                            <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Manage Unsettled Transactions</h2>
                            <div className={`flex ${animateR} items-center lg:px-0 md:px-0 `}>
                                <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4   border-black block' type="text" onKeyUp={(e)=>{searchSanctions(e.target.value)}} placeholder='Search Student' />
                            </div>
                        </div>
                        <div className="w-100% mt-3">
                            <TableMonetarySanction fetchSanctions={fetchSanctionData} paginate={paginate} sanctions={sanctionData} code={currentUserData?.department_code} view={(row) =>{
                                setSelectedStudent(row);
                                unsettledCard.toggle();
                            }} />
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

export default UnsettledTransaction;
