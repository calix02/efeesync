import React, {useState} from "react";
const AddOrganizationCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{
    const [orgCode, setOrgCode] = useState("");
    const [orgName, setOrgName] = useState("");
    const [assignedCollege, setAssignedCollege] = useState("");

    const changeOrgCode = (e) => setOrgCode(e.target.value);
    const changeOrgName = (e) => setOrgName(e.target.value);
    const changeAssignedCollege = (e) => setAssignedCollege(e.target.value);

   
    const addOrg = () =>{
        alert("Org Code: "+ orgCode + "\n Org Name:" +orgName + "\n Assigned College:" +assignedCollege);
    }
    





    return( 
        <div ref={ref}   className={` ${animate} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-85 px-8 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold lg:text-xl text-lg">Add Organization</span>
            </div>
            <div className="mt-6">
                <label>Organization Code:</label><br />
                <input type="text" onChange={changeOrgCode} value={orgCode} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Organization Name:</label><br />
                <input type="text" onChange={changeOrgName} value={orgName} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Assigned College:</label><br />
                <input type="text" onChange={changeAssignedCollege} value={assignedCollege} className="border-2 border-[#174515] h-8 px-2 rounded-md w-[100%] mb-4" /> <br />
                 
            </div>
            
                <button onClick={()=>{addOrg(); onClose();}} className="bg-[#174515] w-[100%] rounded-md text-white h-8">Add Organization</button>
            
        </div>
       
    );
});
export default AddOrganizationCard;