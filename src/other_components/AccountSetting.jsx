import DefaultProfile from '../assets/default.png';
function AccountSetting(){
    return(
        <div className='max-w-full h-120 px-8 bg-white border-black border-1 rounded-xl shadow-[3px_3px_5px_grey]'>
            <h3 className='text-sm font-[family-name:Helvetica] font-semibold mt-6'>Account Settings</h3>
            <div className="w-full bg-white mt-2 border-1 border-[#000] h-40 rounded-xl px-10 flex justify-between items-center">
                
                    <span className="flex items-center gap-6">
                       <img className='w-25 h-25 rounded-full' src={DefaultProfile} alt="" />
                       <div className="flex flex-col ">
                        <span className="font-bold text-md font-[family-name:Helvetica] text-[#621668]">ROLANDO NIERVA II</span>
                        <span className="font-[family-name:arial] text-sm">CITSC Treasurer</span>
                        <span className="font-[family-name:arial] text-[10px]">rolando.niervaIII@cbsua.edu.ph</span>
                       </div>
                    </span>
                    <span>
                        <button className='w-18 border-1 border-black py-0.5 rounded-lg text-sm mt-4 flex gap-1 items-center justify-center'><i className="fa-solid fa-pen"></i>Edit</button>
                    </span>
            </div>
            <h3 className='text-sm font-[family-name:Helvetica] font-semibold mt-6'>Personal Information</h3>
            <div className='w-full border-1 border-[#000]  mt-2 h-35 rounded-lg '>
                <div className='flex justify-end px-10'>
                    <button className='w-18 border-1 border-black py-0.5 rounded-lg text-sm mt-4 flex gap-1 items-center justify-center'><i className="fa-solid fa-pen"></i>Edit</button>
                </div>
                    <div className='px-10'>
                        <form className='flex justify-center gap-5' action="">
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">Last Name:</label><br />
                                <input className='w-85 rounded-lg py-0.75 border-1 border-black' type="text" />
                            </span>
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">First Name:</label><br />
                                <input className='w-85 rounded-lg py-0.75 border-1 border-black' type="text" />
                            </span>
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">Middle Initial:</label><br />
                                <input className='w-85 rounded-lg py-0.75 border-1 border-black' type="text" />
                            </span>
                           
                        </form>
                    </div>
            </div>
            <div className='flex justify-end mt-3 gap-3'>
                <button className='w-50 rounded-lg flex gap-2 justify-center items-center py-0.75 border-1 border-[#625555]'><i className="fa-solid fa-key"></i>Change Password</button>
                <button className='w-50 rounded-lg text-[#DE0004] flex gap-2 justify-center items-center py-0.75 border-1 border-[#DE0004]'><i className="fa-solid fa-user"></i>Delete Account</button>

            </div>

        </div>
    );
}
export default AccountSetting;