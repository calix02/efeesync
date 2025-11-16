function SkeletonSetting(){
    return(
         <div className="w-full flex flex-col gap-10  justify-center  px-15 min-h-80 py-3 rounded-2xl border bg-white border-[#dedddd] shadow-[2px_2px_2px_gray]">
            <div className="flex lg:flex-row flex-col items-center lg:mt-20 gap-15">
                <div className="flex lg:flex-row flex-col justify-center items-center gap-2">
                    <div className="w-25 h-25 rounded-full bg-gray-200 animate-pulse "></div>
                    <div className="flex flex-col items-center lg:items-start justify-center gap-2">
                        <div className="w-50 h-4 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="w-80 h-4 rounded-full bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <div className="lg:w-30 w-full h-8 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
            </div>
            <div className="lg:py-10 flex justify-end">
                <div className="lg:w-60 w-full h-8 rounded-2xl bg-gray-200 animate-pulse"></div>
            </div>
            
        </div>
    );

}
export default SkeletonSetting;