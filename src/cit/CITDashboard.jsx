
import CITCard from '../council_components/CardCouncil.jsx';
import StudentGraph from '../StudentGraph.jsx';
import EventChart from '../EventChart.jsx';

function CITDashboard(){
    const calendar = <i className="fa-solid fa-calendar-days z-[-1]"></i>;
    const cap = <i className="fa-solid fa-graduation-cap z-[-1]"></i>
    const coin = <i className="fa-solid fa-coins z-[-1]"></i>
    const sanc = <i className="fa-solid fa-money-check z-[-1]"></i>
    return(
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-[280px]">
                <h2 className="text-[26px] font-semibold ml-[20px]">Dashboard</h2>
            </div>
            <div className="flex lg:flex-row flex-col items-center mt-[20px] lg:ml-[350px] lg:gap-[30px] gap-[20px]">
               <CITCard desc="Number of Events" value="15" icon={calendar}/>
               <CITCard desc="Number of Students" value="700" icon={cap}/>
               <CITCard desc="Fees Collected" value="100,000" icon={coin}/>
               <CITCard desc="Sanction Collected" value="15,000" icon={sanc}/>
            </div>
            <div className="lg:flex lg:ml-[320px] mt-[30px] lg:gap-[30px] ">
                <div className='bg-[#ffffff] lg:mx-[0px] mx-[20px] lg:w-[450px] h-[390px] lg:ml-[30px] rounded-[20px] grid justify-center shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]  '>
                    <StudentGraph graphTitle="Summary of CITizens"/>
                </div> 
                <div className="bg-white lg:w-[650px] lg:my-[0px] my-[30px] grid items-center lg:mx-[0px] mx-[20px] w-[340px] rounded-[20px] shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]">
                    <EventChart/>
                </div>
            </div>
        </div>
    );
}

export default CITDashboard;