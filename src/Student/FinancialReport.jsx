import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import FinancialTable from "../student_components/FinancialTable.jsx";
import FinancialCard from "../student_components/FinancialCard.jsx";
import {useState, useEffect} from "react";
import it from '../assets/it.png';
import { errorAlert} from '../utils/alert.js';
import "../animate.css";


function FinancialReport(){
    const animateL= "left-In";
    const animateR = "right-In";
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
        <Header code={currentUserData?.department_code} title = {currentUserData?.department_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-poppins font-semibold ">Financial Report</h2>
            </div>
            
            <div className="lg:ml-70 gap-6  flex lg:flex-row flex-col mt-2">
                <FinancialTable animate={animateL} title="Cash Inflow" total={financialReportData?.summary?.total_cash_in} financialData={financialReportData?.cash_in}/>
                <FinancialTable animate={animateR} title="Cash Outflow" total={financialReportData?.summary?.total_cash_out} financialData={financialReportData?.cash_out}/>
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar code ={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default FinancialReport;