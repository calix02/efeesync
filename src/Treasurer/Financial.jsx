import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import FinancialCard from '../other_components/FinancialCard.jsx';
import FinancialTable from '../other_components/FinancialTable.jsx';
import useAnimatedToggle from '../hooks/useAnimatedToggle.js';
import CashOutflowCard from '../treasurer_components/CashOutflowCard.jsx';
import EditCashOutflowCard from '../treasurer_components/EditCashOutflowCard.jsx';
import {useState, useEffect, useRef} from 'react';
import "../animate.css";
import EfeeViolet from '../assets/violetlogo.png'
function CITFinancial(){
    const animate = "card-In";
    const animateR = "right-In";
    const animateL = "left-In";

    const add = useAnimatedToggle();
    const addRef = useRef(null);

    const edit = useAnimatedToggle();
    const editRef = useRef(null);
    
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
        
        const [financialReportData, setFinancialReportData] = useState({
            "cash_in": [],
            "cash_out": [],
            "summary": {}
        });
        const fetchFinancialReportData = async () => {
            try {
                const res = await fetch(`/api/organizations/code/${currentUserData?.organization_code}/financialreport`, { credentials: "include" });
                const response = await res.json();
                if (response.status === "success") {
                    setFinancialReportData(response.data);
                }
            } catch (err) {
                errorAlert("Fetch Failed");
            }
        };
          useEffect(() => {
            fetchCurrentUser();
          }, []);

          useEffect(() => {
            fetchFinancialReportData();
          }, [currentUserData]);
    return(
        <>
        {add.isVisible &&(
            <div className="fixed inset-0 flex justify-center items-center bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                <CashOutflowCard code={currentUserData?.department_code} ref={addRef} currentUser={currentUserData}  onAnimationEnd={add.handleEnd} animate={add.animation} onClose={() => add.setAnimation("fade-out")} />
            </div>
        )}
         {edit.isVisible &&(
            <div className="fixed inset-0 flex justify-center items-center bg-[#00000062]  lg:z-40 md:z-50 z-70 pointer-events-auto">
                <EditCashOutflowCard code={currentUserData?.department_code} ref={editRef} currentUser={currentUserData}  onAnimationEnd={edit.handleEnd} animate={edit.animation} onClose={() => edit.setAnimation("fade-out")} />
            </div>
        )}
            <CITHeader code={currentUserData?.department_code} titleCouncil = {currentUserData?.organization_name} abb="CIT Council" />
             <div className="w-screen hide-scrollbar h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70">
                    <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Financial Report</h2>

                </div>
                <div className={` ${animate} lg:ml-70 lg:mt-6 mt-3 lg:gap-6 gap-3 flex lg:flex-row flex-col items-center justify-center`}>
                    <FinancialTable  total={financialReportData?.summary?.total_cash_in} code={currentUserData?.department_code} title="Cash Inflow" financialData={financialReportData?.cash_in}/>
                    <FinancialTable total={financialReportData?.summary?.total_cash_out} add={add.toggle} edit={edit.toggle} code={currentUserData?.department_code}  title="Cash Outflow" financialData={financialReportData?.cash_out}/>

                </div>

            </div>
            <div className='hidden lg:block'>
                <CITSidebar isUnivWide={currentUserData?.university_wide_org} code={currentUserData?.department_code} />
            </div>
        </>
    );
}
export default CITFinancial;