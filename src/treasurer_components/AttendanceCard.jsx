import React, {useState} from "react";
import { successAlert } from "../utils/alert";

const AttendanceCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{
    const [studentName, setStudentName] = useState("");
    const [yearSection, setYearSection] = useState("");

    const [morningIn, setMorningIn] = useState("");
    const [morningOut, setMorningOut] = useState("");
    const [afternoonIn, setAfternoonIn] = useState("");
    const [afternoonOut, setAfternoonOut] = useState("");


    const changeStudentName = (e) => setStudentName(e.target.value);
    const changeYearSection = (e) => setYearSection(e.target.value);

    const changeMorningIn = (e) => setMorningIn(e.target.value);
    const changeMorningOut = (e) => setMorningOut(e.target.value);
    const changeAfternoonIn = (e) => setAfternoonIn(e.target.value);
    const changeAfternoonOut = (e) => setAfternoonOut(e.target.value);


    const submit = (e) =>{
        successAlert("Student Name: " + studentName +
            "\nYear: " + yearSection  +
            "\nMorning In: " + morningIn +
            "\nMorningOut: " + morningOut + 
            "\nAfternoonIn: " + afternoonIn +
            "AfternoonOut:  " + afternoonOut
        );
        
    }


    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-133 px-6 font-[family-name:Arial] lg:text-sm text-xs bg-white shadow-[2px_2px_#8A2791,-2px_-2px_white] rounded-lg  z-80 inset-0 mx-auto `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-2 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#8A2791]">
                <span className="text-[#8A2791] font-semibold lg:text-xl text-lg">Add Attendee</span>
            </div>
            <form onSubmit={(e)=>{
                submit();
                onClose();
                e.preventDefault();

            }} >
            <div className="mt-4">
                <label>Student Name:</label><br />
                <input type="text" onChange={changeStudentName} required value={studentName}  className=" px-2 border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Year & Section:</label><br />
                <input type="text" onChange={changeYearSection} required value={yearSection}  className=" px-2 border-2 border-[#8A2791] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Morning In:</label><br />
                 <select onChange={changeMorningIn} value={morningIn} name="" id="" className=" px-2 border-2 cursor border-[#8A2791] h-8 rounded-md w-[100%] mb-4">
                    <option value=""></option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Excuse">Excuse</option>
                 </select>
                 <label>Morning Out:</label><br />
                  <select onChange={changeMorningOut} value={morningOut} name="" id="" className=" px-2 border-2 cursor border-[#8A2791] h-8 rounded-md w-[100%] mb-4">
                    <option value=""></option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Excuse">Excuse</option>
                 </select>
                <label>Afternoon In</label><br />
                <select onChange={changeAfternoonIn} value={afternoonIn} name="" id="" className=" px-2 border-2 cursor border-[#8A2791] h-8 rounded-md w-[100%] mb-4">
                    <option value=""></option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Excuse">Excuse</option>
                 </select>
                
                <label>Afternoon Out</label><br />
                <select onChange={changeAfternoonOut} value={changeAfternoonIn} name="" id="" className=" px-2 border-2 cursor border-[#8A2791] h-8 rounded-md w-[100%] mb-4">
                    <option value=""></option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Excuse">Excuse</option>
                 </select>
            
            </div>
            
                <button type="submit"  className="bg-[#561b5a] w-[100%] cursor-pointer rounded-md text-white h-8">Add Attendee</button>
            </form>
        </div>
       
    );
});
export default AttendanceCard;