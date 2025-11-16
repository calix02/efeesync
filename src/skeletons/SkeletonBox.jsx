
function SkeletonBox ({height = "h-100", mt = "mt-8"}){
    return(
        <div className={`  w-[100%] ${height} ${mt} bg-white shadow-[2px_2px_3px_#434343,-2px_-2px_3px_#ebe4e4]  p-5 border-[#ebe4e4]  rounded-lg `}>
            <div className="flex flex-col gap-5">
                <div className="w-40 h-3 animate-pulse rounded-full bg-gray-200" ></div>
                <div className="w-60 h-3 animate-pulse rounded-full bg-gray-200"></div>
            </div>
            <div className="w-full flex flex-col gap-5 mt-5">
                <div className="w-full flex gap-5 items-center px-10 h-20 rounded-2xl shadow-[2px_2px_2px_gray] border border-[#d1d1d1]">
                    <div className="w-15 h-15 animate-pulse rounded-md bg-gray-200" ></div>
                    <div className="flex flex-col gap-3">
                        <div className="w-40 h-3 animate-pulse rounded-full bg-gray-200"></div>   
                        <div className="w-60 h-3 animate-pulse rounded-full bg-gray-200"></div>   
                    </div>
                </div>
                <div className="w-full flex gap-5 items-center px-10 h-20 rounded-2xl shadow-[2px_2px_2px_gray] border border-[#d1d1d1]">
                    <div className="w-15 h-15 animate-pulse rounded-md bg-gray-200" ></div>
                    <div className="flex flex-col gap-3">
                        <div className="w-40 h-3 animate-pulse rounded-full bg-gray-200"></div>   
                        <div className="w-60 h-3 animate-pulse rounded-full bg-gray-200"></div>   
                    </div>
                </div>
                 <div className="w-full flex gap-5 items-center px-10 h-20 rounded-2xl shadow-[2px_2px_2px_gray] border border-[#d1d1d1]">
                    <div className="w-15 h-15 animate-pulse rounded-md bg-gray-200" ></div>
                    <div className="flex flex-col gap-3">
                        <div className="w-40 h-3 animate-pulse rounded-full bg-gray-200"></div>   
                        <div className="w-60 h-3 animate-pulse rounded-full bg-gray-200"></div>   
                    </div>
                </div>
            </div>
        </div>      
    );
}
export default SkeletonBox;