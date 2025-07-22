import{BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import LogIn from './LogIn.jsx';
import Admin from './Admin.jsx';
import CITCouncil from './cit/CITCouncil.jsx';
import CITStudent from './cit/CITStudent.jsx';
import CITEventList from './cit/CITEventList.jsx';
import CITEventContribution from './cit/CITEventContribution.jsx';
import CITAttendance from './cit/CITAttendance.jsx';
import CITFinancial from './cit/CITFinancial.jsx';
import CITAccomplishment from './cit/CITAccomplishment.jsx';
import CITSanction from './cit/CITSanction.jsx';
import CITExcuse from './cit/CITExcuse.jsx';
import CITSettings from './cit/CITSettings.jsx';
import User from './User.jsx';
import Program from './admin_components/Program_Admin.jsx';
import './index.css'
function App() {
 
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/admin/dashboard" element={<Admin/>}/>

        <Route path="/org/citdashboard" element={<CITCouncil/>}/>
        <Route path="/org/citstudent" element={<CITStudent/>}/>
        <Route path="/org/citeventlist" element={<CITEventList/>}/>
        <Route path="/org/citeventcontribution" element={<CITEventContribution/>}/>
        <Route path="/org/citattendance" element={<CITAttendance/>}/>
        <Route path="/org/citfinancial" element={<CITFinancial/>}/>
        <Route path="/org/citaccomplishment" element={<CITAccomplishment/>}/>
        <Route path="/org/citsanction" element={<CITSanction/>}/>
        <Route path="/org/citexcuse" element={<CITExcuse/>}/>
        <Route path="/org/citsettings" element={<CITSettings/>}/>


        <Route path="/user" element={<User/>}/>
        <Route path="/program" element={<Program/>}/>
      </Routes>
    </Router>
   
  );
}

export default App
