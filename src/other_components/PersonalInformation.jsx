import React,{useState} from "react";
import {  errorAlert } from "../utils/alert";

const PersonalInformation = React.forwardRef(({animate, onAnimationEnd,onClose,code,data,reloadUserInfo}, ref) =>{
    const [firstName,setFirstName] = useState(data?.firstName || ""); 
    const [middleName, setMiddleName] = useState (data?.middleName || "");
    const [lastName, setLastName] = useState(data?.lastName || "");
    const [section, setSection] = useState(data?.section || "");


    React.useEffect(()=>{
        if(data){
            setFirstName(data.firstName);
            setMiddleName(data.middleName);
            setLastName(data.lastName);
            setSection(data.section);

        }
    },[data]);

    const nameUser = {
        first_name: firstName,
        last_name: lastName,
        middle_initial: middleName
    }

    const sectionUser = {
        student_section: section
    }

    const updateSection = async () =>{
        try {
            const res = await fetch("/api/students/current/section", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sectionUser)
            });
            const response = await res.json();
        } catch (err) {}
    }

    const updateNameUser = async () =>{
        try {
            const res = await fetch("/api/users/current/name", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nameUser)
            });

            const response = await res.json();
            if (response.status === "success") {
                await updateSection();
                await reloadUserInfo();
            } else {
                errorAlert("Failed: " + response.message);
            }
        } catch (err) {
            errorAlert("Fetch failed: " + err);
        }
    }

     const colors = {
        CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
        CESC: "border-[#020180] text-[#020180] bg-[#020180]",
        CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
        SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg-[#174515]",
        OSAS: "border-[#174515] text-[#174515] bg-[#174515]"
      };
      const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    return( 
        <div ref={ref}   className={`${color} ${animate} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 pt-2 pb-5 px-6 bg-white shadow-[2px_2px_grey,-2px_-2px_white] rounded-lg z-[80] inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 ">
                <span className=" font-semibold lg:text-xl text-lg">Update Personal Information</span>
            </div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                updateNameUser();
                onClose();
            }}>
            <div className="mt-6">
                <label>First Name:</label><br />
                <input type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName} maxLength={50}  className="border-2 px-2 text-[#000] h-8 rounded-md w-[100%] mb-4" required/> <br />
                <label>Middle Initial:</label><br />
                <input type="text" onChange={(e)=>setMiddleName(e.target.value)} value={middleName} maxLength={4}  className="border-2 px-2 text-[#000] h-8 rounded-md w-[100%] mb-4" required/> <br /> 
                <label>Last Name:</label><br />
                <input type="text" onChange={(e)=>setLastName(e.target.value)} value={lastName} maxLength={50} required className="border-2 px-2 text-[#000] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Section:</label><br />
                <input type="text" onChange={(e)=>setSection(e.target.value)} value={section} maxLength={50} required className="border-2 px-2 text-[#000] h-8 rounded-md w-[100%] mb-4" /> <br />
            </div>
                <button type="submit" className={` ${color} cursor-pointer w-[100%] rounded-md text-white h-8`}>Update Information</button>
            </form>
            
        </div>
       
    );
});
export default PersonalInformation;