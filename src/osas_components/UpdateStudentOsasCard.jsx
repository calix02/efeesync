import React,{useState} from "react";
const UpdateStudentOsasCard = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{
     const [studId, setStudId] = useState(data?.studID || "");
    const [name, setName] = useState(data?.studName || "");
    const [college, setCollege] = useState(data?.college || "");
    const [program, setProgram] = useState(data?.program || "");

    React.useEffect(() =>{
        if(data){
            setStudId(data.studID);
            setName(data.studName);
            setCollege(data.college);
            setProgram(data.program);
        }
    },[data]);

    const updateStudent = () =>{
        alert("Stud ID: " + studId + "\nName: " + name + "\nCollege: " + college + "\nProgram: " + program);
    }

    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-105 font-[family-name:Arial] lg:text-sm text-xs px-6 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold lg:text-xl text-lg">Update Student</span>
            </div>
            <div className="mt-6">
                <label>Student ID:</label><br />
                <input type="text" onChange={(e) =>setStudId(e.target.value)} value={studId} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Student Name:</label><br />
                <input type="text" onChange={(e) =>setName(e.target.value)} value={name} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>College:</label><br />
                <input type="text" onChange={(e) =>setCollege(e.target.value)} value={college} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Program:</label><br />
                <input type="text" onChange={(e) =>setProgram(e.target.value)} value={program} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
            </div>
            
                <button onClick={() =>{onClose(); updateStudent();}} className="bg-[#174515] w-[100%] rounded-md text-white h-8">Update Student</button>
        </div>
       
    );
});
export default UpdateStudentOsasCard;