import React, {useState} from "react";
const AddStudentOsasCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{
    const [studId, setStudId] = useState("");
    const [name, setName] = useState("");
    const [college, setCollege] = useState("");
    const [program, setProgram] = useState("");

    const changeStudId = (e) => setStudId(e.target.value);
    const changeName = (e) => setName(e.target.value);
    const changeCollege = (e) => setCollege(e.target.value);
    const changeProgram = (e) => setProgram(e.target.value);

    const addStudent = () =>{
        alert ("Student ID: " + studId + "\nName: " + name + "\nCollege: " + college + "\nProgram: " + program);
    }

    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-105 px-8 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-50 inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold lg:text-xl text-lg">Add Student</span>
            </div>
            <div className="mt-6">
                <label>Student ID:</label><br />
                <input type="text" onChange={changeStudId} value={studId} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Student Name:</label><br />
                <input type="text" onChange={changeName} value={name} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>College:</label><br />
                <input type="text" onChange={changeCollege} value={college} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Program:</label><br />
                <input type="text" onChange={changeProgram} value={program} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
            </div>
                <button onClick={()=> {addStudent(); onClose();}} className="bg-[#174515] w-[100%] rounded-md text-white h-8">Add Student</button>
        </div>
    );
});
export default AddStudentOsasCard;