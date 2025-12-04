import React,{useState, useEffect} from "react";
import { errorAlert} from '../utils/alert.js';


const AddAccountCard = React.forwardRef(({animate, onAnimationEnd,onClose,reloadTreasurers}, ref) =>{
    const [org, setOrg] = useState("");
    const [studId, setStudId] = useState("");
    const [name, setName] = useState("");

    const changeOrg = (e) => setOrg(e.target.value);
    const changeStudId = (e) => setStudId(e.target.value);
    const changeName = (e) => setName(e.target.value);

    const [orgs, setOrgs] = useState([]);
    
    const fetchOrgs = async () => {
        try {
            const res = await fetch("/api/organizations", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setOrgs(response.data);
                setOrg((response.data)[0].organization_id);
            }
        } catch (err) {
            // alert("Fetch failed");
        }
    }

    useEffect(()=> {
        fetchOrgs();
    }, []);

    const officerData = {
        "student_number_id": studId,
        "organization_id": org
    }

    const addTreasurer = async () => {
        try {
            const res = await fetch("/api/organization/officers", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(officerData)
            });

            const response = await res.json();

            if (response.status === "success") {
                await reloadTreasurers();
            } else {
             //   errorAlert("Failed: " + response.message);
            }
        } catch (err) {
             //   errorAlert("Failed: " + response.message);
        }
    }

    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-70 px-8 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg  z-80 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold text-2xl">Add Treasurer</span>
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                addTreasurer();
                onClose();
            }}>
            <div className="mt-[15px]">
                <label>Organization</label><br />
                <select onChange={changeOrg} value={org} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4">
                    {orgs?.map((o) => (
                        <option value={o.organization_id}>{o.organization_code}</option>
                    ))}
                </select>
                <label>Student ID:</label><br />
                <input type="text" onChange={changeStudId} value={studId} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                {/*<label>Treasurer's Name:</label><br />
                <input type="text" onChange={changeName} value={name} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                */}
            </div>
            
                <button type="submit" className="bg-[#174515] w-[100%] rounded-md text-white h-8">Add Treasurer</button>
            </form>
            
        </div>
       
    );
});
export default AddAccountCard;