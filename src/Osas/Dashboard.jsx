import Sidebar from './Sidebar.jsx';
import EfeeOsas from '../assets/Final_logo.png';
import Header from '../other_components/Header_Council.jsx';
import OsasLogo from '../assets/osas.png';
import CardOsas from '../other_components/CardOsas.jsx';
import Card_Admin from '../admin_components/Card_Admin.jsx';
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

function Dashboard(){
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
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-semibold ml-6">Welcome Admin!</h2>
            </div>
            <div className="lg:flex lg:flex-row lg:justify-center lg:items-center lg:px-0 px-3 grid grid-cols-2 mt-4  lg:ml-70 lg:gap-[30px] gap-[20px]">
              <CardOsas title="Number of Colleges" count="5" pic={building}/>
              <CardOsas title="Number of Councils" count="6" pic={council}/>
              <CardOsas title="Number of Programs" count="3" pic={program}/>
              <CardOsas title="Number of Students" count="6000" pic={student}/>
            </div>
            <div className='lg:ml-70 mt-6 flex flex-wrap justify-center gap-6'>
                <Card_Admin logo={ssc} title="SSC" budget="67 000.00" cashHand={1262} cashBank={6638}/>
                <Card_Admin logo={crim} title="CCSC" budget="67 000.00" cashHand={1262} cashBank={6638}/>
                <Card_Admin logo={educ} title="CESC" budget="67 000.00" cashHand={1262} cashBank={6638}/>
                <Card_Admin logo={cotsc} title="COTSC" budget="67 000.00" cashHand={1262} cashBank={6638}/>
                <Card_Admin logo={esaf} title="SCEAP" budget="67 000.00" cashHand={1262} cashBank={6638}/>
                <Card_Admin logo={it} title="CITSC" budget="67 000.00" cashHand={1262} cashBank={6638}/>
            </div>
            <div className='lg:ml-70 px-14 my-6 flex gap-6'>
                <div className='w-110 flex justify-center border-1 bg-white border-[#000] rounded-lg shadow-[2px_2px_2px_grey]'>
                    <CouncilGraph data={data} graphTitle="Total Student Population" />
                </div>
                <div className='bg-white border-1 border-[#000] rounded-lg w-170 flex justify-center items-center'>
                    <ChartSanction title="Total Sanctions Collected"/>
                </div>
            </div>
            <div className='lg:ml-70 px-14 flex gap-6'>
                <div className=' w-170 bg-white border-1 border-black rounded-lg mb-6 shadow-[2px_2px_3px_grey]'>
                    <InOutFlowChart/>
                </div>
                <div>
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