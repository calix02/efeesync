
import TreasurerCard from './TreasurerCard.jsx'
import StudentGraph from '../other_components/Graph.jsx';
import EventChart from './EventChart.jsx';
import '../animate.css';
import { useEffect, useState } from 'react';

function CITDashboard({currentUserData}) {
    const animateGraph = "left-In";
    const animateChart = "right-In";
    const [dashboardData, setDashboardData] = useState({
        "total_events": 0,
        "total_students": 0,
        "total_fees_collected": "0.00",
        "total_sanctions_collected": "0.00",
        "student_population": {
            "total_first_year": "0",
            "total_second_year": "0",
            "total_third_year": "0",
            "total_fourth_year": "0"
        },
        "event_summary": []
    });
    const fetchDashboard = async () => {
        if (!currentUserData) return;
        try {
            const res = await fetch(`/api/organizations/code/${currentUserData?.organization_code}/dashboard`, {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setDashboardData(response.data);
            }
        } catch (err) {
            console.error("Fetch Failed");
        }
    }

    useEffect(() => {
        fetchDashboard();
    }, [currentUserData]);

    const studentPopulation = dashboardData.student_population;
    const data = {
        labels: [' 1st Year', ' 2nd Year', '3rd Year', ' 4th Year'],
        datasets: [
        {
            label: 'students',
            data: [studentPopulation.total_first_year, studentPopulation.total_second_year, studentPopulation.total_third_year, studentPopulation.total_fourth_year],
            backgroundColor: ['#d492f9', '#a659f5', '#7b1fa2', '#4a0072'],
            borderWidth: 0,
            cutout: '50%'
        }
        ]
    };

    const calendar = <i className="fa-solid fa-calendar-days z-[-1]"></i>;
    const cap = <i className="fa-solid fa-graduation-cap z-[-1]"></i>
    const coin = <i className="fa-solid fa-coins z-[-1]"></i>
    const sanc = <i className="fa-solid fa-money-check z-[-1]"></i>
    return(
        <div className="w-screen h-screen bg-[#ecececa4] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="lg:mt-30 mt-25 lg:ml-70">
                <h2 className="text-2xl font-poppins font-semibold text-[#] ml-6">Dashboard</h2>
            </div>
            <div className="lg:flex lg:flex-row lg:justify-center lg:items-center lg:px-6 md:px-10 px-3 grid grid-cols-2 mt-4 lg:ml-70 lg:gap-6 gap-4">
               <TreasurerCard code="CIT" desc="Number of Events" value={dashboardData.total_events} icon={calendar}/>
               <TreasurerCard code="CIT" desc="Number of Students" value={dashboardData.total_students} icon={cap}/>
               <TreasurerCard code="CIT" desc="Fees Collected" value={"P " + dashboardData.total_fees_collected} icon={coin}/>
               <TreasurerCard code="CIT" desc="Sanction Collected" value={"P " + dashboardData.total_sanctions_collected} icon={sanc}/>
            </div>
            <div className="lg:flex lg:ml-70 mt-8 px-3 md:px-10 lg:px-6 lg:gap-6 ">
                <div className={`bg-[#ffffff] ${animateGraph} border-1 border-[#d8d8d8] transition duration-300 hover:shadow-[3px_3px_3px_#000] hover:scale-102  lg:w-[40%] h-96 rounded-xl grid justify-center shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]`}>
                    <StudentGraph graphTitle="Summary of Students" data={data}/>
                </div> 
                <div className={`bg-white border-1 ${animateChart} p-5 transition duration-300 hover:shadow-[3px_3px_5px_#000] hover:scale-102 border-[#d8d8d8] lg:w-[60%] h-96 lg:my-0 my-8 flex items-center justify-center lg:mx-0 mx-3 rounded-xl shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]`}>
                    <EventChart eventSummary={dashboardData?.event_summary || []} />
                </div>
            </div>
        </div>
    );
}

export default CITDashboard;