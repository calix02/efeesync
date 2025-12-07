import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import FinancialTable from "../student_components/FinancialTable.jsx";
import FinancialCard from "../student_components/FinancialCard.jsx";
import SkeletonFinancialTable from "../skeletons/SkeletonFinancialTable.jsx";
import SkeletonHeader from "../skeletons/SkeletonHeader.jsx";
import SkeletonSidebar from "../skeletons/SkeletonSidebar.jsx";
import {useState, useEffect} from "react";
import it from '../assets/it.png';
import { errorAlert} from '../utils/alert.js';
import "../animate.css";


function FinancialReport(){
    document.title="Financial Report";
    const animateL= "left-In";
    const animateR = "right-In";
    const animate = "fade-In";
    
    const [currentUserData, setCurrentUserData] = useState(() => {
    const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });
    const [userLoading, setUserLoading] = useState(true);
    const [financialLoading, setFinancialLoading] = useState(true);
    const [cashBank, setCashBank] = useState(0);
    
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
            //errorAlert("Fetch Failed");
        }finally{
            setUserLoading(false);
        }
    }
    
            const [financialReportData, setFinancialReportData] = useState({
            "cash_in": [],
            "cash_out": [],
            "summary": {}
        });
        const fetchFinancialReportData = async () => {
            setFinancialLoading(true);
            try {
                const res = await fetch(`/api/organizations/code/${currentUserData?.organization_code}/financialreport`, { credentials: "include" });
                const response = await res.json();
                if (response.status === "success") {
                    setFinancialReportData(response.data);
                }
            } catch (err) {
              //  errorAlert("Fetch Failed");
            }finally{
                setFinancialLoading(false);
            }
        };
          useEffect(() => {
            fetchCurrentUser();
          }, []);

          useEffect(() => {
            fetchFinancialReportData();
          }, [currentUserData]);

            const colors = {
            CITSC: "border-[#621668] text-[#621668] ",
            CESC: "border-[#020180] text-[#020180] ",
            CCSC: "border-[#660A0A] text-[#660A0A] ",
            COTSC: "border-[#847714] text-[#847714] ",
            SCEAP: "border-[#6F3306] text-[#6F3306] ",
            SSC: "border-[#174515] text-[#174515] "
        };
    const color = colors[currentUserData?.organization_code] || "border-[#174515] text-[#174515] ";
       
    return(
        <>
        {userLoading ? (
            <SkeletonHeader/>
         ) : (
            <Header code={currentUserData?.organization_code} title = {currentUserData?.department_name}/>
        )}
        <div className="w-screen h-screen bg-[#F8F8F8] pb-5 absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-poppins font-semibold ">Financial Report</h2>
            </div>
            <div className="lg:ml-70">
                <div className={`h-14 ${animate} rounded-lg border mt-5 shadow-[2px_2px_2px_gray] flex items-center px-5 w-full bg-white`}>
                    <h1 className="font-poppins font-semibold text-xl">Cash on Bank:  <span className={`${color}`}>₱ {cashBank}</span></h1>
                </div>

            </div>
            
            <div className="lg:ml-70 gap-6  flex lg:flex-row flex-col mt-2">
                {financialLoading ? (
                    <>
                        <SkeletonFinancialTable/>
                        <SkeletonFinancialTable/>

                    </>
                ) : (
                <>
                    <FinancialTable animate={animateL} title="Cash Inflow" total={financialReportData?.summary?.total_cash_in} financialData={financialReportData?.cash_in}/>
                    <FinancialTable animate={animateR} title="Cash Outflow" total={financialReportData?.summary?.total_cash_out} financialData={financialReportData?.cash_out}/>
                </>
                )}
            </div>
            
        </div>
             <div className='lg:block hidden' >
                {userLoading? (
                    <SkeletonSidebar/>
                 ) : (
                    <Sidebar code ={currentUserData?.organization_code} />
                 )}
            </div>

        </>
    );
}
export default FinancialReport;