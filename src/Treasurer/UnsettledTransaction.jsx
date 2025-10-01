import React, { useRef, useState, useEffect } from 'react';
import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import EfeeViolet from '../assets/violetlogo.png';
import TableMonetarySanction from '../treasurer_components/TableUnsettledTransaction.jsx';
import TableCommunityService from '../treasurer_components/TableCommunityService.jsx';
import UnsettledTransactionsCard from '../treasurer_components/UnsettledTransactionCard.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import { errorAlert } from '../utils/alert.js';
import "../animate.css";
function  UnsettledTransactions() {
    const animateR = "right-In";
    const animateL = "left-In";
/* ------------------------- Animated States ----------------------------- */
    const unsettledCard = useAnimatedToggle();
    const unsettledCardRef = useRef(null);

    const [selectedSanction, setSelectedSanction] = useState("Monetary Sanction");
    const [selectedStudent, setSelectedStudent] = useState(null);


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

        const [sanctionData, setSanctionData] = useState([]);
        const [paginate, setPaginate] = useState({
            page: 1,
            per_page: 10,
            total: 0,
            total_pages: 1
        });
        
        const fetchSanctionData = async (page=1, search="") => {
            if (!currentUserData) return;
            try {
                const res = await fetch(`/api/organizations/code/${currentUserData?.organization_code}/unsettledandsanctions?page=${page}&search=${search}`, {
                    credentials: "include"
                });
                const response = await res.json();
                if (response.status === "success") {
                    setSanctionData(response.data);
                    setPaginate(response.meta);
                }
            } catch (err) {
                errorAlert("Fetch Failed");
            }
        }

        useEffect(() => {
            fetchCurrentUser();
        }, []);
        
        useEffect(() => {
            fetchSanctionData();
        }, [currentUserData]);

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
                <UnsettledTransactionsCard data={selectedStudent} code={currentUserData?.department_code} ref={unsettledCardRef}  onAnimationEnd={unsettledCard.handleEnd} animate={unsettledCard.animation} onClose={() => unsettledCard.setAnimation("fade-out")} />
            </div>
            </>
        )
           
        }
            <CITHeader code={currentUserData?.department_code} titleCouncil= {currentUserData?.organization_name} abb="CIT Council" />

            <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70 lg:flex md:flex  md:justify-between   lg:justify-between">
                    <h2 className="text-2xl font-[family-name:Futura Bold] font-semibold">Manage Unsettled Transactions</h2>
                    <div className={`flex ${animateR} items-center lg:px-0 md:px-0 px-3`}>
                    <input className='lg:w-85 md:w-85 w-[100%] p-1.5 bg-white rounded-md border-2 lg:mt-0 md:mt-0 mt-4   border-[#8A2791] block' type="text" onKeyUp={(e)=>{searchSanctions(e.target.value)}} placeholder='Search Student' />
                    </div>
                </div>

                <div className="w-100% mt-3">
                    {/** 
                    <div className={`lg:ml-70 ${animateL} flex lg:justify-start md:justify-start justify-center gap-2.5`}>
                        <select
                            className={`bg-white w-35 ${hoverColor}  border-1  transition duration-100 hover:scale:105  hover:text-white cursor-pointer py-1 font-semibold  rounded-md text-xs text-center`}
                            value={selectedSanction}
                            onChange={(e) => setSelectedSanction(e.target.value)}
                        >
                            <option value="Monetary Sanction">Monetary Sanction</option>
                            <option value="Community Service">Community Service</option>
                        </select>

                        <select className={`bg-white ${hoverColor} lg:w-25 w-20 border-1 cursor-pointer  py-1 font-semibold transition duration-100  hover:scale-100 hover:text-white rounded-md text-xs text-center`}>
                            <option value="">Year</option>
                            <option value="">hey</option>
                        </select>

                         <select className={`bg-white ${hoverColor} lg:w-25 w-20 border-1 cursor-pointer  py-1 font-semibold transition duration-100  hover:scale-100 hover:text-white rounded-md text-xs text-center`}>
                            <option value="">Section</option>
                            <option value="">hey</option>
                        </select>
                    </div>
                    */}
                  
                    <TableMonetarySanction fetchSanctions={fetchSanctionData} paginate={paginate} sanctions={sanctionData} code={currentUserData?.department_code} view={(row) =>{
                        setSelectedStudent(row);
                        unsettledCard.toggle();
                    }}  />
                    
                </div>
                
            </div>

            <div className="hidden lg:block">
                <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.department_code} />
            </div>
        </>
    );
}

export default UnsettledTransactions;
