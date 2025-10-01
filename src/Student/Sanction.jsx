import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import Monetary from "../student_components/Monetary.jsx";
import CommunityService from "../student_components/CommunityService.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import {useState, useEffect} from "react";
import it from '../assets/it.png';


function Sanction(){

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
       
    return(
        <>
        <Header code={currentUserData?.department_code} title ={currentUserData?.department_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-semibold ml-6">My Sanction</h2>
            </div>
            <div className="lg:ml-70 lg:px-8 md:px-6 px-3 ">
                <div className=" bg-white rounded-lg w-100% h-15 border-2 border-[#621668] text-[#621668] shadow-[2px_2px_3px_grey] mt-4 text-lg font-[family-name:arial] font-semibold flex items-center p-3">
                    <span>Total Sanctions Paid: P {sanctionData?.total_sanctions_paid}.00</span>
                </div>
            </div>
            <div className="lg:ml-70 grid lg:grid-cols-2 px-8 md:grid-cols-2 gap-6 mt-6">
                <Monetary monetarySanction={sanctionData?.monetary_sanctions}/>
                <CommunityService communityService={sanctionData?.community_service} />

            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar  code={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default Sanction;