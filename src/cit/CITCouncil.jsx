import CITHeader from '../council_components/Header_Council.jsx';
import it from '../assets/it.png';
import CITDashboard from './CITDashboard.jsx';
import CITSidebar from './CITSidebar.jsx';
import EfeeViolet from '../assets/violetlogo.png'
function CITCouncil(){
    
    return(
        <>
            <CITHeader logoCouncil={it} titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
            <CITDashboard/>
            <div className='hidden lg:block' >
                 <CITSidebar eFee={EfeeViolet}/>
            </div>
           
        </>
      
    );
}
export default CITCouncil;