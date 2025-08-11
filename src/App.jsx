import{BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import LogIn from './LogIn.jsx';

import OsasDashboard from './Osas/Dashboard.jsx';
import College from './Osas/College.jsx';
import Program from './Osas/Program.jsx';
import Organisation from './Osas/Organisation.jsx';
import Student from './Osas/Student.jsx';
import Account from './Osas/Account.jsx';
import Setting from './Osas/Setting.jsx';

import CITCouncil from './Treasurer/CITCouncil.jsx';
import CITStudent from './Treasurer/CITStudent.jsx';
import CITEventList from './Treasurer/CITEventList.jsx';
import CITEventContribution from './Treasurer/CITEventContribution.jsx';
import CITAttendance from './Treasurer/CITAttendance.jsx';
import CITFinancial from './Treasurer/CITFinancial.jsx';
import CITAccomplishment from './Treasurer/CITAccomplishment.jsx';
import CITSanction from './Treasurer/CITSanction.jsx';
import CITExcuse from './Treasurer/CITExcuse.jsx';
import CITSettings from './Treasurer/CITSettings.jsx';
import User from './User.jsx';
import ShiftingApproval from './Treasurer/ShiftingApproval.jsx';
import PaymentTransaction from './Treasurer/PaymentTransaction.jsx';
import './index.css'
function App() {
 
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/osas/dashboard" element={<OsasDashboard/>}/>
        <Route path="/osas/college" element={<College/>}/>
        <Route path="/osas/program" element={<Program/>}/>
        <Route path="/osas/organisation" element={<Organisation/>}/>
        <Route path="/osas/student" element={<Student/>}/>
        <Route path="/osas/account" element={<Account/>}/>
        <Route path="/osas/setting" element={<Setting/>}/>

        <Route path="/org/citdashboard" element={<CITCouncil/>}/>
        <Route path="/org/citstudent" element={<CITStudent/>}/>
        <Route path="/org/citeventlist" element={<CITEventList/>}/>
        <Route path="/org/citeventcontribution" element={<CITEventContribution/>}/>
        <Route path="/org/citattendance" element={<CITAttendance/>}/>
        <Route path="/org/citfinancial" element={<CITFinancial/>}/>
        <Route path="/org/citaccomplishment" element={<CITAccomplishment/>}/>
        <Route path="/org/payment-transaction" element={<PaymentTransaction/>}/>
        <Route path="/org/citsanction" element={<CITSanction/>}/>
        <Route path="/org/citexcuse" element={<CITExcuse/>}/>
        <Route path="/org/shifting-approval" element={<ShiftingApproval/>}/>
        <Route path="/org/citsettings" element={<CITSettings/>}/>


        <Route path="/user" element={<User/>}/>
      </Routes>
    </Router>
   
  );
}

export default App
