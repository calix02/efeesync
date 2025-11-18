import CITHeader from '../other_components/Header_Council.jsx';
import it from '../assets/it.png';
import DashboardContent from '../treasurer_components/DashboardContent.jsx';
import CITSidebar from './Sidebar.jsx';
import SkeletonHeader from '../skeletons/SkeletonHeader.jsx';
import { useEffect, useState } from 'react';
import { confirmAlert, successAlert, errorAlert, okAlert } from "../utils/alert.js";

function CITCouncil() {
  const [currentUserData, setCurrentUserData] = useState(() => {
    const saved = localStorage.getItem("currentUserData");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/current", {
        credentials: "include",
      });
      const response = await res.json();
      if (response.status === "success") {
        setCurrentUserData(response.data);
        localStorage.setItem("currentUserData", JSON.stringify(response.data));
      }
    } catch (err) {
      errorAlert("Fetch Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);
 
  return (
    <>
      {loading ? (
        <>
        <SkeletonHeader />
        </>
      ) : (
       
        <CITHeader
          code={currentUserData?.department_code}
          titleCouncil={currentUserData?.organization_name}
          abb="CIT Council"/>
       )}
       <div className="lg:block hidden">
        <CITSidebar
          isUnivWide={currentUserData?.university_wide_org}
          code={currentUserData?.department_code}/>
      </div>

      <DashboardContent currentUserData={currentUserData} className="hide-scrollbar" />

    </>
  );
}

export default CITCouncil;
