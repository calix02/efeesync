import CITHeader from '../council_components/Header_Council.jsx'
import CITSidebar from './CITSidebar.jsx';
import it from '../assets/it.png';
import EfeeViolet from '../assets/violetlogo.png'
function CITSettings(){
    return(
        <>
            <CITHeader logoCouncil={it} titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
             <div className="w-screen h-screen bg-[#fafafa] absolute z-[-1] overflow-y-auto overflow-x-auto ">
                <div className="mt-[110px] lg:ml-[280px]">
                    <h2 className="text-[26px] font-semibold ml-[20px]">Settings</h2>
                </div>
            </div>
            <div className='hidden lg:block'>
                <CITSidebar eFee={EfeeViolet}/>
            </div>
        </>
       

    );
}
export default CITSettings;