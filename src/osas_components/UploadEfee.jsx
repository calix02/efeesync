import React, {useState} from "react";
import { errorAlert } from "../utils/alert";

const UploadEfee = React.forwardRef(({animate, onAnimationEnd,onClose,code,data,onUpdate,onUpdateTitle}, ref) =>{
    const [name, setName] = useState(data?.systemName || "");

    React.useEffect(()=>{
        if(data){
            setName(data.systemName);
        }

    },[data]);
   
     const colors = {
        CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
        CESC: "border-[#020180] text-[#020180] bg-[#020180]",
        CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COTSC: "border-[#847714] text-[#847714]  bg-[#847714]",
        SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg-[#174515]",
        OSAS: "border-[#174515] text-[#174515] bg-[#174515]",


    };
    const color = colors[code] || "border-black text-black";

      

    const [preview, setPreview] = useState(null); 
    const [file, setFile] = useState(null); 

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
    const handleUpdate = () => {
      if (file) {
        onUpdate(file);   
        onClose();        
      }
    };
    const handleSubmit = () => {
      onUpdateTitle({
       systemName : name,
      });
    };

    return( 
        <div ref={ref}   className={` ${animate} ${color} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-110 px-6 bg-white shadow-[2px_2px_grey,-2px_-2px_white] rounded-lg  z-[80] inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <span hidden>{code}</span>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute  right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-8 border-b-4 ">
                <span className=" font-semibold lg:text-xl text-lg">Logo and Name</span>
            </div>
            <div className="mt-5">
                <label>System Name:</label><br />
                <input type="text" onChange={(e) =>setName(e.target.value)} required value={name} className="border-2 px-2  h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Upload Photo:</label><br />
                 <div className="bg-[#c3c3c3c2] flex flex-col justify-center items-center  w-[100%] h-50 rounded-lg mb-4">
                    {preview ? 
                        (<img src={preview} alt="Preview" className="w-25 h-25 rounded-full object-cover"/>) 
                        : (
                        <>
                            <i className="fa-solid fa-arrow-up-from-bracket text-xl"></i>
                            <p className="text-sm">Upload image or file.</p>
                        </>
                    )}
                    <div className=" relative w-[100%] mt-2 flex justify-center">
                        <button className="w-25 h-8 cursor-pointer  border-1 rounded-md  absolute">Browse</button>
                        <input type="file" accept=".jpeg .svg .png" onChange={handleFileChange} className="bg-amber-200 cursor-pointer py-1 z-[1] w-30 opacity-0 " />
                    </div>
               </div>
            </div>
                <button onClick={() =>{
                    if(file) handleUpdate(); 
                    handleSubmit();}} 
                    disabled={!file}  className={`${color} cursor-pointer w-[100%] text-white rounded-md h-8`}>Update Profile</button>
        </div>
       
    );
});
export default UploadEfee;