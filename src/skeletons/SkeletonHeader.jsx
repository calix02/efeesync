 function SkeletonHeader(){
  return(
      <header className={`flex bg-white fixed top-0 w-screen h-20 shadow-[2px_2px_2px_gray] rounded-2xl lg:z-20 md:z-40 z-60  items-center justify-between border-gray-200 `}>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 ml-5 animate-pulse rounded-full" />
          <div>
            <div className="h-4 w-40 bg-gray-200 animate-pulse rounded mb-2" />
            <div className="h-3 w-24 bg-gray-200 animate-pulse  rounded" />
          </div>
        </div>
        <div className="flex items-center gap-3 px-10">
          <div className="h-8 w-20 bg-gray-200 animate-pulse  rounded-full" />
        </div>
      </header>
    );
 }
 export default SkeletonHeader;