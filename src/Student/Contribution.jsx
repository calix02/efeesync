import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import PaidCard from "../student_components/PaidCard.jsx";
import UnpaidCard from "../student_components/UnpaidCard.jsx";
import Unsettled from "../student_components/Unsettled.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import {useState, useEffect, useRef} from 'react';
import SendPayment from "../student_components/SendPayment.jsx";
import useAnimatedToggle from "../hooks/useAnimatedToggle.js";
import SkeletonHeader from "../skeletons/SkeletonHeader.jsx";
import SkeletonBox from "../skeletons/SkeletonBox.jsx";
import SkeletonSidebar from "../skeletons/SkeletonSidebar.jsx";
import it from '../assets/it.png';
import "../animate.css";
import { errorAlert} from '../utils/alert.js';
import { use } from "react";



function Contribution(){
    document.title="Contributions";
    const animate = "card-In";
    const [userLoading, setUserLoading] = useState(true);
    const [contributionLoading, setContributionLoading] = useState(true);

    const [currentUserData, setCurrentUserData] = useState(() => {
    const saved = localStorage.getItem("currentUserData");
        return saved ? JSON.parse(saved) : null;
    });
    
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
           // errorAlert("Fetch Failed");
        }finally{
            setUserLoading(false);
        }
    }

            const [contributionStatus, setContributionStatus] = useState({
                "total_fees_paid": 0,
                "total_fees_unpaid": 0,
                "total_fees_unsettled": 0,
                "paid_events": [],
                "unpaid_events": [],
                "unsettled_events": []
            });

            const fetchContributionStatus = async () => {
                setContributionLoading(true);
                try {
                    const res = await fetch(`/api/students/current/contribution/status`, {
                        credentials: "include"
                    });
                    const response = await res.json();
                    if (response.status === "success") {
                        setContributionStatus(response.data);
                    }
                } catch (err) {
                  //  errorAlert("Fetch Failed");
                }finally{
                    setContributionLoading(false);
                }
            }

            const formatDateStr = (dateString) => {
                return new Date(dateString).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
            }

            useEffect(() => {
                fetchCurrentUser();
                fetchContributionStatus();
            }, []);

        const sendPayment = useAnimatedToggle();
        const paymentRef = useRef(null);
        const [selectedEvent, setSelectedEvent] = useState(null);
       
    return(
        <>
        {sendPayment.isVisible && (
          
             <div className="fixed lg:z-40 md:z-50 z-70 flex justify-center items-center  inset-0 bg-[#00000062] pointer-events-auto">
                <SendPayment fetchContributionStatus={fetchContributionStatus} data={selectedEvent} code={currentUserData?.organization_code} ref={paymentRef} onAnimationEnd={sendPayment.handleEnd} onClose={()=> sendPayment.setAnimation("fade-out")} animate={sendPayment.animation} />  
            </div>
        )}
        {userLoading ? (
            <SkeletonHeader/>
        ) : (
            <Header code={currentUserData?.organization_code} title = {currentUserData?.department_name}/>
        )}
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
                {contributionLoading ? (
                    <>
                    <SkeletonBox height="h-130" mt="mt-0"/>
                    <SkeletonBox height="h-130" mt="mt-0"/>
                    <SkeletonBox height="h-130" mt="mt-0"/>
                    </>

                ) : (
                <>
                <PaidCard formatDateStr={formatDateStr} total={contributionStatus?.total_fees_paid} paidEvents={contributionStatus?.paid_events} />
                <UnpaidCard pay={(data)=>{sendPayment.toggle(); setSelectedEvent(data); }} formatDateStr={formatDateStr} total={contributionStatus?.total_fees_unpaid} unpaidEvents={contributionStatus?.unpaid_events}/>
                <Unsettled formatDateStr={formatDateStr} total={contributionStatus?.total_fees_unsettled} unsettledEvents={contributionStatus?.unsettled_events} />
                </>
                )}
            </div>
            
        </div>
             <div className='lg:block hidden' >
                {userLoading ? (
                    <SkeletonSidebar/>
                ) : (
                 <Sidebar code={currentUserData?.organization_code} />
                 )}
            </div>

        </>
    );
}
export default Contribution;