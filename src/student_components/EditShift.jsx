import React,{useState} from "react";
import { successAlert } from "../utils/alert";
const EditShift = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{
    const [studentName, setStudentName] = useState("");
    const [desiredCollege, setDesiredCollege] = useState("");
    const [currentCollege, setCurrentCollege] = useState("");
    const [date, setDate] = useState("");

    const changeStudentName = (e) => setStudentName(e.target.value);
    const changeCurrentCollege = (e) => setCurrentCollege(e.target.value);
    const changeDesiredCollege = (e) => setDesiredCollege(e.target.value);
    const changeDate = (e) => setDate(e.target.value);



    const clickedSendShift = () =>{
        successAlert("Student Name: " + studentName +
            "Current College: " + currentCollege +
            "Desired College: " + desiredCollege + 
            "Date: " + date 
        )
    }

    return( 
        <div ref={ref}   className={` ${animate} lg:w-[420px] w-[390px] h-105 px-8 bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-[10px]  z-80 inset-0 mx-auto  `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-[10px] relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-[20px] border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold text-[22px]">Edit Shifting Request</span>
            </div>
            <form action="" onSubmit={(e) =>{
                clickedSendShift();
                onClose();
                e.preventDefault();
            }}>
            <div className="mt-[15px]">
                <label>Student Name:</label><br />
                <input type="text" onChange={changeStudentName} required value={studentName} className="border-2 px-3 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" /> <br />
                <label>Current College</label><br />
                <select className="border-2 border-[#8A2791] h-8 px-3 rounded-[5px] w-[100%] mb-4" onChange={changeCurrentCollege} required name="" id="">
                    <option value=""></option>
                    <option value="College of Education">College of Education</option>
                    <option value="College of Criminology">College of Criminology</option>
                    <option value="College of Industrial Technology">College of Industrial Technology</option>
                    <option value="College of Information Technology">College of Information Technology</option>
                </select>
                 <label>Desired College:</label><br />
                 <select className="border-2 border-[#8A2791] px-3 h-8 rounded-[5px] w-[100%] mb-4"  onChange={changeDesiredCollege} required name="" id="">
                    <option value=""></option>
                    <option value="College of Education">College of Education</option>
                    <option value="College of Criminology">College of Criminology</option>
                    <option value="College of Industrial Technology">College of Industrial Technology</option>
                    <option value="College of Information Technology">College of Information Technology</option>
                </select>
                 <label>Date Requested:</label><br />
                 <input className="border-2 px-3 border-[#8A2791] h-8 rounded-[5px] w-[100%] mb-4" onChange={changeDate} required value={date} type="date" />
            </div>
            
                <button type="submit"  className="bg-[#561b5a] w-[100%] rounded-[5px] text-white py-[5px]">Send Request</button>
            </form>
            
        </div>
       
    );
});
export default EditShift;