import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import Monetary from "../student_components/Monetary.jsx";
import CommunityService from "../student_components/CommunityService.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import {useState, useEffect} from "react";
import it from '../assets/it.png';
import "../animate.css";
import { errorAlert} from '../utils/alert.js';



function Sanction(){
    const animate = "card-In";
    const animateL = "left-In";
    const animateR = "right-In";

    const [currentUserData, setCurrentUserData] = useState([]);
    const [sanctionData, setSanctionData] = useState({
            "monetary_sanctions": [],
            "community_service": [],
            "total_sanction_balance": 0,
            "total_sanctions_paid": 0
        });

        const fetchSanctionData = async () => {
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
            }
        }

        const formatDateStr = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
        }

            
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
                fetchSanctionData();
            }, []);
    const colors = {
            CIT: "border-[#621668] text-[#621668] bg-[#621668]",
            COE: "border-[#020180] text-[#020180] bg-[#020180]",
            COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COT: "border-[#847714] text-[#847714] bg-[#847714]",
            ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]"
        };
    const color = colors[currentUserData?.department_code] || "border-[#174515] text-[#174515] bg-[#174515]";
    
    return(
        <>
        <Header code={currentUserData?.department_code} title ={currentUserData?.department_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3 ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-poppins font-semibold ">My Sanction</h2>
            </div>
            <div className="lg:ml-70 ">
                <div className={` ${animate} bg-white ${color} rounded-lg w-100% h-15 border-2  shadow-[2px_2px_3px_grey] mt-4 text-lg font-[family-name:arial] font-semibold flex items-center p-3`}>
                    <span>Total Sanctions Paid: P {sanctionData?.total_sanctions_paid}</span>
                </div>
            </div>
            <div className="lg:ml-70 grid lg:grid-cols-2  md:grid-cols-2 gap-6 mt-6">
                <Monetary formatDateStr={formatDateStr} animate={animateL} code={currentUserData?.department_code} monetarySanction={sanctionData?.monetary_sanctions}/>
                <CommunityService formatDateStr={formatDateStr} animate={animateR} communityService={sanctionData?.community_service} />

            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar  code={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default Sanction;