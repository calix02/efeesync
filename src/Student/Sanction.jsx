import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import Monetary from "../student_components/Monetary.jsx";
import CommunityService from "../student_components/CommunityService.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import {useState, useEffect} from "react";
import SkeletonHeader from "../skeletons/SkeletonHeader.jsx";
import SkeletonBox from "../skeletons/SkeletonBox.jsx";
import SkeletonSideBar from "../skeletons/SkeletonSidebar.jsx";
import it from '../assets/it.png';
import "../animate.css";
import { errorAlert} from '../utils/alert.js';



function Sanction(){
    document.title="Sanctions";
    const animate = "card-In";
    const animateL = "left-In";
    const animateR = "right-In";

    const [userLoading, setUserLoading] = useState(true);
    const [sanctionLoading, setSanctionLoading] = useState(true);

    const [sanctionData, setSanctionData] = useState({
            "monetary_sanctions": [],
            "community_service": [],
            "total_sanction_balance": 0,
            "total_sanctions_paid": 0
        });

        const fetchSanctionData = async () => {
            setSanctionLoading(true);
            try {
                const res = await fetch("/api/students/current/attendance/sanction", {
                    credentials: "include"
                });
                const response = await res.json();
                if (response.status === "success") {
                    setSanctionData(response.data);
                }
            } catch (err) {
                console.error("Fetch Failed");
            }finally{
                setSanctionLoading(false);
            }
        }

        const formatDateStr = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
        }

            
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
            //errorAlert("Fetch Failed");
        }finally{
            setUserLoading(false);
        }
    }
            useEffect(() => {
                fetchCurrentUser();
                fetchSanctionData();
            }, []);
    const colors = {
            CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
            CESC: "border-[#020180] text-[#020180] bg-[#020180]",
            CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
            SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]"
        };
    const color = colors[currentUserData?.organization_code] || "border-[#174515] text-[#174515] bg-[#174515]";
    
    return(
        <>
        {userLoading ? (
            <SkeletonHeader/>
        ) : (
            <Header code={currentUserData?.organization_code} title ={currentUserData?.department_name}/>
         )}
        <div className="w-screen h-screen pb-5 bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-poppins font-semibold ">My Sanction</h2>
            </div>
            <div className="lg:ml-70 ">
                {sanctionLoading ? (
                <div className={`bg-white flex-col gap-3 rounded-lg w-100% h-15 border border-[#f4f4f4]  shadow-[2px_2px_3px_grey] mt-4 text-lg font-[family-name:arial] font-semibold flex  p-3`}>
                    <div className="w-120 h-3 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-100 h-3 bg-gray-200 animate-pulse rounded-full"></div>

                </div>
                ) : (
                <div className={` ${animate} bg-white ${color} rounded-lg w-100% h-15 border-2 font-semibold  shadow-[2px_2px_3px_grey] mt-4 text-lg font-poppins flex items-center p-3`}>
                    <span className="text-black">Total Sanctions Paid: <span className={`${color} text-xl bg-[#fff0]`}>₱{sanctionData?.total_sanctions_paid}</span></span>
                </div>
                )}
            </div>
            <div className="lg:ml-70 grid lg:grid-cols-2  md:grid-cols-2 gap-6 mt-6">
                {sanctionLoading ? (
                    <>
                        <SkeletonBox height="h-120" mt="mt-0"/>
                        <SkeletonBox height="h-120" mt="mt-0"/>
                    </>
                ) : (
               
                <>
                <Monetary formatDateStr={formatDateStr} animate={animateL} code={currentUserData?.organization_code} monetarySanction={sanctionData?.monetary_sanctions}/>
                <CommunityService formatDateStr={formatDateStr} animate={animateR} communityService={sanctionData?.community_service} />
                </>
                 )}
            </div>
            
        </div>
             <div className='lg:block hidden' >
                {userLoading? (
                    <SkeletonSideBar/>
                ) : (
                    <Sidebar  code={currentUserData?.organization_code} />
                 )}
            </div>

        </>
    );
}
export default Sanction;