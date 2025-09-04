import "../animate.css";

function SystemSetting({upload,logo,title,efeeLogo,updateEfeeLogo,systemName}){
    const animate = "card-In";
    return(
        <div className={`w-[100%] ${animate}  py-8 px-8 mt-6 bg-white mb-6 border-black border-1 rounded-xl shadow-[3px_3px_5px_grey]`}>
            <h3 className='text-sm font-[family-name:Helvetica] font-semibold'>System Settings</h3>
            <div className="w-[100%] px-10 font-[family-name:Arial] lg:text-sm py-10 border-1 border-[#000] mt-2 rounded-lg">
                <div className="w-[100%] border-b-4 border-[#635C5C30] py-6 flex lg:flex-row md:flex-row flex-col items-center justify-between">
                    <span className="flex gap-9 items-center">
                        <img className="w-30 mt-[-35px] rounded-full" src={logo} alt="" />
                        <span>
                            <h2 className="lg:text-2xl md:text-2xl text-xl ">{title}</h2>
                            <span className="lg:flex md:flex gap-5 mt-6 items-center">
                            <p className="text-[#625555]">System Color</p>
                            <div className="w-6 h-6 rounded-full bg-[#174515]"></div>

                            </span>
                        </span>
                    </span>
                    <span>
                        <button onClick={upload}  className='lg:w-18 md:w-18 cursor-pointer hover:bg-[#174515] transition duration-100 hover:text-white w-24 border-1 border-black py-0.5 rounded-lg lg:text-sm md:text-sm text-xs mt-4 flex gap-1 items-center justify-center'><i className="fa-solid fa-pen"></i>Edit</button>
                    </span>
                    
                </div>
                 <div className="w-[100%] flex lg:flex-row md:flex-row flex-col justify-between items-center rounded-lg mt-2 ">
                    <span className="flex  gap-10 items-center ml-10">
                        <img src={efeeLogo} className="w-20" alt="" />
                        <p className="font-semibold text-md text-[#174515]">{systemName}</p>
                    </span>
                    <span>
                        <button onClick={updateEfeeLogo}  className='lg:w-18 md:w-18 cursor-pointer hover:bg-[#174515] transition duration-100 hover:text-white w-24 border-1 border-black py-0.5 rounded-lg lg:text-sm md:text-sm text-xs mt-4 flex gap-1 items-center justify-center'><i className="fa-solid fa-pen"></i>Edit</button>
                    </span>


                </div>

            </div>
           
            
           

        </div>
    );
}
export default SystemSetting;