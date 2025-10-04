import React, {useState, useEffect} from "react";
import { errorAlert } from "../utils/alert";

const AddOrganizationCard = React.forwardRef(({animate, onAnimationEnd,onClose,reloadOrgs}, ref) =>{
    const [orgCode, setOrgCode] = useState("");
    const [orgName, setOrgName] = useState("");
    const [assignedCollege, setAssignedCollege] = useState("");
    const [colleges, setColleges] = useState([]);

    const changeOrgCode = (e) => setOrgCode(e.target.value);
    const changeOrgName = (e) => setOrgName(e.target.value);
    const changeAssignedCollege = (e) => setAssignedCollege(e.target.value);

    const orgData = {
        "organization_code": orgCode,
        "organization_name": orgName,
        "department_code": assignedCollege
    }

    const addOrg = async () =>{
        try {
            const res = await fetch("/api/organizations", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(orgData)
            });
            const response = await res.json();
            // Result
            if (response.status === "success") {
                await reloadOrgs();
            } else {
                errorAlert("Failed: " + response.message);
            }
        } catch (err) {
                errorAlert("Failed: " + err);
        }
    }

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
    
    return( 
        <div ref={ref}   className={` ${animate} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-85 px-8 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold lg:text-xl text-lg">Add Organization</span>
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                addOrg();
                onClose();
            }
            }>
            <div className="mt-6">
                <label>Organization Code:</label><br />
                <input type="text" onChange={changeOrgCode} value={orgCode} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" required/> <br />
                <label>Organization Name:</label><br />
                <input type="text" onChange={changeOrgName} value={orgName} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" required/> <br />
                 <label>Assigned College:</label><br />
                <select className="border-2 border-[#174515] h-8 px-2 rounded-md w-[100%] mb-4" onChange={changeAssignedCollege} required>
                    <option value="university">University Wide</option>
                    { colleges.map((s) => (
                        <option key={s.department_id} value={s.department_code}>{s.department_name}</option>
                    ))}
                </select>
            </div>
                <button type="submit" className="bg-[#174515] w-[100%] rounded-md text-white h-8 cursor-pointer">Add Organization</button>
            </form>
            
        </div>
       
    );
});
export default AddOrganizationCard;