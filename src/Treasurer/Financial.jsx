import CITHeader from '../other_components/Header_Council.jsx';
import CITSidebar from './Sidebar.jsx';
import FinancialCard from '../other_components/FinancialCard.jsx';
import FinancialTable from '../other_components/FinancialTable.jsx';
import {useState, useEffect} from 'react';
import "../animate.css";
import EfeeViolet from '../assets/violetlogo.png'
function CITFinancial(){
    const animate = "card-In";
    const animateR = "right-In";
    const animateL = "left-In";


     const cashInFlow = Array.from({ length: 16 }, (_, i) => ({
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
            <CITHeader code={currentUserData?.department_code} titleCouncil = {currentUserData?.organization_name} abb="CIT Council" />
             <div className="w-screen hide-scrollbar h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
                <div className="lg:mt-30 mt-25 lg:ml-70">
                    <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Financial Report</h2>

                </div>
                <div className={` ${animate} lg:flex lg:flex-row grid grid-cols-2  lg:ml-70 lg:gap-6 gap-3 lg:justify-center items-center mt-4`}>
                    <FinancialCard title="Cash Inflow" amount="P200 000.00" bgColor="bg-[#FFD8CC]"/>
                    <FinancialCard title="Cash Outflow" amount="P100 000.00" bgColor="bg-[#FCBBD8]"/>
                    <FinancialCard title="Cash On Hand" amount="P50 000.00" bgColor="bg-[#ECCEFC]"/>
                    <FinancialCard title="Cash In Bank" amount="P15 000.00" bgColor="bg-[#E0D2FF]"/>
                    <FinancialCard title="Starting Balance" amount="P10 000.00" bgColor="bg-[#D4E4FF]"/>
                    <FinancialCard title="Ending Balance" amount="P0.00" bgColor="bg-[#CCEBFF]"/>
                </div>
                <div className={` ${animate} lg:ml-70 lg:mt-6 mt-3 lg:gap-6 gap-3 flex lg:flex-row flex-col items-center justify-center`}>
                    <FinancialTable code={currentUserData?.department_code} title="Cash Inflow" financialData={cashInFlow}/>
                    <FinancialTable code={currentUserData?.department_code}  title="Cash Outflow" financialData={cashOutFlow}/>

                </div>

            </div>
            <div className='hidden lg:block'>
                <CITSidebar code={currentUserData?.department_code} />
            </div>
        </>
    );
}
export default CITFinancial;