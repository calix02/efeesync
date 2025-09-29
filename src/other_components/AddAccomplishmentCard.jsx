
import React,{useState} from "react";
import { successAlert,errorAlert } from "../utils/alert";
const AddAccomplishmentCard = React.forwardRef(({animate, onAnimationEnd,onClose, code}, ref) =>{

    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null); 

    const changeEventName = (e) => setEventName(e.target.value);
    const changeEventDesc = (e) => setEventDesc(e.target.value);
     
    
     const handleFileChange = (e) => {
      const selected = e.target.files[0];
      if(selected && !/\.(png|jpe?g|svg)$/i.test(selected.name)){
        errorAlert("Only png,svg,jpeg are allowed");
         e.target.value = "";

      }else if (selected) {
        setFile(selected);
        setPreview(URL.createObjectURL(selected)); // show preview
          }
        };
    const handleSubmit =() =>{
        successAlert("EventName: " + eventName + 
            "Event Desc: " + eventDesc
        );

    }
    const colors = {
        CIT: "border-[#621668] text-[#621668] bg-[#621668]",
        COE: "border-[#020180] text-[#020180] bg-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COT: "border-[#847714] text-[#847714] bg-[#847714]",
        ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg[#174515]",
    };

    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    return( 
        <div ref={ref}   className={` ${animate} ${color} lg:w-100 md:w-100 w-80 lg:h-118 md:h-116 h-125 px-6 bg-white  rounded-lg text-sm font-[family-name:Arial]  z-80 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-6 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-3 border-b-4 ">
                <span className=" font-semibold text-xl">Add Accomplishment Report</span>
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                handleSubmit();
                onClose();
            }}>
            <div className="mt-6">
                <label>Event Name :</label><br />
                <input type="text" onChange={changeEventName} required value={eventName} className="border-2  px-2 h-8 rounded-sm w-[100%] mb-4" /> <br />
                <label>Event Description:</label><br />
               <textarea className="border-2  px-2 h-8 rounded-sm w-[100%] mb-4" name="" onChange={changeEventDesc} required value={eventDesc} id=""></textarea>
               <div className="bg-[#c3c3c3c2] flex flex-col justify-center items-center  w-[100%] h-45 rounded-sm mb-4">
                    {preview ? 
                        (<img src={preview} alt="Preview" className="w-25 h-25  object-cover"/>) 
                        : (
                        <>
                            <i className="fa-solid fa-arrow-up-from-bracket text-xl"></i>
                            <p className="text-sm">Upload image or file.</p>
                        </>
                    )}
                    <div className=" relative w-[100%] mt-[10px] flex justify-center">
                        <button className="w-30 h-8 cursor-pointer  border-1 rounded-sm  absolute">Browse</button>
                        <input type="file" accept=".png .svg .jpeg .jpg" required onChange={handleFileChange} className="bg-amber-200 py-1.5 z-[1] w-30 opacity-0 " />
                    </div>
               </div>
            </div>
            
                <button type="submit" className={` ${color} w-[100%] rounded-sm text-white h-8`}>Add Report</button>
            </form>
            
        </div>
       
    );
});
export default AddAccomplishmentCard;