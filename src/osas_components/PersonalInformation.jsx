import React,{useState} from "react";
const PersonalInformation = React.forwardRef(({animate, onAnimationEnd,onClose,code,data,onUpdate}, ref) =>{
    const [firstName,setFirstName] = useState(data?.firstName || ""); 
    const [middleName, setMiddleName] = useState (data?.middleName || "");
    const [lastName, setLastName] = useState(data?.lastName || "");
    const [roleId,setRoleId] = useState(data?.roleId || ""); 
    const [email,setEmail] = useState(data?.email || "");
    const [roles, setRoles] = useState([]);
    
    const fetchRoles = async () => {
        try {
            const res = await fetch("/api/roles", {
                credentials: "include"
            });
            const response = await res.json();
            if (response.status === "success") {
                setRoles(response.data);
            }
        } catch (err) {
            //alert("Fetch failed");
        }
    }

    React.useEffect(()=>{
        if(data){
            setFirstName(data.firstName);
            setMiddleName(data.middleName);
            setLastName(data.lastName);
            setRoleId(data.roleId);
            setEmail(data.email);
        }
        fetchRoles();
    },[data]);

    const handleSubmit = () => {
      onUpdate({
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        role: roleId,
        email: email,
      });
    };

     const colors = {
        CIT: "border-[#621668] text-[#621668] bg-[#621668]",
        COE: "border-[#020180] text-[#020180] bg-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COT: "border-[#847714] text-[#847714] bg-[#847714]",
        SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg-[#174515]"
      };
      const color = colors[code] || "border-black text-black";

    return( 
        <div ref={ref}   className={`${color} ${animate} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-118 px-6 bg-white shadow-[2px_2px_grey,-2px_-2px_white] rounded-lg z-[80] inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 ">
                <span className=" font-semibold lg:text-xl text-lg">Update Personal Information</span>
            </div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                handleSubmit();

            }}>
            <div className="mt-6">
                <label>First Name:</label><br />
                <input type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName}  className="border-2 px-2 text-[#000] h-8 rounded-md w-[100%] mb-4" required/> <br />
                <label>Midlle Name:</label><br />
                <input type="text" onChange={(e)=>setMiddleName(e.target.value)} value={middleName}  className="border-2 px-2 text-[#000] h-8 rounded-md w-[100%] mb-4" required/> <br /> 
                <label>Last Name:</label><br />
                <input type="text" onChange={(e)=>setLastName(e.target.value)} value={lastName} required className="border-2 px-2 text-[#000] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Role:</label><br />
                <select name="" onChange={(e)=>setRoleId(e.target.value)} value={roleId} required className="border-2 px-2 text-[#000] cursor-pointer h-8 rounded-md w-[100%] mb-4">
                    { roles.map((s) => (
                        <option key={s.role_id} value={s.role_id}>{s.role_name}</option>
                    ))}
                </select>
                 <label>Institutional Email:</label><br />
                <input type="text" onChange={(e) =>setEmail(e.target.value)} value={email} className="border-2 px-2 text-[#000]  h-8 rounded-md w-[100%] mb-4" required/> <br />
            </div>
            
                <button type="submit" className={` ${color} cursor-pointer w-[100%] rounded-md text-white h-8`}>Update Information</button>
            </form>
            
        </div>
       
    );
});
export default PersonalInformation;