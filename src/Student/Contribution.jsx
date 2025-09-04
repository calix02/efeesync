import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import PaidCard from "../student_components/PaidCard.jsx";
import UnpaidCard from "../student_components/UnpaidCard.jsx";
import Unsettled from "../student_components/Unsettled.jsx";
import EfeeViolet from '../assets/violetlogo.png';
import it from '../assets/it.png';
import "../animate.css";


function Contribution(){
    const animate = "card-In";
       
    return(
        <>
        <Header code="cit" logoCouncil={it} titleCouncil = "College of Information Technology"/>
        <div className="w-screen h-screen bg-[#F8F8F8] absolute z-[-1] overflow-y-auto overflow-x-auto ">
            <div className="mt-[110px] lg:ml-70">
                <h2 className="text-2xl font-semibold ml-6">My Contributions</h2>
            </div>
            <div className="lg:ml-70 px-8 ">
                <div className={` ${animate} bg-white rounded-lg w-100% h-15 border-2 border-[#621668] text-[#621668] shadow-[2px_2px_3px_grey] mt-4 text-lg font-[family-name:arial] font-semibold flex items-center p-3`}>
                    <span>Total Fees Paid: P1,250.00</span>
                </div>
            </div>
            <div className={`lg:ml-70 flex justify-center gap-8 mt-8 px-8`}>
                <PaidCard/>
                <UnpaidCard/>
                <Unsettled/>
            </div>
            
        </div>
             <div className='lg:block hidden' >
                 <Sidebar eFee={EfeeViolet} code="cit" />
            </div>

        </>
    );
}
export default Contribution;