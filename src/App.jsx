import{BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import ProtectedLayout from './ProtectedLayout.jsx';
import GuestRoute from './GuestRoute.jsx';
import LogIn from './LogIn.jsx';

/* ------------------------- Error Pages ----------------------------- */
import NotFound from "./NotFound";
import Unauthorized from "./Unauthorized";
/* ----------------------------- Osas -------------------------------- */
import OsasDashboard from './osas/Dashboard.jsx';
import College from './osas/College.jsx';
import Program from './osas/Program.jsx';
import Organisation from './osas/Organisation.jsx';
import Student from './osas/Student.jsx';
import Account from './osas/Account.jsx';
import Setting from './osas/Setting.jsx';
/* ----------------------------- Student -------------------------------- */
import StudentDashboard from './student/Dashboard.jsx';
import Contribution from './student/Contribution.jsx';
import Attendance from './student/Attendance.jsx';
import SanctionStudent from './student/Sanction.jsx';
import ExcuseLetterStudent from './student/ExcuseLetter.jsx';
import ShiftingRequest from './student/ShiftingRequest.jsx';
import FinancialReport from './student/FinancialReport.jsx';
import AccomplishmentReport from './student/AccomplishmentReport.jsx';
import Payment from './student/Payment.jsx';
import SettingsStudent from './student/Settings.jsx';
/* ----------------------------- Treasurer -------------------------------- */
import TreasurerDashboard from './treasurer/Dashboard.jsx';
import TreasurerStudent from './treasurer/Student.jsx';
import TreasurerEventList from './treasurer/EventList.jsx';
import TreasurerEventContribution from './treasurer/EventContribution.jsx';
import TreasurerAttendance from './treasurer/Attendance.jsx';
import TreasurerFinancial from './treasurer/Financial.jsx';
import TreasurerAccomplishment from './treasurer/Accomplishment.jsx';
import TreasurerSanction from './treasurer/Sanction.jsx';
import TreasurerExcuse from './treasurer/Excuse.jsx';
import TreasurerSettings from './treasurer/Settings.jsx';
import ShiftingApproval from './treasurer/ShiftingApproval.jsx';
import PaymentTransaction from './treasurer/PaymentTransaction.jsx';
import './index.css'
function App() {
  return (
    
    <Router>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/" element={<LogIn/>}/>
          <Route path="/login" element={<LogIn/>}/>
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
/* ----------------------------- Osas -------------------------------- */
        <Route element={<ProtectedLayout allowedRoles={["admin"]} />}>
          <Route path="/osas" element={<OsasDashboard/>}/>
          <Route path="/osas/dashboard" element={<OsasDashboard/>}/>
          <Route path="/osas/college" element={<College/>}/>
          <Route path="/osas/program" element={<Program/>}/>
          <Route path="/osas/organisation" element={<Organisation/>}/>
          <Route path="/osas/student" element={<Student/>}/>
          <Route path="/osas/account" element={<Account/>}/>
          <Route path="/osas/setting" element={<Setting/>}/>
        </Route>
/* ----------------------------- Student -------------------------------- */
        <Route element={<ProtectedLayout allowedRoles={["student"]} />}>
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
        </Route>
/* ----------------------------- Treasurer -------------------------------- */
        <Route element={<ProtectedLayout allowedRoles={["treasurer"]} />}>
          <Route path="/org" element={<TreasurerDashboard/>}/>
          <Route path="/org/dashboard" element={<TreasurerDashboard/>}/>
          <Route path="/org/student" element={<TreasurerStudent/>}/>
          <Route path="/org/eventlist" element={<TreasurerEventList/>}/>
          <Route path="/org/eventcontribution" element={<TreasurerEventContribution/>}/>
          <Route path="/org/attendance" element={<TreasurerAttendance/>}/>
          <Route path="/org/financial" element={<TreasurerFinancial/>}/>
          <Route path="/org/accomplishment" element={<TreasurerAccomplishment/>}/>
          <Route path="/org/payment-transaction" element={<PaymentTransaction/>}/>
          <Route path="/org/sanction" element={<TreasurerSanction/>}/>
          <Route path="/org/excuse" element={<TreasurerExcuse/>}/>
          <Route path="/org/shifting-approval" element={<ShiftingApproval/>}/>
          <Route path="/org/settings" element={<TreasurerSettings/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App