import {Link} from 'react-router-dom';
import DropDownNav from '../council_components/DropDownNav.jsx'
import NavLink from '../council_components/NavLink.jsx';
function CITSidebar(props){
   
    return(
        <div className='w-[280px] h-screen shadow-[3px_2px_1px_violet] border-b-10 border-[#4e0746] fixed bg-white'>
            <div className='mt-[110px]'>
                <span className='flex justify-center items-center gap-3'>
                    <img className='w-[60px]' src={props.eFee} alt="" />
                    <span className='text-center font-bold text-[22px] block'>eFeeSync</span>
                </span>
                
                <nav className='pt-[30px] mx-[10px]'>
                    <NavLink code="cit" navLink = "/org/citdashboard" iconName="dashboard" navName="Dashboard"/>
                    <NavLink code="cit" navLink = "/org/citstudent" iconName="person" navName="Student"/>
                    <NavLink code="cit" navLink = "/org/citeventlist" iconName="event_note" navName="Event List"/>
                    <DropDownNav code="cit" subNavLink1 = "/org/citeventcontribution" subNavLink2 = "/org/citattendance" iconName="calendar_month" navName="Event Management" iconName1 = "event_upcoming" subNavName1 = "Event Contributions" iconName2 = "edit_calendar" subNavName2 = "Event Attendance"/>
                    <DropDownNav code="cit" subNavLink1 = "/org/citfinancial" subNavLink2 = "/org/citaccomplishment" iconName="assignment" navName="Reports" iconName1 = "article" subNavName1 = "Financial Report" iconName2 = "fact_check" subNavName2 = "Accomplishment Report"/>
                    <NavLink code="cit" navLink = "/org/citsanction" iconName="event_busy" navName="Sanctions"/>
                    <NavLink code="cit" navLink = "/org/citexcuse" iconName="approval" navName="Excuse Approval"/>
                    <NavLink code="cit" navLink = "/org/citsettings" iconName="settings" navName="Settings"/>
                </nav>
            </div>
        </div>
    );
}
export default CITSidebar;