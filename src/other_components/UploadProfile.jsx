import React, {useState} from "react";
const UploadProfile = React.forwardRef(({animate, onAnimationEnd,onClose,code,onUpdate}, ref) =>{
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
        setPreview(URL.createObjectURL(selected)); // show preview
      }
    };
    const handleUpdate = () => {
      if (file) {
        onUpdate(file);   // send file back to parent
        onClose();        // close modal
      }
    };

    return( 
        <div ref={ref}   className={` ${animate} ${color} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-95 px-6 bg-white shadow-[2px_2px_grey,-2px_-2px_white] rounded-lg absolute z-[80] inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <span hidden>{code}</span>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute  right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-8 border-b-4 ">
                <span className=" font-semibold lg:text-xl text-lg">Update Profile</span>
            </div>
            <form onSubmit={(e) =>{
                e.preventDefault();
                handleUpdate();
            }}>
            <div className="mt-5">
               
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
            
                <button type="submit" disabled={!file}  className={`${color} cursor-pointer w-[100%] text-white rounded-md h-8`}>Update Profile</button>
            </form>
            
        </div>
       
    );
});
export default UploadProfile;