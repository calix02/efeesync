import DefaultProfile from '../assets/default.png';
function SettingCard({upload,edit,change,qr}){
    return(
        <div className="w-[100%] py-6 px-6 mb-6 bg-white border-2 border-[#000]  rounded-lg shadow-[2px_2px_3px_grey]">
            <h2 className="text-md font-bold ">Account Setting</h2>
            <div className="w-full bg-white mt-2 border-2 border-[#000] h-40 rounded-xl px-10 flex justify-between items-center">             
                <span className="flex items-center gap-6">
                    <img className='w-25 h-25 rounded-full' src={DefaultProfile} alt="" />
                    <div className="flex flex-col ">
                        <span className="font-bold text-md font-[family-name:Helvetica] text-[#621668]">ROLANDO NIERVA II</span>
                        <span className="font-[family-name:arial] text-sm">CITSC Treasurer</span>
                        <span className="font-[family-name:arial] text-[10px]">rolando.niervaIII@cbsua.edu.ph</span>
                    </div>
                </span>
                <span>
                    <button onClick={upload} className='w-18 cursor-pointer border-1 border-black py-0.5 rounded-md text-sm mt-4 flex gap-1 items-center justify-center'><i className="fa-solid fa-pen"></i>Edit</button>
                </span>
            </div>
            <h2 className="text-md font-bold pt-4 ">Personal Information</h2>
            <div className="mt-2 w-[100%] h-60 border-2 rounded-lg border-[#000]">
                <div className='flex justify-end px-10'>
                    <button onClick={edit} className='w-18 border-1 border-black py-0.5 rounded-md text-sm mt-4 flex gap-1 items-center justify-center'><i className="fa-solid fa-pen"></i>Edit</button>
                    
                </div>
                <div className=''>
                     <form className='flex px-3 flex-wrap justify-start gap-5' action="">
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">Last Name:</label><br />
                                <input className='w-88 rounded-lg py-0.75 border-1 border-black' type="text" />
                            </span>
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">First Name:</label><br />
                                <input className='w-88 rounded-lg py-0.75 border-1 border-black' type="text" />
                            </span>
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">Middle Initial:</label><br />
                                <input className='w-88 rounded-lg py-0.75 border-1 border-black' type="text" />
                            </span>
                            <span>
                                <label className='text-[#595959] text-sm font-[family-name:Arial]' htmlFor="">Middle Initial:</label><br />
                                <input className='w-90 rounded-lg py-0.75 border-1 border-black' type="text" />
                            </span>
        
                        </form>
                </div>
                <div className='mt-2 flex justify-end px-10'>
                    <button onClick={change} className='w-50 rounded-lg flex gap-2 justify-center items-center py-0.75 border-1 border-[#625555]'><i className="fa-solid fa-key"></i>Change Password</button>

                </div>
            </div>
            <h2 className="text-md font-bold pt-4 ">QR Code</h2>
            <div className="w-[100%] rounded-lg h-30 border-2 border-black mt-2 px-10 items-center flex justify-between">
                <span className='px-4 py-2 border-2 border-black rounded-md'><i class="fa-solid fa-qrcode text-7xl"></i></span>
                <button onClick={qr} className='w-50 rounded-lg flex gap-2 justify-center items-center py-0.75 border-1 border-[#625555]'>View QR Code</button>

            </div>


        </div>
    );

}
export default SettingCard;