import React,{useState} from "react";
import { errorAlert } from "../utils/alert";
const SendPayment = React.forwardRef(({animate, onAnimationEnd,onClose, code}, ref) =>{

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
    const colors = {
            CIT: "border-[#621668] text-[#621668] bg-[#621668]",
            COE: "border-[#020180] text-[#020180] bg-[#020180]",
            COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
            COT: "border-[#847714] text-[#847714] bg-[#847714]",
            ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
            SSC: "border-[#174515] text-[#174515] bg-[#174515]",
        };

    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    return( 
        <div ref={ref}   className={` ${animate} ${color} lg:w-[420px] w-[390px] py-4 px-8 bg-white  rounded-lg  z-50 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-[20px] border-b-4 ">
                <span className="font-semibold text-[22px]">Sending Payment</span>
            </div>
            <form action="" onSubmit={(e) =>{
                clickedPayment();
                e.preventDefault();
                onClose();
            }}>
            <div className="mt-[15px]">
                 <label>Upload Proof of Payment:</label><br />
                 <div className="bg-[#c3c3c3c2] flex flex-col justify-center items-center  w-[100%] h-50 rounded-lg mb-4">
                    <i className="fa-solid fa-arrow-up-from-bracket text-xl"></i>
                    <p className="text-sm">Upload image or file.</p>
                    <div className=" relative w-[100%] mt-2 flex justify-center">
                        <button className="w-25 h-8 cursor-pointer  border-1 rounded-md absolute">Browse</button>
                        <input type="file"
                        accept=".png .svg .jpeg .jpg"
                        required
                        onChange={handleFileChange} className="bg-amber-200 py-1 z-[1] cursor-pointer w-30 opacity-0 " />
                    </div>
               </div>
                
                 
            </div>
            
                <button type="submit" className={` ${color} cursor-pointer w-[100%] rounded-[5px] text-white py-[5px]`}>Send Payment</button>
            </form>
            
        </div>
       
    );
});
export default SendPayment;