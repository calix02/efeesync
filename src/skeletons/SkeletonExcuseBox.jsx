
function SkeletonExcuseBox (){
    return(
        <div className="w-full p-5 bg-white border border-[#d3d1d1] rounded-2xl shadow-[2px_2px_2px_grey] h-50">
            <div className="w-full flex flex-col gap-2">
                <div className="w-30 rounded-full animate-pulse bg-gray-200 h-2"></div>
                <div className="w-40 rounded-full animate-pulse bg-gray-200 h-2"></div>

            </div>
            <div className="w-full mt-8 px-2 flex flex-col gap-2">
                <div className="w-full rounded-full animate-pulse bg-gray-200 h-2"></div>
                <div className="w-full rounded-full animate-pulse bg-gray-200 h-2"></div>
                <div className="w-full rounded-full animate-pulse bg-gray-200 h-2"></div>
            </div>
            <div className="w-full flex gap-3 mt-5">
                <div className="w-full rounded-full animate-pulse bg-gray-200 h-8"></div>
                <div className="w-full rounded-full animate-pulse bg-gray-200 h-8"></div>
                <div className="w-full rounded-full animate-pulse bg-gray-200 h-8"></div>
            </div>
        </div>
    );
}
export default SkeletonExcuseBox;