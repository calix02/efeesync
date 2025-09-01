import React,{useState} from "react";
const PersonalInformation = React.forwardRef(({animate, onAnimationEnd,onClose,code,data,onUpdate}, ref) =>{
    const [fullname,setFullName] = useState(data?.name || ""); 
    const [role,setRole] = useState(data?.role || ""); 
    const [email,setEmail] = useState(data?.email || ""); 

    React.useEffect(()=>{
        if(data){
            setFullName(data.name);
            setRole(data.role);
            setEmail(data.email);
        }
    },[data]);

    const handleSubmit = () => {
      onUpdate({
        name: fullname,
        role: role,
        email: email,
      });
    };

    const colors ={
        osas: "text-[#174515] bg-[#174515] border-[#174515]",
        cit: "text-[#174515]",
    };
    const color = colors[code] || "text-[#000] ";

    return( 
        <div ref={ref}   className={`${color} ${animate} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-85 px-6 bg-white shadow-[2px_2px_grey,-2px_-2px_white] rounded-lg absolute z-[80] inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 ">
                <span className=" font-semibold lg:text-xl text-lg">Update Personal Information</span>
            </div>
            <div className="mt-6">
                <label>Full Name:</label><br />
                <input type="text" onChange={(e)=>setFullName(e.target.value)} value={fullname}  className="border-2 px-2 text-[#000] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Role:</label><br />
                <select name="" onChange={(e)=>setRole(e.target.value)} value={role} id="" className="border-2 px-2 text-[#000] cursor-pointer h-8 rounded-md w-[100%] mb-4">
                    <option value=""></option>
                    <option value="Admin">Admin</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Student">Student</option>
                </select>
                 <label>Institutional Email:</label><br />
                <input type="text" onChange={(e) =>setEmail(e.target.value)} value={email} className="border-2 px-2 text-[#000]  h-8 rounded-md w-[100%] mb-4" /> <br />
                 
            </div>
            
                <button onClick={handleSubmit} className={` ${color} cursor-pointer w-[100%] rounded-md text-white h-8`}>Update Information</button>
            
        </div>
       
    );
});
export default PersonalInformation;