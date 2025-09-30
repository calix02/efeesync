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
        <Header code={currentUserData?.department_code} title = {currentUserData?.department_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-semibold ml-6">Financial Report</h2>
            </div>
            
            <div className="lg:ml-70 gap-6 lg:px-6 md:px-10 px-3 flex lg:flex-row flex-col mt-2">
                <FinancialTable title="Cash Inflow" financialData={cashInFlow}/>
                <FinancialTable title="Cash Outflow" financialData={cashOutFlow}/>
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar code ={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default FinancialReport;