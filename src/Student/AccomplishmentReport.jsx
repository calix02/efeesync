import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import AccomplishPic from '../assets/general.jpg';
import AccomplishmentCard from "../other_components/AccomplishmentCard.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import {useState, useEffect} from "react";
import it from '../assets/it.png';
import { errorAlert} from '../utils/alert.js';



function AccomplishmentReport(){

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
                   // errorAlert("Fetch Failed");
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
                <h2 className="text-2xl font-semibold ml-6">Accomplishment Report</h2>
            </div>
            <div className="lg:ml-70 grid lg:grid-cols-2  grid-cols-1 mt-6 px-6 gap-6">
                <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                <AccomplishmentCard AccomplishPic={AccomplishPic}/>

            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar code={currentUserData?.department_code} />
            </div>

        </>
    );
}
export default AccomplishmentReport;