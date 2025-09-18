import "../animate.css";
function AccountSetting({upload,accName,accRole,accEmail,profile,changePass,changeInfo,code}){
    const animate = "card-In";
     const colors = {
        CIT: "border-[#621668] text-[#621668] bg-[#621668]",
        COE: "border-[#020180] text-[#020180] bg-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COT: "border-[#847714] text-[#847714] bg-[#847714]",
        SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg-[#174515]"
      };
      const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

      const hovers = {
        CIT: "hover:bg-[#621668]",
        COE: "hover:bg-[#020180]",
        COC: "hover:bg-[#660A0A]",
        COT: "hover:bg-[#847714]",
        SCEAP: "hover:bg-[#6F3306]",
        SSC: "hover:bg-[#174515]"
      };
      const hover = hovers[code] || "hover:bg-grey";


    return(
        <div className={`w-[100%] ${animate} ${color} py-8 px-8 font-[family-name:Arial]  bg-white border-black border-1 rounded-xl shadow-[3px_3px_5px_grey]`}>
            <h3 className='text-sm font-[family-name:Helvetica] text-black font-semibold'>Account Settings</h3>
            <div className="w-full bg-white mt-2 border-1 border-[#000] py-8 rounded-xl lg:px-10 md:px-10 px-2 flex lg:flex-row md:flex-row flex-col lg:justify-between md:justify-between items-center">
                    <span className="flex lg:flex-row md:flex-row flex-col items-center lg:gap-6 md:gap-6 gap-3">
                        <span className="relative">
                            <img className='w-25  h-25  rounded-full border-2 border-[#313131]' src={profile} alt="" />
                            <button onClick={upload} className={`${color} absolute h-7 w-7 flex justify-center items-center text-white rounded-full   bottom-1 right-1 cursor-pointer`}><i className="fa-solid fa-pen-to-square text-md "></i></button>
                        </span>
                       <div className="flex flex-col lg:text-justify md:text-justify text-center ">
                        <span className="font-bold text-md font-[family-name:Helvetica]">{accName}</span>
                        <span className="font-[family-name:arial] text-sm">{accRole}</span>
                        <span className="font-[family-name:arial] text-xs">{accEmail}</span>
                       </div>
                    </span>
                    <span>
                    <button onClick={changeInfo} className={` ${hover} lg:w-18 md:w-18 cursor-pointer text-black  transition duration-100 hover:text-white w-24 border-1 border-black py-0.5 rounded-lg lg:text-sm md:text-sm text-xs mt-4 flex gap-1 items-center justify-center`}><i className="fa-solid fa-pen"></i>Edit</button>
                    </span>
            </div>
            <div className="flex lg:justify-end justify-center mt-3">
                <button onClick={changePass} className={` ${hover} text-black px-4 cursor-pointer transition duration-100 hover:text-white rounded-lg flex gap-2 justify-center items-center py-0.75 border-1 border-[#625555]`}><i className="fa-solid fa-key"></i>Change Password</button>
            </div>
            {/* 
            <h3 className='text-sm font-[family-name:Helvetica] font-semibold mt-6'>Personal Information</h3>
            <div className='w-full border-1 font-[family-name:Arial] lg:text-sm text-xs border-[#000]  mt-2  py-8 rounded-lg '>
                <div className='flex justify-end px-10'>
                </div>
                    <div className='lg:px-5 md:px-10 px-5'>
                        <form className='grid lg:grid-cols-3 md:grid-cols-2 lg:gap-8 md:gap-8' action="">
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">Full Name:</label><br />
                                <input onChange={(e) =>setName(e.target.value)} readOnly value={accName}  className='px-2 w-full rounded-md py-1 border-1 border-black' type="text" />
                            </span>
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">Role:</label><br />
                                <input onChange={(e) =>setRole(e.target.value)} readOnly value={accRole} className=' px-2 w-full rounded-md py-1 border-1 border-black' type="text" />
                            </span>
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">Institutional Email:</label><br />
                                <input onChange={(e) =>setEmail(e.target.value)} readOnly value={accEmail} className=' px-2 w-full rounded-md py-1 border-1 border-black' type="text" />
                            </span>
                        </form>
                    </div>
            </div>
           */}
        </div>
    );
}
export default AccountSetting;