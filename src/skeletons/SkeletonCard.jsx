function SkeletonCard(){
    return(
        <div className="w-full flex justify-between p-5 h-30 rounded-2xl bg-white shadow-[2px_2px_2px_gray] border border-[#c4c4c4]">
            <div className="flex flex-col gap-3">
                <div className="w-30 h-3 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-40 h-3 rounded-full bg-gray-200 animate-pulse"></div>

            </div>
            <div className="flex justify-center items-center">
                <div className="w-15 h-15 animate-pulse rounded-md bg-gray-200" ></div>
            </div>

        </div>
    );
}
export default SkeletonCard;