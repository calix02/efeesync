
function UpcomingEvents({month,day,event,desc,target,type,code, excuse,data}){
    const colors = {
        CIT: "border-[#621668] text-[#621668] bg-[#621668]",
        COE: "border-[#020180] text-[#020180] bg-[#020180]",
        COC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
        COT: "border-[#847714] text-[#847714] bg-[#847714]",
        ESAF: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
        SSC: "border-[#174515] text-[#174515] bg-[#174515]",
    };

    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";
    return(
        <>
        
       <div className=" p-2  rounded-xl">
        <div className="py-2 flex gap-2">
                <div className={`border-2 ${color} py-4 font-poppins w-[20%]  rounded-md bg-white flex flex-col justify-center items-center`}>
                    <span className="text-md">{month}</span>
                    <span className="text-3xl font-bold">{day}</span>
                </div>
                <div className={` w-[80%] ${color} border-2 py-3  rounded-md relative  bg-white flex items-center px-4`}>
                    <div className={` ${color}  w-full bg-[#fff0]  text-black pt-3 pb-1 border-l-8`}>
                        <div className="px-4 w-full leading-3">
                            <span className="text-lg font-bold">{event}</span><br />
                            <span className="text-sm ">{desc}</span><br />
                            <div className=" mt-4">
                                 <span className="text-sm mt-1">Open to: {target}</span><br />
                                 <span className="text-sm">Type: {type}</span>

                                {/** 
                                 {type=='Contribution' && (
                                <>
                                <div className="flex justify-end">
                                    <button onClick={pay} className={`border-1    ${color} border-[#4b4b4b] hover:scale-110 text-white transition duration-200 scale-102 cursor-pointer w-25  shadow-[2px_2px_2px_grey] py-1 font-inter text-xs rounded-md`}>Pay Now</button> 
                                </div>
                                </>
                                )}
                                */}
                                {type=='Attendance' && (
                                <>
                                <div className="flex justify-end">
                                    <button onClick={()=> excuse(data)} className={` ${color} bg-white  border-1 border-[#4d4d4d] hover:scale-110  transition duration-200 scale-102 cursor-pointer w-25  shadow-[2px_2px_2px_grey] py-1 font-inter text-xs rounded-md`}>Request Excuse</button>        
                                </div>
                                </>
                                )}
                                
                                 

                            </div>
                        </div>
                    </div>
                    
                </div>
                {/** 
                 <div className="flex flex-col justify-center bg-white gap-3">
                    {type=='Contribution' && (
                        <>
                            <button onClick={pay} className={`border-1 ${color} border-[#4b4b4b] hover:scale-110 text-white transition duration-200 scale-102 cursor-pointer w-25  shadow-[2px_2px_2px_grey] py-1 font-inter text-xs rounded-md`}>Pay Now</button> 
                        </>
                    )}
                    {type=='Attendance' && (
                        <>
                            <button onClick={excuse} className=" border-1 border-[#4d4d4d] hover:scale-110 hover:shadow-[2px_2px_2px_#570369] transition duration-200 scale-102 cursor-pointer w-25 text-[#621668] shadow-[2px_2px_2px_grey] py-1 font-inter text-xs rounded-md">Request Excuse</button>        
                        </>
                    )}
                    </div>
                    */}
            </div>
            </div>
           
            </>
    );
}
export default UpcomingEvents;