import React,{useState} from "react";
const UpdateAccountCard = React.forwardRef(({animate, onAnimationEnd,onClose,data}, ref) =>{
    const [org, setOrg] = useState(data?.organization);
    const [studId, setStudId] = useState(data?.studID);
    const [name, setName] = useState(data?.treasurerName);
    const [college, setCollege] = useState(data?.college);

    React.useEffect(()=>{
        if(data){
            setOrg(data.organization);
            setStudId(data.studID);
            setName(data.treasurerName);
            setCollege(data.college);
        }
    },[data]);
    

    const updateTreasurer = () =>{
        alert("Organization: " + org +"\nStud Id: " + studId + "\nName: " + name + "\nCollege: " + college);
    }




    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-105 px-8 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold text-2xl">Update Treasurer</span>
            </div>
            <div className="mt-[15px]">
                <label>Organization</label><br />
                <input type="text" onChange={(e)=>setOrg(e.target.value)} value={org} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Student ID:</label><br />
                <input type="text" onChange={(e)=>setStudId(e.target.value)} value={studId} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Treasurer's Name:</label><br />
                <input type="text" onChange={(e)=>setName(e.target.value)} value={name} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>College:</label><br />
                <input type="text" onChange={(e)=>setCollege(e.target.value)} value={college} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
            </div>
            
                <button onClick={() =>{onClose(); updateTreasurer();}} className="bg-[#174515] w-[100%] rounded-md text-white h-8">Add Treasurer</button>
            
        </div>
       
    );
});
export default UpdateAccountCard;