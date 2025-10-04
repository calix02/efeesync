import React, {useState, useEffect} from "react";
import { errorAlert } from "../utils/alert";

const UpdateOrganizationCard = React.forwardRef(({animate, onAnimationEnd,onClose,data,reloadOrgs}, ref) =>{
    const [orgCode, setOrgCode] = useState(data?.organization_code || "");
    const [orgName, setOrgName] = useState(data?.organization_name || "");
    const [assignedCollege, setAssignedCollege] = useState(data?.department_code || "university");
    const [orgId, setOrgId] = useState(data?.organization_id || "");
    const [colleges, setColleges] = useState([]);
    
    React.useEffect(() =>{
        if(data){
            setOrgCode(data.organization_code);
            setOrgName(data.organization_name);
            setAssignedCollege(data.department_code);
        }
    },[data]);

    const fetchColleges = async () => {
        try {
            const res = await fetch("/api/departments", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setColleges(response.data);
            }
        } catch (err) {
            //alert("Fetch failed");
        }
    }
        
    useEffect(()=> {
        fetchColleges();
    }, []);
    
    const orgData = {
        "new_organization_code": orgCode,
        "new_organization_name": orgName,
        "new_department_code": assignedCollege
    }

    const updateOrg = async () =>{
        try {
            const res = await fetch("/api/organizations/" + orgId, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orgData)
            });

            const response = await res.json();
            if (response.status === "success") {
                await reloadOrgs();
            } else {
                errorAlert("Failed: " + response.message);
            }
        } catch (err) {
            errorAlert("Fetch failed: " + err);
        }
    }

    return( 
        <div ref={ref}   className={` ${animate} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-85 px-8 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold lg:text-xl text-lg">Update Organization</span>
            </div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                updateOrg();
                onClose();
            }} >
            <div className="mt-6">
                <label>Organization Code:</label><br />
                <input type="text" onChange={(e) =>setOrgCode(e.target.value)} value={orgCode} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Organization Name:</label><br />
                <input type="text" onChange={(e) =>setOrgName(e.target.value)} value={orgName} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Assigned College:</label><br />
                <select className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" value={assignedCollege} onChange={(e) =>setAssignedCollege(e.target.value)} required>
                    <option value="university">
                        University Wide
                    </option>
                    { colleges.map((s) => (
                        <option key={s.department_id} value={s.department_code}>{s.department_name}</option>
                    ))}
                </select>
                 
            </div>
                <button type="submit" className="bg-[#174515] w-[100%] rounded-md text-white h-8 cursor-pointer">Update Organization</button>
            </form>
        </div>
       
    );
});
export default UpdateOrganizationCard;