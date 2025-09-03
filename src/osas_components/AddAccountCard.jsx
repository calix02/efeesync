import React,{useState} from "react";
const AddAccountCard = React.forwardRef(({animate, onAnimationEnd,onClose}, ref) =>{
    const [org, setOrg] = useState("");
    const [studId, setStudId] = useState("");
    const [name, setName] = useState("");
    const [college, setCollege] = useState("");

    const changeOrg = (e) => setOrg(e.target.value);
    const changeStudId = (e) => setStudId(e.target.value);
    const changeName = (e) => setName(e.target.value);
    const changeCollege = (e) => setCollege(e.target.value);

    const addTreasurer = () =>{
        alert("Organization: " + org +"\nStud Id: " + studId + "\nName: " + name + "\nCollege: " + college);
    }




    return( 
        <div ref={ref}   className={` ${animate} lg:w-100 w-80 h-105 px-8 bg-white shadow-[2px_2px_#174515,-2px_-2px_white] rounded-lg absolute z-80 inset-0 mx-auto mt-40 `}
        onAnimationEnd={onAnimationEnd}>
            <div className="mt-3 relative">
                <span onClick={onClose} className="material-symbols-outlined absolute right-0.5 cursor-pointer">disabled_by_default</span>
            </div>
            <div className="mt-6 border-b-4 border-[#174515]">
                <span className="text-[#174515] font-semibold text-2xl">Add Treasurer</span>
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                addTreasurer();
                onClose();
            }}>
            <div className="mt-[15px]">
                <label>Organization</label><br />
                <input type="text" onChange={changeOrg} value={org} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                <label>Student ID:</label><br />
                <input type="text" onChange={changeStudId} value={studId} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>Treasurer's Name:</label><br />
                <input type="text" onChange={changeName} value={name} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
                 <label>College:</label><br />
                <input type="text" onChange={changeCollege} value={college} className="border-2 px-2 border-[#174515] h-8 rounded-md w-[100%] mb-4" /> <br />
            </div>
            
                <button type="submit" className="bg-[#174515] w-[100%] rounded-md text-white h-8">Add Treasurer</button>
            </form>
            
        </div>
       
    );
});
export default AddAccountCard;