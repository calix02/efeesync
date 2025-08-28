import DefaultProfile from '../assets/default.png';
function AccountSetting(){
    return(
        <div className='max-w-full py-8 px-8  bg-white border-black border-1 rounded-xl shadow-[3px_3px_5px_grey]'>
            <h3 className='text-sm font-[family-name:Helvetica] font-semibold'>Account Settings</h3>
            <div className="w-full bg-white mt-2 border-1 border-[#000] py-8 rounded-xl lg:px-10 md:px-10 px-2 flex lg:flex-row md:flex-row flex-col lg:justify-between md:justify-between items-center">
                    <span className="flex items-center lg:gap-6 md:gap-6 gap-3">
                       <img className='lg:w-25 md:w-25 w-15 lg:h-25 md:h-25 h-15 rounded-full' src={DefaultProfile} alt="" />
                       <div className="flex flex-col ">
                        <span className="font-bold text-md font-[family-name:Helvetica] text-[#621668]">ROLANDO NIERVA II</span>
                        <span className="font-[family-name:arial] text-sm">CITSC Treasurer</span>
                        <span className="font-[family-name:arial] text-xs">rolando.niervaIII@cbsua.edu.ph</span>
                       </div>
                    </span>
                    <span>
                        <button className='lg:w-18 md:w-18 w-25 border-1 border-black py-0.5 lg:text-sm md:text-sm text-xs  rounded-lg mt-4 flex gap-1 items-center justify-center'><i className="fa-solid fa-pen"></i>Edit</button>
                    </span>
            </div>
            <h3 className='text-sm font-[family-name:Helvetica] font-semibold mt-6'>Personal Information</h3>
            <div className='w-full border-1 border-[#000]  mt-2  py-8 rounded-lg '>
                <div className='flex justify-end px-10'>
                    <button className='lg:w-18 md:w-18 w-24 border-1 border-black py-0.5 rounded-lg lg:text-sm md:text-sm text-xs mt-4 flex gap-1 items-center justify-center'><i className="fa-solid fa-pen"></i>Edit</button>
                </div>
                    <div className='lg:px-5 md:px-25 px-5'>
                        <form className='lg:flex justify-center lg:gap-5' action="">
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">Last Name:</label><br />
                                <input className='lg:w-70 w-[100%] rounded-lg py-0.75 border-1 border-black' type="text" />
                            </span>
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">First Name:</label><br />
                                <input className='lg:w-70 w-[100%] rounded-lg py-0.75 border-1 border-black' type="text" />
                            </span>
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">Middle Initial:</label><br />
                                <input className='lg:w-70 w-[100%] rounded-lg py-0.75 border-1 border-black' type="text" />
                            </span>
                        </form>
                    </div>
            </div>
            <div className='flex lg:justify-end md:justify-end justify-center lg:text-sm md:text-sm text-xs mt-3 gap-3'
            >
                <button className='lg:w-50 md:w-50 w-35 rounded-lg flex gap-2 justify-center items-center py-0.75 border-1 border-[#625555]'><i className="fa-solid fa-key"></i>Change Password</button>
                <button className='lg:w-50 md:w-50 w-35 rounded-lg text-[#DE0004] flex gap-2 justify-center items-center py-0.75 border-1 border-[#DE0004]'><i className="fa-solid fa-user"></i>Delete Account</button>

            </div>

        </div>
    );
}
export default AccountSetting;