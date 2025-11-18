import React from "react";
const SkeletonCalendar = React.forwardRef(({animate, onAnimationEnd, onClose},ref) =>{
    return(
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={` ${animate} lg:w-160 p-5 rounded-2xl min-h-90 py-5 bg-white`}>
           <div className="text-end py-2 px-4">
          <span
            onClick={onClose}
            className="material-symbols-outlined cursor-pointer"
          >
            disabled_by_default
          </span>
        </div>
            <div className="flex flex-col gap-3">
                <div className="w-60 rounded-full h-4 bg-gray-200 animate-pulse"></div>
                <div className="w-80 rounded-full h-4 bg-gray-200 animate-pulse"></div>
            </div>
            <div className="flex lg:flex-row flex-col  gap-5 mt-5">
                <div className="w-full lg:block flex justify-center ">
                    <div className="w-60 h-60 rounded-2xl bg-gray-200 animate-pulse"></div>
                </div>
                <div className="w-full flex flex-col lg:items-start items-center gap-3">
                    <div className="w-30 rounded-full h-4 bg-gray-200 animate-pulse"></div>
                    <div className="w-60 rounded-full h-4 bg-gray-200 animate-pulse"></div>
                    <div className="w-60 rounded-full h-4 bg-gray-200 animate-pulse"></div>
                    <div className="w-60 rounded-full h-4 bg-gray-200 animate-pulse"></div>
                </div>
            </div>

        </div>
    );

}
);
    
export default SkeletonCalendar;