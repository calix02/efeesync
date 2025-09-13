import React,{useState} from "react";
import { successAlert } from "../utils/alert";
const ScanAttendance = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{
   
          
    return( 
        <div ref={ref}   className={` ${animate} lg:w-200 w-80 py-6 px-6 lg:text-sm text-xs font-[family-name:Arial] bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg z-80 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className=" flex justify-between">
                <h3 className=" font-poppins font-bold text-lg">Show Your QR Code Here</h3>
                <span onClick={onClose} className="material-symbols-outlined cursor-pointer">disabled_by_default</span>
            </div>
            <div className="grid grid-cols-2 mt-6">
                <div className="w-[100%] text-center text-xs px-3">
                    <p className="mx-4">To record your attendance, simply show your QR Code in front of the laptop camera and wait for the system to confirm.</p>
                    <div className="w-[100%] bg-[#D9D9D9] h-90">

                    </div>
                </div>
                <div className="w-[100%] text-[#621668] font-[family-name:Arial] px-6 ">
                    <h3 className="font-bold text-center mb-12 font-poppins text-lg ">Attendance Record</h3>
                    <form action="">
                        <label className="text-sm " htmlFor="">Student ID: </label><br />
                        <input type="text"  required  className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mt-2 mb-3" /> <br />

                        <label className="text-sm " htmlFor="">Student Name: </label><br />
                        <input type="text"  required  className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mt-2 mb-3" /> <br />

                        <label className="text-sm " htmlFor="">Year & Section </label><br />
                        <input type="text"  required  className="border-2 px-2 border-[#8A2791] h-8 rounded-md w-[100%] mt-2 mb-3" /> <br />
                        <label className="text-sm " htmlFor="">Attendance Logs: </label><br />
                        <div className="border-2 px-2 flex justify-center items-center gap-2 border-[#8A2791] h-8 rounded-md w-[100%] mt-2 mb-3">
                            <span className="flex justify-center items-center">
                                <input type="radio" /> 
                                <label htmlFor="">AM IN</label>
                            </span>
                            <span className="flex justify-center items-center">
                                <input type="radio" /> 
                                <label htmlFor="">AM OUT</label>
                            </span>
                            <span className="flex justify-center items-center">
                                <input type="radio" /> 
                                <label htmlFor="">PM IN</label>
                            </span>
                            <span className="flex justify-center items-center">
                                <input type="radio" /> 
                                <label htmlFor="">PM OUT</label>
                            </span>
                        </div>
                        <button className="w-[100%] text-white mt-2 rounded-md h-8 bg-[#621668]">Mark Present</button>






                    </form>
                    


                </div>

            </div>
            
        </div>
       
    );
});
export default ScanAttendance;