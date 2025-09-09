import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import FinancialTable from "../student_components/FinancialTable.jsx";
import FinancialCard from "../student_components/FinancialCard.jsx";
import {useState, useEffect} from "react";
import it from '../assets/it.png';


function FinancialReport(){
     const cashInFlow = Array.from({ length: 5 }, (_, i) => ({
        date: `11-22-25`,
        event: `Baraylihan`,
        fee: "350",
    })); 
    const cashOutFlow = Array.from({ length: 3 }, (_, i) => ({
        date: `11-22-25`,
        event: `IT Week`,
        fee: "400",
    }));
    
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
            useEffect(() => {
                fetchCurrentUser();
                console.log(currentUserData);
            }, []);
       
    return(
        <>
        <Header code={currentUserData?.department_code} titleCouncil = {currentUserData?.organization_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-semibold ml-6">Financial Report</h2>
            </div>
            <div className="lg:ml-70 flex gap-6 px-6 mt-6">
                <FinancialCard title="Cash Inflow" amount="P200,000.00" bgColor="bg-[#FFD8CC]"/>
                <FinancialCard title="Cash Outflow" amount="P200,000.00" bgColor="bg-[#FCBBD8]"/>
                <FinancialCard title="Current Funds" amount="P200,000.00" bgColor="bg-[#ECCEFC]"/>
            </div>
            <div className="lg:ml-70 mt-2 flex gap-4 justify-end px-6 font-semibold text-sm">
                <select className="w-35  h-7 bg-white px-4 border-1 border-[#621668] rounded-sm" name="" id="">
                    <option value="">Semester</option>
                </select>
                <select className="w-35  h-6 bg-white px-4 border-1 border-[#621668] rounded-sm" name="" id="">
                    <option value="">S/Y</option>
                </select>
            </div>
            <div className="lg:ml-70 gap-6 px-6 flex mt-2">
                <FinancialTable title="Cash Inflow" financialData={cashInFlow}/>
                <FinancialTable title="Cash Inflow" financialData={cashOutFlow}/>

            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeViolet} code ="cit"/>
            </div>

        </>
    );
}
export default FinancialReport;