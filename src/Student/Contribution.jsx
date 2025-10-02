import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import PaidCard from "../student_components/PaidCard.jsx";
import UnpaidCard from "../student_components/UnpaidCard.jsx";
import Unsettled from "../student_components/Unsettled.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import {useState, useEffect} from 'react';
import it from '../assets/it.png';
import "../animate.css";


function Contribution(){
    const animate = "card-In";

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

            const [contributionStatus, setContributionStatus] = useState({
                "total_fees_paid": 0,
                "paid_events": [],
                "unpaid_events": [],
                "unsettled_events": []
            });

            const fetchContributionStatus = async () => {
                try {
                    const res = await fetch(`/api/students/current/contribution/status`, {
                        credentials: "include"
                    });
                    const response = await res.json();
                    if (response.status === "success") {
                        setContributionStatus(response.data);
                    }
                } catch (err) {
                    errorAlert("Fetch Failed");
                }
            }

            useEffect(() => {
                fetchCurrentUser();
                fetchContributionStatus();
            }, []);
       
    return(
        <>
        <Header code={currentUserData?.department_code} title = {currentUserData?.department_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-poppins  font-semibold ">My Contributions</h2>
            </div>
            <div className="lg:ml-70 px-8 ">
                {/**
                <div className={` ${animate} bg-white rounded-lg w-100% h-15 border-2 border-[#621668] text-[#621668] shadow-[2px_2px_3px_grey] mt-4 text-lg font-[family-name:arial] font-semibold flex items-center p-3`}>
                    <span>Total Fees Paid: P {contributionStatus?.total_fees_paid}</span>
                </div>
                 */}
            </div>
            <div className={`lg:ml-70 lg:grid md:grid lg:grid-cols-3 md:grid-cols-2 flex flex-col gap-8 mt-8 `}>
                <PaidCard total={contributionStatus?.total_fees_paid} paidEvents={contributionStatus?.paid_events} />
                <UnpaidCard unpaidEvents={contributionStatus?.unpaid_events}/>
                <Unsettled unsettledEvents={contributionStatus?.unsettled_events} />
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar code={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default Contribution;