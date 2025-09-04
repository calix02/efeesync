import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import AccomplishPic from '../assets/general.jpg';
import AccomplishmentCard from "../other_components/AccomplishmentCard.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import it from '../assets/it.png';


function AccomplishmentReport(){
       
    return(
        <>
        <Header code="cit" logoCouncil={it} titleCouncil = "College of Information Technology"/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-semibold ml-6">Accomplishment Report</h2>
            </div>
            <div className="lg:ml-70 flex flex-wrap mt-6 px-6 gap-6">
                <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                <AccomplishmentCard AccomplishPic={AccomplishPic}/>
                <AccomplishmentCard AccomplishPic={AccomplishPic}/>

            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeViolet} code="cit"/>
            </div>

        </>
    );
}
export default AccomplishmentReport;