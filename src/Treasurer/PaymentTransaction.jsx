import React, { useRef, useState, useEffect } from 'react';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import ProofPayment from '../treasurer_components/ProofPayment.jsx';
import TablePaymentTransaction from '../treasurer_components/TablePaymentTransaction.jsx';
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";
import "../animate.css";
function PaymentTransaction() {
    const animateR = "right-In";
    const animateL = "left-In";

     const [currentUserData, setCurrentUserData] = useState(() => {
        const saved = localStorage.getItem("currentUserData");
            return saved ? JSON.parse(saved) : null;
        });
    const [selectedStudent, setSelectedStudent] = useState(null);

    const viewProof = useAnimatedToggle();
    const viewProofRef = useRef(null);
        
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
        }, []);

    const hoverColors = {
            CIT: " hover:bg-[#621668]",
            COE: "hover:bg-[#020180]",
            COC: "hover:bg-[#660A0A]",
            COT: "hover:bg-[#847714]",
            ESAF: "hover:bg-[#6F3306]",
            SSC: "hover:bg-[#174515]"
        };
    const hoverColor = hoverColors[currentUserData?.department_code] || "hover:bg-[#174515]";

    const [status, setStatus] = useState("");

    const [onlinePaymentContributions, setOnlinePaymentContributions] = useState([]);
        const fetchOnlineContributions = async (status="", page=1, search="") => {
            if (!currentUserData) return;
            try {
                const res = await fetch(`/api/organizations/code/${currentUserData?.organization_code}/onlinepayments/contributions?page=${page}&search=${search}&status=${status}`, {
                    credentials: "include"
                });
                const response = await res.json();
                if (response.status === "success") {
                    setOnlinePaymentContributions(response.data);
                    setPaginate(response.meta);
                }
            } catch (err) {
                errorAlert("Fetch Failed");
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
    
        const searchOnlineContributions = (search) => {
            setSearchValue(search);
            debounce(() => {
                fetchOnlineContributions(status, 1, search);
            }, 500);
        };

        const formatDateStr = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
        }

        useEffect(() => {
            fetchOnlineContributions(status);
        }, [currentUserData, status]);
        
    return (
        <>
        {viewProof.isVisible && (
            <div className="fixed inset-0 flex justify-center items-center bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                    {/* Overlay */}
                    <ProofPayment formatDateStr={formatDateStr} code={currentUserData?.department_code} ref={viewProofRef} data={selectedStudent} onAnimationEnd={viewProof.handleEnd} animate={viewProof.animation} onClose={() => viewProof.setAnimation("fade-out")} />
                </div>
        )}

            <CITHeader code={currentUserData?.department_code} titleCouncil= {currentUserData?.organization_name} abb="CIT Council" />

            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                    <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Manage Contributions Payment</h2>
                    <div className={`flex ${animateR} items-center lg:px-0 md:px-0 `}>
                    <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4  block' type="text" onKeyUp={(e)=>searchOnlineContributions(e.target.value)} placeholder='Search Student' />
                    </div>
                </div>
               
               <div className=' w-[100%] mt-3 '>
                 
                    <div className={`lg:ml-70 ${animateL} flex justify-start font-[family-name:Arial] gap-2.5`}>
                         <select className={`bg-white w-25 ${hoverColor}  text-xs transition duration-100 hover:scale-100  hover:text-white cursor-pointer border-1 py-1  rounded-md text-center`}  onChange={(e)=>{setStatus(e.target.value)}} name="" id="">
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        {/** 
                         <select className={`bg-white lg:w-25 ${hoverColor}  w-20 text-xs transition duration-100 hover:scale-100  hover:text-white cursor-pointer border-1 py-1  rounded-md text-center`}  name="" id="">
                            <option value="">Sort by</option>
                            <option value="">hey</option>
                        </select> 
                        */}  
                    </div>
                   
                    <TablePaymentTransaction formatDateStr={formatDateStr} paginate={paginate} status={status} payments={onlinePaymentContributions} fetchOnlineContributions={fetchOnlineContributions} viewProof={(row)=>{
                        viewProof.toggle();
                        setSelectedStudent(row)
                        }}  code={currentUserData?.department_code} />
                    
                </div>
            </div>

            <div className="hidden lg:block">
                <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.department_code} />
            </div>
        </>
    );
}

export default PaymentTransaction;
