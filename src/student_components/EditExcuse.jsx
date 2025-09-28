import React,{useState} from "react";
import { successAlert } from "../utils/alert";
const EditExcuse = React.forwardRef(({animate, onAnimationEnd,onClose,code}, ref) =>{
     const colors = {
        CIT: "border-[#621668] text-[#621668] bg-[#621668]",
        COE: "border-[#020180] text-[#020180] bg-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COT: "border-[#847714] text-[#847714] bg-[#847714]",
        ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg-[#174515]"
    };
    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    const [file, setFile] = useState(""); 
    
     const [studentName, setStudentName] = useState("");
     const [yearSection, setYearSection] = useState("");
     const [eventName, setEventName] = useState("");
     const [dateFrom , setDateFrom] = useState("");
     const [dateTo, setDateTo] = useState("");
    
     const changeStudentName = (e) => setStudentName(e.target.value);
     const changeYearSection = (e) => setYearSection(e.target.value);
     const changeEventName = (e) => setEventName(e.target.value);
     const changeDateFrom = (e) => setDateFrom(e.target.value);
     const changeDateTo = (e) => setDateTo(e.target.value);
    
    const clickedSendExcuse = () =>{
        successAlert("Student Naem : " + studentName +
            "Year: "  + yearSection +
            "Event Name: " + eventName +
            "Date: " + dateFrom + " - " + dateTo 
        );
    
    }
  const [preview, setPreview] = useState(null);
    
        const handleFileChange = (e) => {
            const selected = e.target.files[0];
            if(selected && !/\.(pdf|docx)$/i.test(selected.name)){
            errorAlert("Only pdf and word are allowed");
            e.target.value = "";
        
            }else if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected)); // show preview
            }
        };

    return( 
        <div ref={ref}   className={` ${animate} ${color} lg:w-[420px] w-[390px] py-4 px-8 bg-white  rounded-lg  z-80 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className=" border-b-4 ">
                <span className=" font-semibold text-[22px]">Edit Excuse Letter</span>
            </div>
            <form action="" onSubmit={(e) =>{
                clickedSendExcuse();
                onClose();
                e.preventDefault();
            }}>
            <div className="mt-[15px]">
                {/* 
                <label>Student Name:</label><br />
                <input type="text" required className="border-2 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" /> <br />
                <label>Year & Section:</label><br />
                <input type="text" required className="border-2 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" /> <br />
                 <label>Event Name:</label><br />
                <input type="text" required className="border-2 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" /> <br />
                 <label>Absent Date:</label><br />
                 <div className="w-[100%] flex gap-3">
                    <input className="border-2 px-3 border-[#8A2791] h-8 rounded-md w-[50%] mb-4"  required type="date" />
                    <input className="border-2 px-3 h-8 border-[#8A2791] rounded-md w-[50%] mb-4" required type="date" />

                 </div>
                 */}
                 <label>Upload Excuse Letter:</label><br />
                 <div className="bg-[#c3c3c3c2] flex flex-col justify-center items-center  w-[100%] h-50 rounded-lg mb-4">
                    <i className="fa-solid fa-arrow-up-from-bracket text-xl"></i>
                    <p className="text-sm">Upload image or file.</p>
                    <div className=" relative w-[100%] mt-2 flex justify-center">
                        <button className="w-25 h-8 cursor-pointer  border-1 rounded-md  absolute">Browse</button>
                        <input type="file" onChange={handleFileChange} required  className="bg-amber-200 py-1 z-[1] w-30 opacity-0 " />
                    </div>
               </div>
                
                 
            </div>
            
                <button type="submit"  className={` w-[100%] ${color} cursor-pointer rounded-[5px] text-white py-[5px]`}>Send Request</button>
            </form>
            
        </div>
       
    );
});
export default EditExcuse;