import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import Header from './Header.jsx';
import OsasLogo from '../assets/osas.png';
import CardOsas from '../other_components/CardOsas.jsx';
import Card_Admin from '../osas_components/Card_Admin.jsx';
import CouncilGraph from '../other_components/Graph.jsx';
import ChartSanction from '../Charts.jsx';
import StudentTreasurerCard from '../other_components/StudentTreasurerCard.jsx';
import InOutFlowChart from '../other_components/InOutflowChart.jsx';
import ssc from '../assets/ssc.png';
import crim from '../assets/CRIM.png';
import educ from '../assets/COE.png';
import cotsc from '../assets/COT.png';
import esaf from '../assets/ESAF.png';
import it from '../assets/CIT.png';
import "../animate.css";

function Dashboard(){
    const animate = "card-In";
    const animateL = "left-In";
    const animateR = "right-In";

    const data = {
    labels: ['CCSC', 'CESC', 'COTSC', 'SCEAP','CITSC'],
    datasets: [
      {
        label: 'CITizens',
        data: [900, 1200, 800, 700,670],
        backgroundColor: ['#FCBBD8', '#D4E4FF', '#F6FFB1', '#FFD8CC','#ECCEFC'],
        borderWidth: 0,
        cutout: '50%'
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
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto lg:px-6 md:px-10 px-3">
            <div className="lg:mt-30 mt-25 lg:ml-70">
                <h2 className="text-2xl font-medium font-[family-name:Futura Bold]">Welcome, Admin!</h2>
            </div>
            <div className={`lg:flex lg:flex-row lg:justify-center lg:items-center ${animate} grid grid-cols-2 mt-4 gap-6 lg:ml-70`}>
              <CardOsas title="Number of Colleges" count="5" pic={building}/>
              <CardOsas title="Number of Councils" count="6" pic={council}/>
              <CardOsas title="Number of Programs" count="3" pic={program}/>
              <CardOsas title="Number of Students" count="6000" pic={student}/>
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
                    <CouncilGraph data={data} graphTitle="Total Student Population" />
                </div>
                <div className={`bg-white border-1 border-[#000] ${animateR} rounded-lg lg:w-[60%] flex justify-center items-center`}>
                    <ChartSanction title="Total Sanctions Collected"/>
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