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
            useEffect(() => {
                fetchCurrentUser();
                console.log(currentUserData);
            }, []);
       
    return(
        <>
        <Header code={currentUserData?.department_code} title = {currentUserData?.organization_name}/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-semibold ml-6">My Contributions</h2>
            </div>
            <div className="lg:ml-70 px-8 ">
                <div className={` ${animate} bg-white rounded-lg w-100% h-15 border-2 border-[#621668] text-[#621668] shadow-[2px_2px_3px_grey] mt-4 text-lg font-[family-name:arial] font-semibold flex items-center p-3`}>
                    <span>Total Fees Paid: P1,250.00</span>
                </div>
            </div>
            <div className={`lg:ml-70 lg:grid md:grid lg:grid-cols-3 md:grid-cols-2 flex flex-col gap-8 mt-8 px-8`}>
              
                <PaidCard/>
                <UnpaidCard/>
                <Unsettled/>
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar code={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default Contribution;