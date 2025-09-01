import React, {useState} from "react";
const UploadLogo = React.forwardRef(({animate, onAnimationEnd,onClose,code,data,onUpdate,onUpdateTitle}, ref) =>{
    const [orgName, setOrgName] = useState(data?.organizationName || "");

    React.useEffect(()=>{
        if(data){
            setOrgName(data.organizationName);
        }

    },[data]);
   
    const colors ={
        osas: "text-[#174515] bg-[#174515] border-[#174515]",
        cit: "text-[#174515]",
    };
    const color = colors[code] || "text-[#000] ";

    const [preview, setPreview] = useState(null); 
    const [file, setFile] = useState(null); 

     const handleFileChange = (e) => {
      const selected = e.target.files[0];
      if (selected) {
        setFile(selected);
        setPreview(URL.createObjectURL(selected)); 
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
       organizationName:orgName,
      });
    };

    return( 
        <div ref={ref}   className={` ${animate} ${color} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-110 px-6 bg-white shadow-[2px_2px_grey,-2px_-2px_white] rounded-lg absolute z-[80] inset-0 mx-auto mt-30 `}
        onAnimationEnd={onAnimationEnd}>
            <span hidden>{code}</span>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute  right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-8 border-b-4 ">
                <span className=" font-semibold lg:text-xl text-lg">Update Profile</span>
            </div>
            <div className="mt-5">
                <label>Organization Name:</label><br />
                <input type="text" onChange={(e) =>setOrgName(e.target.value)} value={orgName} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
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
                        <input type="file" onChange={handleFileChange} className="bg-amber-200 cursor-pointer py-1 z-[1] w-30 opacity-0 " />
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
export default UploadLogo;