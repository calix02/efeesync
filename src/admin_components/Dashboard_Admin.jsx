import ssc from '../assets/ssc.png';
import educ from '../assets/educ.png';
import indus from '../assets/indus.png';
import crim from '../assets/crim.png';
import it from '../assets/it.png';
import agro from '../assets/agro.png';
import Card from './Card_Admin.jsx';

function Dashboard_Admin(){
    return(
        <div className="w-screen h-screen bg-[#EFEFEF] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-[210px]">
                <h2 className="text-[22px] font-semibold ml-[20px]">Welcome, Admin</h2>
            </div>
            <div className="flex flex-wrap gap-[10px] mx-[20px] mt-[20px] lg:ml-[280px] lg:gap-[50px]">
               <Card logo={ssc} title="SSC" budget={19987} fees={1262} sanction={6638}/>
               <Card logo={educ} title="COE Council" budget={19987} fees={1262} sanction={6638}/>
               <Card logo={crim} title="COC Council" budget={19987} fees={1262} sanction={6638}/>
               <Card logo={indus} title="COT Council" budget={19987} fees={1262} sanction={6638}/>
               <Card logo={agro} title="EAP Council" budget={19987} fees={1262} sanction={6638}/>
               <Card logo={it} title="CIT Council" budget={19987} fees={1262} sanction={6638}/>    
            </div>
        </div>
    );
}

export default Dashboard_Admin;