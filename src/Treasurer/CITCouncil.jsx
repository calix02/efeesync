import CITHeader from '../other_components/Header_Council.jsx';
import it from '../assets/it.png';
import CITDashboard from './CITDashboard.jsx';
import CITSidebar from './CITSidebar.jsx';
import EfeeViolet from '../assets/violetlogo.png'
function CITCouncil(){
    
    return(
        <>
            <CITHeader code="cit" logoCouncil={it} titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
            <CITDashboard/>
            <div className='lg:block hidden' >
                 <CITSidebar eFee={EfeeViolet}/>
            </div>
           
        </>
      
    );
}
export default CITCouncil;