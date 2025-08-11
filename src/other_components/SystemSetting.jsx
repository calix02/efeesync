import CouncilLogo from '../assets/it.png'
function SystemSetting(){
    return(
        <div className='max-w-full h-90 px-8 mt-6 bg-white mb-6 border-black border-1 rounded-xl shadow-[3px_3px_5px_grey]'>
            <h3 className='text-sm font-[family-name:Helvetica] font-semibold mt-6'>System Settings</h3>
            <div className='w-full h-65 border-1 border-black mt-4 rounded-lg px-10'>
                <div className="w-full border-b-4 border-[#a8a8a8] bg-white mt-2 h-40 flex justify-between items-center">
                <span className="flex items-center gap-6">
                    <img className='w-25 h-25 rounded-full' src={CouncilLogo} alt="" />
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
                <div className='flex justify-start items-center gap-8 text-[#625555] mt-5'>
                    <span>System Color</span>
                    <div className='h-8 w-8 rounded-full bg-[#621668]'></div>
                </div>
            </div>
           

        </div>
    );
}
export default SystemSetting;