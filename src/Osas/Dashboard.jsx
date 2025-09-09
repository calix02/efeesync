import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import Header from './Header.jsx';
import OsasLogo from '../assets/osas.png';
import CardOsas from '../other_components/CardOsas.jsx';
import Card_Admin from '../osas_components/Card_Admin.jsx';
import CouncilGraph from '../other_components/Graph.jsx';
import Chart from '../Charts.jsx';
import StudentTreasurerCard from '../other_components/StudentTreasurerCard.jsx';
import InOutFlowChart from '../other_components/InOutflowChart.jsx';
import ssc from '../assets/ssc.png';
import crim from '../assets/CRIM.png';
import educ from '../assets/COE.png';
import cotsc from '../assets/COT.png';
import esaf from '../assets/ESAF.png';
import it from '../assets/CIT.png';
import "../animate.css";
import { useState, useEffect } from 'react';

function Dashboard(){
    document.title = "Dashboard";
    
    const animate = "card-In";
    const animateL = "left-In";
    const animateR = "right-In";

    const [dashboardData, setDashboardData] = useState({
        "total_departments": "-",
        "total_organizations": "-",
        "total_programs": "-",
        "total_students": "-",
        "sanctions_collected_per_org": [],
        "total_population_per_department": []
    });
    const fetchDashboard = async () => {
        try {
            const res = await fetch("/api/admin/dashboard", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setDashboardData(response.data);
            }
        } catch (err) {
            errorAlert("Fetch Failed");
        }
    }
    useEffect(() => {
        fetchDashboard();
    }, []);

    const deptData = dashboardData.total_population_per_department;
    const labels = deptData.map(dept => dept.department_code);
    const data = deptData.map(dept => dept.total_students);
    const total_population = { 
        labels: labels,
        datasets: [
            {
                label: 'CITizens',
                data: data,
                backgroundColor: ['#FCBBD8', '#D4E4FF', '#F6FFB1', '#FFD8CC','#ECCEFC'],
                borderWidth: 0,
                cutout: '50%'
            }
        ]
    };

    const sanctionData = dashboardData.sanctions_collected_per_org;
    const labels_sanction = sanctionData.map(org => org.organization_code);
    const data_sanction = sanctionData.map(org => parseFloat(org.total_sanctions_collected)); 
    const sanctions_collected_per_org = { 
        labels: labels_sanction,
        datasets: [
        {
            data: data_sanction,
            backgroundColor: ['#d492f9','#FFD8CC','#F6FFB1','#D4E4FF','#FCBBD8']
        }
        ]
    };

    const building = <i className="fa-solid fa-building-columns"></i>
    const council = <i className="fa-solid fa-sitemap"></i>
    const program = <i className="fa-solid fa-graduation-cap"></i>
    const student = <i className="fa-solid fa-user"></i>
    
    return(
        <>
        <Header code="osas" logoCouncil={OsasLogo} titleCouncil = "Office of Student Affairs and Services"/>
        <div className="w-screen h-screen bg-[#F8F8F8]  absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
            <div className="lg:mt-24 mt-24 lg:ml-68">
                <h2 className="text-lg sm:text-md md:text-2xl lg:text-2xl text-[#145712] font-bold font-poppins">Welcome, Admin!</h2>
            </div>
            <div className={`lg:flex lg:flex-row lg:justify-center lg:items-center ${animate} grid grid-cols-2 mt-4 gap-6 lg:ml-70`}>
              <CardOsas title="Number of Colleges" count={dashboardData.total_departments} pic={building}/>
              <CardOsas title="Number of Councils" count={dashboardData.total_organizations} pic={council}/>
              <CardOsas title="Number of Programs" count={dashboardData.total_programs} pic={program}/>
              <CardOsas title="Number of Students" count={dashboardData.total_students} pic={student}/>
            </div>
            <div className={`lg:ml-70 mt-6 ${animate} grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center gap-6`}>
                <Card_Admin logo={ssc} title="SSC" budget="67 000.00" cashHand={1262} cashBank={6638}/>
                <Card_Admin logo={crim} title="CCSC" budget="67 000.00" cashHand={1262} cashBank={6638}/>
                <Card_Admin logo={educ} title="CESC" budget="67 000.00" cashHand={1262} cashBank={6638}/>
                <Card_Admin logo={cotsc} title="COTSC" budget="67 000.00" cashHand={1262} cashBank={6638}/>
                <Card_Admin logo={esaf} title="SCEAP" budget="67 000.00" cashHand={1262} cashBank={6638}/>
                <Card_Admin logo={it} title="CITSC" budget="67 000.00" cashHand={1262} cashBank={6638}/>
            </div>
            <div className='lg:ml-70 mt-6 flex lg:flex-row flex-col gap-6'>
                <div className={`lg:w-[40%] flex justify-center ${animateL} border-1 bg-white border-[#000] rounded-lg shadow-[2px_2px_2px_grey]`}>
                    <CouncilGraph data={total_population} graphTitle="Total Student Population" />
                </div>
                <div className={`bg-white border-1 border-[#000] ${animateR} rounded-lg lg:w-[60%] flex justify-center items-center`}>
                    <Chart data={sanctions_collected_per_org} title="Total Sanctions Collected"/>
                </div>
            </div>
            <div className='lg:ml-70 mt-6 lg:flex gap-6'>
                <div className={` lg:w-[60%] ${animateL} bg-white border-1 border-black rounded-lg mb-6 shadow-[2px_2px_3px_grey]`}>
                    <InOutFlowChart/>
                </div>
                <div className={`flex justify-center items-center ${animateR} rounded-lg bg-white lg:w-[40%] w-[100%] h-92 border-1 border-[#000]`}>
                    <StudentTreasurerCard/>
                </div>
            </div> 
        </div>

            <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeOsas}/>
            </div>
        </>
      
    );
}
export default Dashboard;