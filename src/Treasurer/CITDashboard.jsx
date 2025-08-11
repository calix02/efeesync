
import CITCard from '../other_components/CardCouncil.jsx';
import StudentGraph from '../StudentGraph.jsx';
import EventChart from '../EventChart.jsx';

function CITDashboard(){
     const data = {
    labels: [' 1st,Year', ' 2nd,Year', '3rd,Year', ' 4th,Year'],
    datasets: [
      {
        label: 'CITizens',
        data: [300, 200, 100, 70],
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
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-semibold ml-6">Dashboard</h2>
            </div>
            <div className="lg:flex lg:flex-row lg:justify-center lg:items-center lg:px-0 px-3 grid grid-cols-2 mt-4 lg:ml-70 lg:gap-[30px] gap-[20px]">
               <CITCard desc="Number of Events" value="15" icon={calendar}/>
               <CITCard desc="Number of Students" value="700" icon={cap}/>
               <CITCard desc="Fees Collected" value="100,000" icon={coin}/>
               <CITCard desc="Sanction Collected" value="15,000" icon={sanc}/>
            </div>
            <div className="lg:flex lg:ml-[320px] mt-[30px] lg:gap-[30px] ">
                <div className='bg-[#ffffff] lg:mx-0 mx-3 lg:w-110 h-96 lg:ml-6 rounded-2xl grid justify-center shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]  '>
                    <StudentGraph graphTitle="Summary of CITizens" data={data}/>
                </div> 
                <div className="bg-white lg:w-165 lg:my-0 my-8 grid items-center lg:mx-0 mx-3 max-w-full rounded-2xl shadow-[2px_2px_3px_grey,-2px_-2px_3px_white]">
                    <EventChart/>
                </div>
            </div>
        </div>
    );
}

export default CITDashboard;