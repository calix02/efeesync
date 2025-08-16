import CITHeader from '../other_components/Header_Council.jsx';
import it from '../assets/it.png';
import DashboardContent from '../treasurer_components/DashboardContent.jsx';
import CITSidebar from './Sidebar.jsx';
import EfeeViolet from '../assets/violetlogo.png'
function CITCouncil(){
    
    return(
        <>
            <CITHeader code="cit" logoCouncil={it} titleCouncil = "College Of Information Teachnology" abb="CIT Council" />
            <DashboardContent/>
            <div className='lg:block hidden' >
                 <CITSidebar eFee={EfeeViolet}/>
            </div>
           
        </>
      
    );
}
export default CITCouncil;