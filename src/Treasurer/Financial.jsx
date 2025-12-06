import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import FinancialCard from '../other_components/FinancialCard.jsx';
import FinancialTable from '../other_components/FinancialTable.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import CashOutflowCard from '../treasurer_components/CashOutflowCard.jsx';
import EditCashOutflowCard from '../treasurer_components/EditCashOutflowCard.jsx';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import SkeletonSideBar from '../skeletons/SkeletonSidebar.jsx';
import SkeletonFinancialTable from '../skeletons/SkeletonFinancialTable.jsx';
import SkeletonModal from '../skeletons/SkeletonModal.jsx';
import {useState, useEffect, useRef} from 'react';
import {confirmAlert,successAlert, errorAlert, okAlert} from "../utils/alert.js";
import AddCashOnBank from '../treasurer_components/AddCashOnBank.jsx';
import EditCashOnBank from '../treasurer_components/EditCashOnBank.jsx';

import "../animate.css";
import EfeeViolet from '../assets/violetlogo.png'

function CITFinancial(){
    document.title="Financial Report";
    const animate = "card-In";
    const animateR = "right-In";
    const animateL = "left-In";

    const add = useAnimatedToggle();
    const addRef = useRef(null);

    const edit = useAnimatedToggle();
    const editRef = useRef(null);

    const addBank = useAnimatedToggle();
    const bankRef = useRef(null);

    const editBank = useAnimatedToggle();
    const editBankRef = useAnimatedToggle();
    
    const[selectedCashOut, setSelectedCashOut] = useState(null);
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");
    const [cashBank, setCashBank] = useState(0);

    const handleCashBank = (amount) =>{
        setCashBank(Number(cashBank) + Number(amount));
    }
    const handleEditCashBank = (amount) =>{
        setCashBank(Number(amount))
    }

    const [currentUserData, setCurrentUserData] = useState(() => {
        const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });

    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingFinancial, setLoadingFinancial] = useState(true);

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
           // errorAlert("Fetch Failed");
        }finally{
            setLoadingUser(false);
        }
        // keep loading true until financial data fetch clears it
    }
        
    const [financialReportData, setFinancialReportData] = useState({
        "cash_in": [],
        "cash_out": [],
        "summary": {}
    });

    const fetchFinancialReportData = async () => {
        // ensure we have organization code
        if (!currentUserData?.organization_code) {
            setFinancialReportData({
                cash_in: [],
                cash_out: [],
                summary: {}
            });
            return;
        }

        setLoadingFinancial(true);
        try {
            const res = await fetch(`/api/organizations/code/${encodeURIComponent(currentUserData.organization_code)}/financialreport`, { credentials: "include" });
            const response = await res.json();
            if (response.status === "success") {
                setFinancialReportData(response.data);
            }
        } catch (err) {
           // errorAlert("Fetch Failed");
        } finally {
            setLoadingFinancial(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUserData) fetchFinancialReportData();
    }, [currentUserData]);
    
    const hoverColors = {
        CITSC: " hover:bg-[#621668]",
        CESC: "hover:bg-[#020180]",
        CCSC: "hover:bg-[#660A0A]",
        COTSC: "hover:bg-[#847714]",
        SCEAP: "hover:bg-[#6F3306]",
        SSC: "hover:bg-[#174515]"
    };
    const hoverColor = hoverColors[currentUserData?.organization_code] || "hover:bg-[#174515]";


    return(
        <>
        {addBank.isVisible &&(
             <div className="fixed inset-0 flex justify-center items-center bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                <AddCashOnBank data={handleCashBank}  code={currentUserData?.organization_code} ref={bankRef}   onAnimationEnd={addBank.handleEnd} animate={addBank.animation} onClose={() => addBank.setAnimation("fade-out")} />
            </div>

        )}
         {editBank.isVisible &&(
             <div className="fixed inset-0 flex justify-center items-center bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                <EditCashOnBank data={handleEditCashBank} bankAmount={cashBank}   code={currentUserData?.organization_code} ref={editBankRef}   onAnimationEnd={editBank.handleEnd} animate={editBank.animation} onClose={() => editBank.setAnimation("fade-out")} />
            </div>

        )}
        {add.isVisible &&(
            <div className="fixed inset-0 flex justify-center items-center bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                <CashOutflowCard code={currentUserData?.organization_code} ref={addRef} fetchFinancialReportData={fetchFinancialReportData} currentUserData={currentUserData} onAnimationEnd={add.handleEnd} animate={add.animation} onClose={() => add.setAnimation("fade-out")} />
            </div>
        )}
        {edit.isVisible &&(
            <div className="fixed inset-0 flex justify-center items-center bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                {loadingFinancial ? (
                    <SkeletonModal ref={editRef} onAnimationEnd={edit.handleEnd} animate={edit.animation} onClose={() => edit.setAnimation("fade-out")} />
                ) : (
                    <EditCashOutflowCard data={selectedCashOut} code={currentUserData?.organization_code} fetchFinancialReportData={fetchFinancialReportData} ref={editRef} currentUser={currentUserData} currentUserData={currentUserData} onAnimationEnd={edit.handleEnd} animate={edit.animation} onClose={() => edit.setAnimation("fade-out")} />
                )}
            </div>
        )}
            
        
            <>
            {loadingUser ? ( 
                <SkeletonHeader/>
            ) :(
                <CITHeader code={currentUserData?.organization_code} titleCouncil = {currentUserData?.organization_name} abb="CIT Council" />
            )}
            <div className="w-screen hide-scrollbar h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70">
                    <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Financial Report</h2>
                </div>
                <div className={`lg:ml-70 mt-5 ${animateL} flex lg:flex-row flex-col-reverse justify-between gap-2.5`}>
                    <div className=" flex gap-5">
                        <select className={`bg-white ${hoverColor} w-50 lg:text-sm text-xs font-poppins rounded-2xl font-semibold transition duration-200 hover:scale-107 hover:text-white cursor-pointer border border-[#e0e0e0] shadow-[2px_2px_1px_gray]  py-2   text-center`}    name="" id="" onChange={(e) => setYear(e.target.value)}>
                            <option value="">-- Academic Year --</option>
                            <option value="Okieee">Okieee</option>
                        </select>
                        <select className={`bg-white ${hoverColor} w-50 lg:text-sm text-xs font-poppins rounded-2xl font-semibold transition duration-200 hover:scale-107 hover:text-white cursor-pointer border border-[#e0e0e0] shadow-[2px_2px_1px_gray]  py-2   text-center`}    name="" id="" onChange={(e) => setSemester(e.target.value)}>
                            <option value="">-- Semester --</option>
                            <option value="Okieee">Okieee</option>
                        </select>
                    </div>
                    <div className="flex w-full gap-3  justify-end items-center">
                        <div className='h-12 lg:w-110 w-full border-[#e0e0e0] border flex items-center px-5 rounded-lg bg-white shadow-[2px_2px_2px_gray]' >
                            <h1 className='font-poppins font-semibold lg:text-lg text-md '>Cash on Bank: ₱{cashBank}</h1>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={addBank.toggle} className={`lg:w-30 w-20 h-10 rounded-md font-poppins lg:text-sm  text-xs bg-white border ${hoverColor} hover:text-white border-[#e0e0e0] font-semibold cursor-pointer hover:scale-105 transition duration-300 shadow-[2px_2px_1px_gray]`}> <i className="fa-solid fa-plus"></i>Add Info</button>
                            <button onClick={editBank.toggle}  className={`w-10 h-10 rounded-md flex items-center justify-center font-poppins lg:text-sm  text-xs bg-white border ${hoverColor} hover:text-white border-[#e0e0e0] font-semibold cursor-pointer hover:scale-105 transition duration-300 shadow-[2px_2px_1px_gray]`}> <span class="material-symbols-outlined">edit_square</span></button>
                        </div>
                    </div>
                    
                </div>
            <div className={` ${animate} lg:ml-70  mt-3 lg:gap-6 gap-3 flex lg:flex-row flex-col items-center justify-center`}>
                {loadingFinancial ? (
                    <>
                    <SkeletonFinancialTable/>
                    <SkeletonFinancialTable/>
                    </>
                ) : (
                <>
                <FinancialTable total={financialReportData?.summary?.total_cash_in} code={currentUserData?.organization_code} title="Cash Inflow" financialData={financialReportData?.cash_in}/>
                <FinancialTable total={financialReportData?.summary?.total_cash_out} code={currentUserData?.organization_code} title="Cash Outflow" financialData={financialReportData?.cash_out} fetchFinancialReportData={fetchFinancialReportData}
                add={add.toggle}
                edit={(row) => {
                    edit.toggle();
                    setSelectedCashOut(row);
                }}/>
                </>
                )}
            </div>
        </div>
        <div className='hidden lg:block'>
            {loadingUser ? (
                <SkeletonSideBar/>
            ) :(
                <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.organization_code} />
            )}
        </div>
        </>
        </>
    );
}
export default CITFinancial;