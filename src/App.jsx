import{BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import LogIn from './LogIn.jsx';

/* ------------------------- Error Pages ----------------------------- */
import NotFound from "./NotFound";
import Unauthorized from "./Unauthorized";
/* ----------------------------- Osas -------------------------------- */
import OsasDashboard from './Osas/Dashboard.jsx';
import College from './Osas/College.jsx';
import Program from './Osas/Program.jsx';
import Organisation from './Osas/Organisation.jsx';
import Student from './Osas/Student.jsx';
import Account from './Osas/Account.jsx';
import Setting from './Osas/Setting.jsx';
/* ----------------------------- Student -------------------------------- */
import StudentDashboard from './Student/Dashboard.jsx';
import Contribution from './Student/Contribution.jsx';
import Attendance from './Student/Attendance.jsx';
import SanctionStudent from './Student/Sanction.jsx';
import ExcuseLetterStudent from './Student/ExcuseLetter.jsx';
import ShiftingRequest from './Student/ShiftingRequest.jsx';
import FinancialReport from './Student/FinancialReport.jsx';
import AccomplishmentReport from './Student/AccomplishmentReport.jsx';
import Payment from './Student/Payment.jsx';
import SettingsStudent from './Student/Settings.jsx';
/* ----------------------------- Treasurer -------------------------------- */
import TreasurerDashboard from './Treasurer/Dashboard.jsx';
import TreasurerStudent from './Treasurer/Student.jsx';
import CITEventList from './Treasurer/EventList.jsx';
import CITEventContribution from './Treasurer/EventContribution.jsx';
import CITAttendance from './Treasurer/Attendance.jsx';
import CITFinancial from './Treasurer/Financial.jsx';
import CITAccomplishment from './Treasurer/Accomplishment.jsx';
import CITSanction from './Treasurer/Sanction.jsx';
import CITExcuse from './Treasurer/Excuse.jsx';
import CITSettings from './Treasurer/Settings.jsx';
import ShiftingApproval from './Treasurer/ShiftingApproval.jsx';
import PaymentTransaction from './Treasurer/PaymentTransaction.jsx';
import './index.css'
function App() {
 
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/osas" element={<OsasDashboard/>}/>
        <Route path="/osas/dashboard" element={<OsasDashboard/>}/>
        <Route path="/osas/college" element={<College/>}/>
        <Route path="/osas/program" element={<Program/>}/>
        <Route path="/osas/organisation" element={<Organisation/>}/>
        <Route path="/osas/student" element={<Student/>}/>
        <Route path="/osas/account" element={<Account/>}/>
        <Route path="/osas/setting" element={<Setting/>}/>

        <Route path="/student" element={<StudentDashboard/>}/>
        <Route path="/student/dashboard" element={<StudentDashboard/>}/>
        <Route path="/student/contribution" element={<Contribution/>}/>
        <Route path="/student/attendance" element={<Attendance/>}/>
        <Route path="/student/sanction" element={<SanctionStudent/>}/>
        <Route path="/student/excuse" element={<ExcuseLetterStudent/>}/>
        <Route path="/student/shifting" element={<ShiftingRequest/>}/>
        <Route path="/student/financial" element={<FinancialReport/>}/>
        <Route path="/student/accomplishment" element={<AccomplishmentReport/>}/>
        <Route path="/student/payment" element={<Payment/>}/>
        <Route path="/student/settings" element={<SettingsStudent/>}/>

        <Route path="/org" element={<TreasurerDashboard/>}/>
        <Route path="/org/dashboard" element={<TreasurerDashboard/>}/>
        <Route path="/org/student" element={<TreasurerStudent/>}/>
        <Route path="/org/eventlist" element={<CITEventList/>}/>
        <Route path="/org/eventcontribution" element={<CITEventContribution/>}/>
        <Route path="/org/attendance" element={<CITAttendance/>}/>
        <Route path="/org/financial" element={<CITFinancial/>}/>
        <Route path="/org/accomplishment" element={<CITAccomplishment/>}/>
        <Route path="/org/payment-transaction" element={<PaymentTransaction/>}/>
        <Route path="/org/sanction" element={<CITSanction/>}/>
        <Route path="/org/excuse" element={<CITExcuse/>}/>
        <Route path="/org/shifting-approval" element={<ShiftingApproval/>}/>
        <Route path="/org/settings" element={<CITSettings/>}/>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App