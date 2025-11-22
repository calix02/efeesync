import React from "react";
const SkeletonModal = React.forwardRef(({animate, onAnimationEnd,onClose},ref) =>{
    return(
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`lg:w-100 px-5 ${animate} bg-white relative rounded-2xl w-80 h-117`}>
            <div className="w-full flex justify-end py-5 ">
                <span onClick={onClose} className="material-symbols-outlined  cursor-pointer">disabled_by_default</span>
            </div>
            <div className="flex flex-col gap-2">
                <div className="w-30 h-3 rounded-full  animate-pulse bg-gray-200"></div>
                <div className="w-40 h-3 rounded-full  animate-pulse bg-gray-200"></div>
            </div>
            <div className="mt-5 flex flex-col gap-5">
                <div >
                    <div className="h-1 rounded-full w-25 bg-gray-200 animate-pulse"></div>
                    <div className="h-1 mt-2 rounded-full w-35 bg-gray-200 animate-pulse"></div>
                    <div className="w-full mt-2 h-8 rounded-md  animate-pulse  bg-gray-200"></div>
                </div>
                 <div >
                    <div className="h-1 rounded-full w-25 bg-gray-200 animate-pulse"></div>
                    <div className="h-1 mt-2 rounded-full w-35 bg-gray-200 animate-pulse"></div>
                    <div className="w-full mt-2 h-8 rounded-md  animate-pulse  bg-gray-200"></div>
                </div>
                 <div >
                    <div className="h-1 rounded-full w-25 bg-gray-200 animate-pulse"></div>
                    <div className="h-1 mt-2 rounded-full w-35 bg-gray-200 animate-pulse"></div>
                    <div className="w-full mt-2 h-8 rounded-md  animate-pulse  bg-gray-200"></div>
                </div>
                <div >
                    <div className="h-1 rounded-full w-25 bg-gray-200 animate-pulse"></div>
                    <div className="h-1 mt-2 rounded-full w-35 bg-gray-200 animate-pulse"></div>
                    <div className="w-full mt-2 h-8 rounded-md  animate-pulse  bg-gray-200"></div>
                </div>
            </div>
        </div>
    ); 
});
export default SkeletonModal;