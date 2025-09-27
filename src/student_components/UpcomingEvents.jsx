
function UpcomingEvents({month,day,event,desc,target,type}){
    return(
        <>
       <div className="border-1 border-black p-2 mt-3 rounded-xl">
        <div className="py-2 flex gap-2">
                <div className="border-1 border-[#621668] font-[family-name:Hervetica] text-[#621668] w-[20%] h-30 rounded-md bg-white flex flex-col justify-center items-center">
                    <span className="text-md">{month}</span>
                    <span className="text-3xl font-bold">{day}</span>
                </div>
                <div className=" w-[80%]  rounded-md h-30 bg-white flex items-center px-4">
                    <div className="h-25 border-l-8 border-[#621668]">
                        <div className="px-4 leading-3">
                            <span className="text-lg font-semibold">{event}</span><br />
                            <span className="text-sm ">{desc}</span><br />
                            <div className=" mt-4">
                                 <span className="text-sm mt-1">Open to: {target}</span><br />
                                 <span className="text-sm">Type: {type}</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
                 <div className="flex flex-col justify-center gap-3">
                    <button className=" border-1 border-[#4b4b4b] hover:scale-110 bg-[#621668] text-white transition duration-200 scale-102 cursor-pointer w-25  shadow-[2px_2px_2px_grey] py-1 font-inter text-xs rounded-md">Pay Now</button>    
                    <button className=" border-1 border-[#4d4d4d] hover:scale-110 hover:shadow-[2px_2px_2px_#570369] transition duration-200 scale-102 cursor-pointer w-25 text-[#621668] shadow-[2px_2px_2px_grey] py-1 font-inter text-xs rounded-md">Request Excuse</button>        
                </div>
            </div>
            </div>
           
            </>
    );
}
export default UpcomingEvents;