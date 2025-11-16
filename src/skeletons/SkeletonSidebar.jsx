
function SkeletonSideBar(){
    return(
        <div  className={`w-70 h-screen shadow-[2px_2px_2px_gray] lg:z-10 md:z-30  z-40 fixed bg-white`}>
            <div className='mt-[95px]'>
                <div className="flex gap-2 justify-center">
                    <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="">
                        <div className=" bg-gray-200 animate-pulse w-30 rounded-full py-2"></div>
                        <div className=" bg-gray-200 animate-pulse w-20 mt-2 rounded-full py-2"></div>
                    </div>
                </div>
                <div className="mt-10 flex flex-col items-center justify-center">
                    <div className=" flex gap-4 mb-5 items-center justify-center">
                        <div className="w-5 h-5 rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-30  rounded-full py-1 bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className=" flex gap-4 mb-5 items-center justify-center">
                        <div className="w-5 h-5 rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-30  rounded-full py-1 bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className=" flex gap-4 mb-5 items-center justify-center">
                        <div className="w-5 h-5 rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-30  rounded-full py-1 bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className=" flex mb-5 gap-4 items-center justify-center">
                        <div className="w-5 h-5 rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-30  rounded-full py-1 bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className=" flex mb-5 gap-4 items-center justify-center">
                        <div className="w-5 h-5 rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-30  rounded-full py-1 bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className=" flex mb-5 gap-4 items-center justify-center">
                        <div className="w-5 h-5 rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-30  rounded-full py-1 bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className=" flex mb-5 gap-4 items-center justify-center">
                        <div className="w-5 h-5 rounded-md bg-gray-200 animate-pulse"></div>
                        <div className="w-30  rounded-full py-1 bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default SkeletonSideBar;